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
