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
### 1.11.0 — 27/10/2026
- Produto com link de vídeo (YouTube ou outro) e site do fabricante. Rode `supabase-v20.sql` antes.

### 1.10.2 — 27/10/2026
- Tela de venda renovada: produtos à esquerda e carrinho fixo à direita (no celular, busca no topo, carrinho abaixo e barra com o total); quantidade com + e −, total em destaque e botão Finalizar com o valor.

### 1.10.1 — 27/10/2026
- Notas recebidas: Baixar todas as pendentes e Dar entrada nas selecionadas (várias notas de uma vez, com tela de conferência; produtos novos repetidos entre notas viram um só cadastro).

### 1.10.0 — 27/10/2026
- Tela Notas recebidas: busca automática (no máximo 1x por hora) das NF-e emitidas contra o CNPJ da loja pela Distribuição DF-e da SEFAZ, aviso na central, baixa do XML completo (com ciência da operação) e entrada no estoque sem baixar arquivo. Exige API fiscal `dfe-1`, função `fiscal` nova e `supabase-v19.sql`.

### 1.9.0 — 27/10/2026
- Promoção por produto (desconto em %, datas opcionais de início e fim). A venda usa o preço promocional; a Arte do produto já sai com o preço antigo riscado. Rode `supabase-v18.sql` antes.

### 1.8.5 — 27/10/2026
- Botão Forçar atualização (apaga o cache do app, sem apagar dados) e versão visível; também em Empresa.

### 1.8.4 — 27/10/2026
- Tema editável em Empresa: cores próprias, fundo escuro, texto e emoji da faixa, período de validade e pré-visualização. Rode `supabase-v17.sql` antes.

### 1.8.3 — 27/10/2026
- Temas sazonais (Black Friday, Natal, Ano Novo, Mães, Pais, Crianças, Namorados) escolhidos em Empresa; modo automático por data. Rode `supabase-v16.sql` antes.

### 1.8.2 — 27/10/2026
- Tela Início (admin): vendas, recebimentos, atrasos, contas a pagar, pedidos novos e lista de estoque baixo.
- Aviso de estoque baixo na central de avisos (limite configurável, padrão 3).

### 1.8.1 — 27/10/2026
- Backup dos dados em um arquivo, com botão para enviar ao Google Drive (Empresa) e aviso na central quando passam 7 dias sem backup.

### 1.8.0 — 26/10/2026
- Central de avisos (bip, vibração e aviso do navegador) para cobrar clientes e pagar fornecedores.
- Tela de Cobrança com parcelas em atraso e botão Cobrar (Pix atualizado + WhatsApp).
- Contas a pagar: lançadas à mão ou geradas pelas parcelas do XML da NF-e de compra. Rode `supabase-v15.sql` antes de publicar.

### 1.7.1 — 26/10/2026
- Pix atualizado: desconto nos juros/multa na hora (senha mestre); o valor com desconto vem preenchido em Receber.

### 1.7.0 — 26/10/2026
- Carnê: Pix atualizado por parcela (QR e copia e cola com multa e juros de hoje) e mensagem de cobrança pelo WhatsApp.

### 1.6.0 — 26/10/2026
- Código de barras (EAN) no cadastro do produto e leitura pela câmera na Nova venda e no cadastro. Exige `supabase-v12.sql` rodado.

### 1.5.0 — 26/10/2026
- Nova venda: busca de produtos com foto, preço (conforme a forma de pagamento) e estoque; toque ou Enter adiciona; reconhece código de barras (EAN).

### 1.4.1 — 26/10/2026
- NF-e (modelo 55) é o documento padrão das vendas novas; NFC-e segue disponível em Fiscal → Documento.

### 1.4.0 — 26/10/2026
- Fiscal: botão Emitir nota (NFC-e 65 e NF-e 55) via função `fiscal` do Supabase e API fiscal; DANFE em PDF, XML e cancelamento de nota (administrador). Rode `supabase-v13.sql` e publique a função (`supabase/functions/fiscal`).

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
### 1.2.0 — 27/10/2026
- Botões Ver vídeo (abre no YouTube) e Site do fabricante no detalhe do produto; selo "vídeo" no card.

### 1.1.0 — 27/10/2026
- Ofertas: preço antigo riscado, selo % OFF nos cards, aviso com a data final e filtro Ofertas.

### 1.0.4 — 27/10/2026
- Botão Forçar atualização ao lado da versão.

### 1.0.3 — 27/10/2026
- Faixa de campanha e cores editáveis pelo sistema, com período de validade.

### 1.0.2 — 27/10/2026
- Tema sazonal (Black Friday, Natal e outros) e faixa com o nome da data, conforme escolhido no sistema.

### 1.0.1 — 26/10/2026
- Chamar no WhatsApp leva a foto do produto (link de imagem reduzida, com prévia no chat) junto do nome e da descrição.

### 1.0.0 — 25/10/2026
- Atualização automática e controle de versão.
- Janela do produto com botão Fechar sempre visível, barra "Voltar aos produtos" no celular e botão voltar do celular.
- Galeria de até 5 fotos com foto ampliada, compartilhar, seta de voltar ao topo e sacola com pedido pelo WhatsApp.
- Categorias com contagem, modos de visualização e produto sem estoque como "aguardando estoque".
