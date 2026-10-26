# Histórico de versões

Cada aplicativo tem a sua própria numeração. O número aparece no rodapé do catálogo e no menu do sistema
(toque nele para verificar atualização). A versão publicada fica em `version.json` de cada pasta.

## Como publicar uma nova versão
1. Escolha o novo número (ex.: 1.0.1 para correção, 1.1.0 para novidade).
2. Altere o número em 3 lugares da pasta do aplicativo: `window.APP_VERSION` no `index.html`,
   `version.json` e `const VER` no `sw.js`. Escreva o resumo em `notes` do `version.json` e neste arquivo.
3. Envie para o GitHub. Quem estiver com o aplicativo aberto recebe a atualização sozinho em até 5 minutos
   (ou ao reabrir), sem precisar limpar nada.

## Sistema (`sistema/`)
### 1.3.0 — 26/10/2026
- Entrada de estoque pelo XML da NF-e de compra (rode `supabase-v12.sql`): reconhece produtos por código de barras, código do fornecedor ou nome; produto novo entra inativo e sem preço; guarda o custo.

### 1.2.1 — 26/10/2026
- Campo de pesquisa na tela de Produtos (nome, categoria ou NCM).

### 1.2.0 — 26/10/2026
- Estoque seguro: a baixa é feita no servidor (rode `supabase-v11.sql`), então dois aparelhos vendendo juntos não se sobrescrevem.
- Cancelar venda (senha mestre): devolve o estoque, cancela parcelas em aberto, tira a comissão, registra a devolução no Caixa e avisa quando há nota a cancelar.
- Aviso ao vender com estoque insuficiente.

### 1.1.0 — 26/10/2026
- Arte do produto com datas especiais: Natal, Black Friday, Cyber Monday, Aniversário, Dia das Mães, Dia dos Pais, Dia das Crianças, Namorados, Páscoa, Ano Novo, Dia do Consumidor e Oferta relâmpago, com título, subtítulo e atalho para as próximas datas.

### 1.0.0 — 25/10/2026
- Atualização automática e controle de versão.
- Arte do produto para o Status do WhatsApp.
- Carnê em PDF com QR Code Pix em cada parcela (chave Pix na aba Empresa).
- Usuários (administrador e vendedor) com comissão, senha mestre e relatório de comissões.
- Clientes e fornecedores com consulta automática por CNPJ, importação e exportação.
- Dados da empresa, pedidos do catálogo, caixa, controle fiscal (NFC-e e NF-e) e preços configuráveis.

## Catálogo (`catalogo/`)
### 1.0.1 — 26/10/2026
- Chamar no WhatsApp leva a foto do produto (link de imagem reduzida, com prévia no chat) junto do nome e da descrição.

### 1.0.0 — 25/10/2026
- Atualização automática e controle de versão.
- Janela do produto com botão Fechar sempre visível, barra "Voltar aos produtos" no celular e botão voltar do celular.
- Galeria de até 5 fotos com foto ampliada, compartilhar, seta de voltar ao topo e sacola com pedido pelo WhatsApp.
- Categorias com contagem, modos de visualização e produto sem estoque como "aguardando estoque".
