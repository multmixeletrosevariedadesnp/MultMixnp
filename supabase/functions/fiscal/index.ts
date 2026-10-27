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

const nowIso = () => new Date().toISOString();

async function apiJson(path: string, body: unknown) {
  const r = await api(path, { method: "POST", body: JSON.stringify(body) });
  const txt = await r.text();
  try { return JSON.parse(txt); }
  catch { throw new Error(`Resposta inválida da API fiscal (HTTP ${r.status}): ${txt.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").slice(0, 200)}`); }
}

// Grava no banco o que a SEFAZ entregou. Nunca "rebaixa" uma nota completa para resumo.
async function saveDocs(db: ReturnType<typeof createClient>, docs: any[], ownCnpj: string) {
  let novas = 0, completas = 0, canceladas = 0;
  for (const d of docs) {
    if (!d.chave) continue;
    if (d.tipo !== "evento" && dig(d.emit_cnpj) === ownCnpj) continue; // notas emitidas pela própria loja
    const { data: ex } = await db.from("dfe_notas").select("chave,status").eq("chave", d.chave).maybeSingle();
    if (d.tipo === "evento") {
      if (String(d.tp_evento) === "110111" && ex) { await db.from("dfe_notas").update({ canceled: true, updated_at: nowIso() }).eq("chave", d.chave); canceladas++; }
      continue;
    }
    const row: Record<string, unknown> = {
      chave: d.chave, nsu: d.nsu, emit_cnpj: dig(d.emit_cnpj), emit_nome: d.emit_nome, valor: d.valor,
      dh_emi: d.dh_emi || null, updated_at: nowIso(),
    };
    if (d.numero) row.numero = d.numero;
    if (d.tipo === "completo") { row.status = "completo"; row.xml = d.xml; if (ex?.status !== "completo") completas++; }
    else if (ex) continue; // resumo de algo que já temos
    else row.status = "resumo";
    if (!ex) novas++;
    const { error } = await db.from("dfe_notas").upsert(row);
    if (error) throw new Error("Falha ao gravar nota recebida: " + error.message);
  }
  return { novas, completas, canceladas };
}

async function dfe(db: ReturnType<typeof createClient>, b: any) {
  const { data: co } = await db.from("company").select("cnpj").eq("id", 1).maybeSingle();
  const own = dig(co?.cnpj);

  // ---- baixar uma nota completa: dá ciência (se faltar) e consulta pela chave ----
  if (b.action === "dfe_baixar") {
    const chave = dig(b.chave);
    if (chave.length !== 44) return json({ ok: false, erro: "Chave inválida." }, 422);
    const { data: n } = await db.from("dfe_notas").select("chave,status,ciencia_at").eq("chave", chave).maybeSingle();
    if (!n) return json({ ok: false, erro: "Nota não encontrada na lista." }, 404);
    if (n.status === "completo") return json({ ok: true, completa: true });
    if (!n.ciencia_at) {
      const m = await apiJson("/nfe/manifestar", { chave });
      if (!m.ok) return json({ ok: false, erro: [m.cStat, m.xMotivo, m.erro].filter(Boolean).join(" · ") || "A SEFAZ recusou a ciência." }, 422);
      await db.from("dfe_notas").update({ ciencia_at: nowIso(), updated_at: nowIso() }).eq("chave", chave);
    }
    const d = await apiJson("/nfe/distdfe", { chave });
    if (!d.ok) return json({ ok: false, erro: [d.cStat, d.erro].filter(Boolean).join(" · ") || "Falha ao consultar a nota." }, 422);
    const r = await saveDocs(db, d.docs ?? [], own);
    const { data: n2 } = await db.from("dfe_notas").select("status").eq("chave", chave).maybeSingle();
    return json({ ok: true, completa: n2?.status === "completo", ...r,
      aviso: n2?.status === "completo" ? undefined : "Ciência registrada. A SEFAZ costuma liberar o XML completo em alguns minutos: toque em Baixar de novo mais tarde." });
  }

  // ---- buscar notas novas (respeita a regra de 1 hora da SEFAZ) ----
  if (b.action === "dfe_sync") {
    const { data: st0 } = await db.from("dfe_state").select("*").eq("id", 1).maybeSingle();
    const st = st0 ?? { id: 1, ult_nsu: "0", max_nsu: null, last_check: null, last_cstat: null, last_msg: null };
    const ago = st.last_check ? (Date.now() - new Date(st.last_check).getTime()) / 60000 : 9999;
    const espera = ["137", "656"].includes(String(st.last_cstat)) ? 62 : 2; // 137/656: a SEFAZ exige ~1 hora
    if (ago < espera) return json({ ok: true, ignorado: true, proxima_em_min: Math.ceil(espera - ago), novas: 0, completas: 0, canceladas: 0 });

    let ult = String(st.ult_nsu || "0"), max = st.max_nsu, cstat = "", msg = "";
    const tot = { novas: 0, completas: 0, canceladas: 0 };
    for (let i = 0; i < 6; i++) {
      const d = await apiJson("/nfe/distdfe", { ultNSU: Number(ult) || 0 });
      if (!d.ok) { cstat = "erro"; msg = d.erro ?? "falha"; break; }
      cstat = String(d.cStat); msg = String(d.xMotivo ?? "");
      if (cstat === "138") {
        const r = await saveDocs(db, d.docs ?? [], own);
        tot.novas += r.novas; tot.completas += r.completas; tot.canceladas += r.canceladas;
        ult = String(d.ultNSU); max = String(d.maxNSU);
        if (Number(ult) >= Number(max)) break;
      } else { if (d.ultNSU) ult = String(d.ultNSU); if (d.maxNSU) max = String(d.maxNSU); break; }
    }
    await db.from("dfe_state").upsert({ id: 1, ult_nsu: ult, max_nsu: max, last_check: nowIso(), last_cstat: cstat, last_msg: msg });
    if (cstat === "erro") return json({ ok: false, erro: msg }, 422);
    if (cstat === "656") return json({ ok: false, erro: "A SEFAZ pediu para aguardar cerca de 1 hora antes de consultar de novo." }, 429);
    if (!["137", "138"].includes(cstat)) return json({ ok: false, erro: `SEFAZ: ${cstat} ${msg}` }, 422);
    return json({ ok: true, ...tot, cstat });
  }
  return json({ ok: false, erro: "Ação desconhecida." }, 400);
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

    // ---------- NOTAS RECEBIDAS (DF-e): só administrador ----------
    if (typeof b.action === "string" && b.action.startsWith("dfe_")) {
      if (!admin) return json({ ok: false, erro: "Só o administrador acessa as notas recebidas." }, 403);
      return await dfe(db, b);
    }

    const { data: s } = await db.from("sales").select("*").eq("id", b.sale_id).maybeSingle();
    if (!s) return json({ ok: false, erro: "Venda não encontrada." }, 404);

    // ---------- EMITIR ----------
    if (b.action === "emit") {
      if (s.canceled_at) return json({ ok: false, erro: "Venda cancelada não pode emitir nota." }, 409);
      if (s.fiscal_status === "emitida") return json({ ok: false, erro: "Esta venda já tem nota emitida." }, 409);
      const modelo = s.doc_type === "nfce" ? 65 : 55, serie = 1; // padrão: NF-e 55
      const { data: c } = s.customer_id
        ? await db.from("customers").select("*").eq("id", s.customer_id).maybeSingle() : { data: null };
      const ids = (s.items ?? []).map((i: any) => i.id);
      const { data: prods } = await db.from("products").select("id,ean").in("id", ids);
      const ean = new Map((prods ?? []).map((p: any) => [p.id, p.ean]));

      // Número: reaproveita o da tentativa anterior SÓ se foi reservado para este mesmo modelo
      // (evita buraco na numeração, mas nunca leva um número de NFC-e para NF-e ou o contrário).
      let numero = Number(s.fiscal_number) || 0;
      if (!numero || Number(s.fiscal_series) !== serie || Number(s.fiscal_model) !== modelo) {
        const { data: n, error } = await db.rpc("fiscal_next_number", { p_model: modelo, p_serie: serie });
        if (error) throw error;
        numero = n as number;
        await db.from("sales").update({ fiscal_number: String(numero), fiscal_series: String(serie), fiscal_model: modelo, updated_at: new Date().toISOString() }).eq("id", s.id);
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
          cProd: String(i.id).replace(/-/g, "").slice(0, 8).toUpperCase(), xProd: i.name, ncm: dig(i.ncm), cfop: i.cfop || "5102", un: i.unit || "UN",
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
      const markCanceled = async (xml: string | null) => {
        if (xml) await db.from("fiscal_docs").update({ cancel_xml: xml }).eq("sale_id", s.id);
        await db.from("sales").update({ fiscal_status: "cancelada", fiscal_canceled_at: new Date().toISOString(), updated_at: new Date().toISOString() }).eq("id", s.id);
      };
      const r = await api("/nfe/cancelar", { method: "POST", body: JSON.stringify({
        chave: s.fiscal_key, protocolo: s.fiscal_protocol, justificativa: b.justificativa }) });
      const txt = await r.text();
      let d: any = null;
      try { d = JSON.parse(txt); } catch (_) { /* resposta fora do padrão */ }
      if (!d) {
        // A API respondeu algo estranho: confere na SEFAZ se o cancelamento aconteceu mesmo assim.
        try {
          const c = await (await api("/nfe/consultar?chave=" + s.fiscal_key, { method: "GET" })).json();
          if (c?.ok && String(c.cStat) === "101") { await markCanceled(null); return json({ ok: true, aviso: "A SEFAZ confirmou o cancelamento." }); }
        } catch (_) { /* segue para o erro */ }
        return json({ ok: false, erro: `Resposta inválida da API fiscal (HTTP ${r.status}): ${txt.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").slice(0, 200)}` }, 502);
      }
      if (!d.ok) return json({ ok: false, erro: [d.cStat, d.erro, ...(d.detalhes ?? [])].filter(Boolean).join(" · ") }, 422);
      await markCanceled(d.xml);
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
