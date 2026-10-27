# Função `fiscal`
Publicar (no computador, com o Supabase CLI instalado e logado no projeto `meswiziqgcjwxslbgmeu`):

    supabase secrets set FISCAL_API_URL=https://SEU-SERVICO.onrender.com FISCAL_API_KEY=A_MESMA_API_KEY_DO_RENDER
    supabase functions deploy fiscal

Alternativa sem instalar nada: painel do Supabase → Edge Functions → Deploy a new function → nome `fiscal` → cole o `index.ts`;
os segredos ficam em Edge Functions → Secrets.
Ações: `emit`, `cancel` (só admin), `xml`, `danfe`. Exige usuário logado da equipe.


## Notas recebidas (DF-e)
A função também atende `dfe_sync` (buscar notas novas, respeitando a espera de 1 hora da SEFAZ) e `dfe_baixar` (ciência da operação + XML completo). Só administrador. Exige `supabase-v19.sql` e a API fiscal na versão `dfe-1` ou mais nova.
