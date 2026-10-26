// Função "fiscal": ponte segura entre o sistema e a API fiscal (Render).
// O navegador NUNCA recebe a chave da API. Segredos (supabase secrets set):
//   FISCAL_API_URL  = https://SEU-SERVICO.onrender.com
//   FISCAL_API_KEY  = a mesma API_KEY configurada no Render
// SUPABASE_URL, SUPABASE_ANON_KEY e SUPABASE_SERVICE_ROLE_KEY já existem no Supabase.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};
const json = (d: unknown, status = 200) =>
  new Response(JSON.stringify(d), { status, headers: { ...cors, "Content-Type": "application/json" } });

const dig = (v: unknown) => String(v ?? "").replace(/\D/g, "");

async function api(path: string, init: RequestInit = {}, ms = 70000) {
  const url = Deno.env.get("FISCAL_API_URL"), key = Deno.env.get("FISCAL_API_KEY");
  if (!url || !key) throw new Error("FISCAL_API_URL / FISCAL_API_KEY não configurados na função.");
  const r = await fetch(url.replace(/\/$/, "") + path, {
    ...init, signal: AbortSignal.timeout(ms),
    headers: { "Content-Type": "application/json", "X-API-Key": key, ...(init.headers || {}) },
  });
  return r;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  try {
    const url = Deno.env.get("SUPABASE_URL")!;
    // 1) Quem está chamando? Precisa estar logado e ser da equipe.
    const asUser = createClient(url, Deno.env.get("SUPABASE_ANON_KEY")!, {
      global: { headers: { Authorization: req.headers.get("Authorization") ?? "" } },
    });
    const { data: u } = await asUser.auth.getUser();
    if (!u?.user) return json({ ok: false, erro: "Faça login novamente." }, 401);
    const db = createClient(url, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const { data: prof } = await db.from("profiles").select("role,active").eq("id", u.user.id).maybeSingle();
    if (!prof || prof.active === false) return json({ ok: false, erro: "Sem permissão." }, 403);
    const admin = prof.role === "admin";

    const b = await req.json().catch(() => ({}));
    const { data: s } = await db.from("sales").select("*").eq("id", b.sale_id).maybeSingle();
    if (!s) return json({ ok: false, erro: "Venda não encontrada." }, 404);

    // ---------- EMITIR ----------
    if (b.action === "emit") {
      if (s.canceled_at) return json({ ok: false, erro: "Venda cancelada não pode emitir nota." }, 409);
      if (s.fiscal_status === "emitida") return json({ ok: false, erro: "Esta venda já tem nota emitida." }, 409);
      const modelo = s.doc_type === "nfe" ? 55 : 65, serie = 1;
      const { data: c } = s.customer_id
        ? await db.from("customers").select("*").eq("id", s.customer_id).maybeSingle() : { data: null };
      const ids = (s.items ?? []).map((i: any) => i.id);
      const { data: prods } = await db.from("products").select("id,ean").in("id", ids);
      const ean = new Map((prods ?? []).map((p: any) => [p.id, p.ean]));

      // Número: reaproveita o da tentativa rejeitada (evita buraco na numeração).
      let numero = Number(s.fiscal_number) || 0;
      if (!numero || Number(s.fiscal_series) !== serie) {
        const { data: n, error } = await db.rpc("fiscal_next_number", { p_model: modelo, p_serie: serie });
        if (error) throw error;
        numero = n as number;
        await db.from("sales").update({ fiscal_number: String(numero), fiscal_series: String(serie), updated_at: new Date().toISOString() }).eq("id", s.id);
      }

      const pagamentos: { tPag: string; vPag: number }[] = [];
      const entry = Number(s.entry) || 0, total = Number(s.total);
      if (s.pay_type === "crediario") {
        if (entry > 0) pagamentos.push({ tPag: s.method || "Dinheiro", vPag: entry });
        pagamentos.push({ tPag: "05", vPag: +(total - entry).toFixed(2) });
      } else pagamentos.push({ tPag: s.method || "Dinheiro", vPag: total });

      const payload = {
        modelo, numero, serie, natOp: s.nat_op || "Venda de mercadoria", frete: Number(s.freight ?? 9),
        consumidor: c ? {
          doc: dig(c.cpf), nome: c.name, ie: c.ie || "", email: c.email || "", fone: dig(c.phone),
          endereco: { logradouro: c.street, numero: c.number, complemento: c.complement, bairro: c.district,
            ibge: c.ibge, municipio: c.city, uf: c.uf, cep: dig(c.cep) },
        } : { doc: "" },
        itens: (s.items ?? []).map((i: any) => ({
          cProd: i.id, xProd: i.name, ncm: dig(i.ncm), cfop: i.cfop || "5102", un: i.unit || "UN",
          qtd: Number(i.qty), vUnit: Number(i.price), csosn: i.csosn || "102", cest: i.cest || "", ean: ean.get(i.id) || "",
        })),
        pagamentos,
      };

      let r: Response;
      try { r = await api("/nfe/emitir", { method: "POST", body: JSON.stringify(payload) }); }
      catch (e) {
        const msg = "Sem resposta da API fiscal (" + (e as Error).message + "). A nota pode ter sido autorizada: confira antes de tentar de novo.";
        await db.from("sales").update({ fiscal_error: msg, updated_at: new Date().toISOString() }).eq("id", s.id);
        return json({ ok: false, erro: msg }, 504);
      }
      const d = await r.json().catch(() => ({ ok: false, erro: "Resposta inválida da API fiscal (HTTP " + r.status + ")." }));
      if (d.ok) {
        await db.from("fiscal_docs").upsert({ sale_id: s.id, xml: d.xml });
        await db.from("sales").update({
          fiscal_status: "emitida", fiscal_key: d.chave, fiscal_protocol: d.protocolo, fiscal_cstat: d.cStat, fiscal_env: d.ambiente,
          fiscal_error: null, updated_at: new Date().toISOString(),
        }).eq("id", s.id);
        return json({ ok: true, chave: d.chave, numero, protocolo: d.protocolo, ambiente: d.ambiente });
      }
      const msg = [d.cStat, d.erro, ...(d.detalhes ?? [])].filter(Boolean).join(" · ");
      await db.from("sales").update({ fiscal_error: msg, fiscal_cstat: d.cStat ?? null, updated_at: new Date().toISOString() }).eq("id", s.id);
      return json({ ok: false, erro: msg }, 422);
    }

    // ---------- CANCELAR (só administrador) ----------
    if (b.action === "cancel") {
      if (!admin) return json({ ok: false, erro: "Só o administrador cancela nota." }, 403);
      if (s.fiscal_status !== "emitida" || !s.fiscal_key) return json({ ok: false, erro: "Esta venda não tem nota emitida." }, 409);
      const r = await api("/nfe/cancelar", { method: "POST", body: JSON.stringify({
        chave: s.fiscal_key, protocolo: s.fiscal_protocol, justificativa: b.justificativa }) });
      const d = await r.json().catch(() => ({ ok: false, erro: "Resposta inválida da API fiscal." }));
      if (!d.ok) return json({ ok: false, erro: [d.cStat, d.erro, ...(d.detalhes ?? [])].filter(Boolean).join(" · ") }, 422);
      await db.from("fiscal_docs").update({ cancel_xml: d.xml }).eq("sale_id", s.id);
      await db.from("sales").update({ fiscal_status: "cancelada", fiscal_canceled_at: new Date().toISOString(), updated_at: new Date().toISOString() }).eq("id", s.id);
      return json({ ok: true });
    }

    // ---------- XML / DANFE ----------
    if (b.action === "xml" || b.action === "danfe") {
      const { data: doc } = await db.from("fiscal_docs").select("xml").eq("sale_id", s.id).maybeSingle();
      if (!doc?.xml) return json({ ok: false, erro: "XML não encontrado." }, 404);
      if (b.action === "xml") return json({ ok: true, xml: doc.xml, nome: `${s.fiscal_key}.xml` });
      const r = await api("/nfe/danfe", { method: "POST", body: JSON.stringify({ xml: doc.xml }) });
      if (!r.ok) return json({ ok: false, erro: "Não foi possível gerar o PDF." }, 502);
      const buf = new Uint8Array(await r.arrayBuffer());
      let bin = ""; for (let i = 0; i < buf.length; i += 0x8000) bin += String.fromCharCode(...buf.subarray(i, i + 0x8000));
      return json({ ok: true, pdf_base64: btoa(bin), nome: `${s.fiscal_key}.pdf` });
    }
    return json({ ok: false, erro: "Ação desconhecida." }, 400);
  } catch (e) {
    console.error("[fiscal]", (e as Error).message);
    return json({ ok: false, erro: (e as Error).message }, 500);
  }
});
