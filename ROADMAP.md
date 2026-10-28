# MultMix · Memória do projeto e o que falta aperfeiçoar

Atualizado em 28/10/2026 · sistema 1.26.1 · catálogo 1.3.0 · PDV 1.0.1 · desktop 1.0.0 · API fiscal `cont-1` · SQL até `v26`.
Este arquivo é a "memória": leia primeiro ao retomar o trabalho. Não coloque senhas, tokens nem certificado aqui.

## Combinados com o dono (regras de trabalho)
- Mudar só o que foi pedido. `sistema/` e `catalogo/` são independentes (publicação separada).
- Depois de cada mudança: dizer exatamente quais arquivos publicar e qual SQL rodar ANTES.
- Ser honesto sobre o que não foi testado (API fiscal/SEFAZ não dá para testar fora do Render/homologação).
- Nunca receber certificado, senha ou token no chat: o certificado vai direto nas variáveis do Render.
- Uso atual: **beta na própria MultMix** (não é venda de sistema). Outras empresas (uma instalação por empresa) ficou **para depois**.
- Plano do Render que "dorme" (1 min para acordar) **não é prioridade** até haver balcão e dinheiro para plano pago.
- Colocar a emissão em **produção só mais tarde** (hoje: homologação, TP_AMB=2).

## Como é publicado
- Front: GitHub Pages (`multmixeletrosevariedadesnp/MultMixnp`), apps `sistema/` e `catalogo/`. Versão em 3 lugares: `window.APP_VERSION`, `version.json`, `const VER` do `sw.js` (+ CHANGELOG + nota do SQL no README).
- Banco: Supabase `meswiziqgcjwxslbgmeu` (SQL em `supabase*.sql`, na ordem; função `supabase/functions/fiscal/index.ts`).
- API fiscal: Render `fiscalmultmix` (PHP 8.3, sped-nfe 5.2.9, sped-da 1.1.6). `/health` mostra `emissor_versao`.
- Ordem ao publicar mudanças fiscais: **API → função → SQL → sistema**.

## PDV do vendedor (decisões de 28/10/2026)
- App separado `pdv/`; vendedor só vende. Proteção NO BANCO (v26): vendedor não lê custo, clientes, vendas dos outros nem muda preço/estoque; a venda entra por `pdv_sell`, que calcula preço, vendedor e comissão no servidor.
- Quem liga/desliga o carnê de cada vendedor é SEMPRE o administrador (Usuários → "Vendedor pode vender no carnê").
- O vendedor NÃO usa mais o `sistema/` (aparece aviso). Admin pode usar o PDV também.
- Testado: SQL v1–v26 num Postgres 16 local (com simulação do Supabase) e o app com Supabase simulado. NÃO testado: Supabase real, leitor USB/câmera/impressora reais, vários aparelhos ao mesmo tempo.
- Falta/melhorar: desconto autorizado por senha do admin; troca/devolução; fechamento de caixa por vendedor; meta de vendas; notificação de venda recusada ao administrador; impressão térmica direta; busca de cliente offline; vincular vendedor a ponto de venda/loja; esconder produtos sem estoque por opção; limite de itens/valor sem aprovação.
- Risco conhecido: venda feita offline usa o preço do SERVIDOR no momento do envio (pode diferir do que o cliente viu se o administrador mudou o preço no intervalo).

## Programa de computador (desktop/)
- NÃO testado no Windows (o ambiente de desenvolvimento não baixa Electron). Conferir: instalador gera pelo GitHub Actions; atalhos criados; abre sem internet depois da 1ª vez; impressão direta na térmica real (58/80 mm, margens, corte); aviso do Windows SmartScreen (sem assinatura de código paga).
- Melhorar: assinatura digital do instalador; atualização automática do próprio programa; escolher largura do papel (58/80); abrir cupom com gaveta de dinheiro (ESC/POS); impressão por comandos ESC/POS para térmicas sem driver; instalar para vários computadores de uma vez.

## O que já existe (resumo)
PDV, produtos (custo, margem, promoção, vídeo/site), clientes (busca por CNPJ com IE), carnê, cobrança, contas a pagar, caixa, comissões,
Fiscal (NF-e 55 / NFC-e 65, cancelar, DANFE, XML, status da SEFAZ, emitir todas as prontas, inutilização, reenvio sem duplicar),
notas recebidas (DF-e) com entrada em lote, Pacote do contador (zip + PDF + CSV), Relatórios em PDF (vendas, estoque, carnês, contas, caixa, comissões, Curva ABC),
cupom não fiscal configurável (58/80 mm), temas, notificações, backup + Google Drive + **restaurar**, **auditoria**, **2 etapas (opcional)**,
regras IBS/CBS/IS (só cadastro; não altera o XML).

## Ações que dependem do dono (não dá para fazer pelo código)
1. Rodar no Supabase, na ordem, o que ainda não rodou: v14 → v25 (conferir qual foi o último).
2. Publicar: API (`cont-1`), função `fiscal` nova, depois `sistema/`.
3. **Trocar a senha de administrador que ficou exposta** e ativar 2 etapas (menu "Verificação em 2 etapas"; depois rodar `supabase-v25.sql`). Guardar a chave manual do autenticador.
4. Contador: confirmar CFOP, CSOSN, PIS/COFINS e as regras de IBS/CBS para o Simples.
5. Criar um segundo projeto Supabase só para testes (ambiente de teste).

## Antes de emitir em produção (checklist)
- [ ] Cancelar/ignorar as notas de homologação e zerar `fiscal_series` (numeração) e `fiscal_inut`.
- [ ] `TP_AMB=1`, CSC e CSC_ID reais no Render; certificado A1 válido (alerta de vencimento ainda NÃO existe).
- [ ] Testar 1 nota real de valor baixo e 1 cancelamento dentro do prazo.
- [ ] Render sem dormir (plano pago) quando houver balcão.
- [ ] Contador validou CFOP/CSOSN/PIS-COFINS.

## Não validado em ambiente real (tratar como "provavelmente certo, confirmar")
- DF-e (notas recebidas) contra a SEFAZ real; consulta de status; inutilização; recuperação de nota já autorizada (`/nfe/status`, `/nfe/inutilizar`, `verificar`).
- SQL v22 a v25 (sem Postgres no ambiente de desenvolvimento): conferir mensagem de erro ao rodar.
- Gatilhos da auditoria (v24) e função `mfa_ok` (v25): testar com uma mudança de preço e com um login com 2 etapas.
- Impressão do cupom em impressora térmica; PDF do contador com dados reais; logo no PDF/cupom; WhatsApp/Drive no celular; câmera/scanner.
- Busca de CNPJ com o CNPJ real (logradouro/IE) — fontes públicas podem falhar ou limitar consultas.

## O que falta aperfeiçoar (por prioridade)
**A. Segurança e confiança**
- Alerta de certificado digital perto de vencer; monitoramento de erros (aviso quando a API/função falha).
- Sessão: tempo de expiração e "sair de todos os aparelhos"; revisão de todas as políticas RLS por um segundo par de olhos.
- Auditoria: registrar também quem abriu/baixou backup restaurado de outro aparelho e uso da senha master.
- Restaurar backup de vendas fora do banco vazio (hoje bloqueado por causa da baixa de estoque).

**B. Dinheiro entrando sozinho**
- Pix/boleto do carnê via provedor com API (Asaas, Efí, Mercado Pago…) com baixa automática por webhook (comparar taxas).
- Cobrança automática por WhatsApp (API oficial) com régua: antes, no dia e depois do vencimento.

**C. Gestão**
- FEITO 1.24.0 (relatórios): fluxo de caixa previsto, DRE simples, lucro por produto, sugestão de compra. Falta: gráficos em tela, DRE com impostos do Simples (DAS) e categorias de despesa, lucro por venda, orçamento em PDF, sugestão de compra que considere Curva ABC e prazo do fornecedor.
- Lembrete mensal (dia 1º) para enviar o Pacote do contador.

**D. Balcão**
- FEITO 1.25.0: atalhos (F2/F4/F6/F8), leitor USB global, 3*código, bipe e avisos. Falta: impressão térmica direta (ESC/POS ou impressão silenciosa, precisa testar na impressora real), desconto por item/venda, venda em espera (pausar e retomar), abertura/fechamento de caixa com sangria, teste do leitor USB real. O indicador de pendentes de envio já existe no topo ("offline · N pendente(s)").

**E. Venda online**
- Carrinho e pedido no catálogo com pagamento; aviso de situação do pedido ao cliente.

**F. Fiscal**
- Contingência SVC/EPEC e NFC-e offline (precisa orientação do contador); IBS/CBS no XML quando o contador definir os códigos (hoje só cadastro);
  CRT/regimes além do Simples; NFC-e com QR Code completo e CSC em produção.

**G. Base técnica**
- Testes automáticos + verificação antes de publicar; dividir o `index.html` (muito grande) em módulos; ambiente de teste separado; CI no GitHub.

**H. Mais tarde**
- Kit para outras empresas (uma instalação por empresa: `config.js`, marca configurável, SQL único de instalação, guia).
