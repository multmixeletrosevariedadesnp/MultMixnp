# Função `fiscal`
Publicar (no computador, com o Supabase CLI instalado e logado no projeto `meswiziqgcjwxslbgmeu`):

    supabase secrets set FISCAL_API_URL=https://SEU-SERVICO.onrender.com FISCAL_API_KEY=A_MESMA_API_KEY_DO_RENDER
    supabase functions deploy fiscal

Alternativa sem instalar nada: painel do Supabase → Edge Functions → Deploy a new function → nome `fiscal` → cole o `index.ts`;
os segredos ficam em Edge Functions → Secrets.
Ações: `emit`, `cancel` (só admin), `xml`, `danfe`. Exige usuário logado da equipe.
