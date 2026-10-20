# MultMix · Eletros e Variedades

Catálogo virtual + vendas (à vista, cartão, carnê) + clientes. Site estático (GitHub Pages) com Supabase e cache offline no navegador.

## Páginas
- `catalogo/`: vitrine pública para os clientes (sacola e pedido pelo WhatsApp). Divulgue este link: `.../catalogo/`.
- `sistema/`: sistema da loja (login da equipe): `.../sistema/`.
- `index.html` e `catalogo.html` na raiz só redirecionam para as pastas acima (links antigos continuam funcionando).

## Configurar
1. Supabase > SQL Editor: rode `supabase.sql`, depois `supabase-v2.sql` e `supabase-v3.sql` (perfis admin/vendedor) `supabase-v4.sql` (dados do cliente no pedido) `supabase-v5.sql` (dados da empresa) `supabase-v6.sql` (dados fiscais NFC-e/NF-e) `supabase-v7.sql` (preços visíveis no catálogo) e `supabase-v8.sql` (fornecedores e pessoa jurídica).
2. Storage: crie o bucket público `produtos`.
3. Authentication: crie o usuário da equipe (e-mail e senha).
4. Em `index.html`, preencha `URL`, `KEY` (chave anon) e `WHATS` no bloco `CFG` de `sistema/index.html` **e** de `catalogo/index.html`.

## Publicar
GitHub > Settings > Pages > Deploy from a branch > `main` / root.

## Roadmap
- [x] Pedidos do catálogo, caixa, inativar clientes, multa/juros
- [x] Controle fiscal (pendentes, exportação CSV)
- [ ] Emissão automática da NFC-e (precisa de emissor e certificado)

## Acesso
- **Administrador:** vê tudo (Produtos, Caixa, Fiscal) e muda nomes e preços.
- **Vendedor:** vende, atende pedidos, cadastra clientes e recebe carnês. Não vê Caixa nem Fiscal e não muda preços (bloqueado no banco).
- **Senha mestre:** ações sensíveis (mudar preço, inativar cliente, cancelar pedido, marcar nota emitida) pedem a senha do administrador. Vale por 5 minutos. Para o vendedor usar, preencha `ADMIN_EMAIL` em `sistema/index.html`.
- Novo vendedor: crie o usuário em Authentication e rode o comando comentado no fim do `supabase-v3.sql`.
- **Empresa:** o administrador preenche logo, CNPJ, razão social, endereço, telefone e WhatsApp na aba Empresa. O catálogo e o carnê usam esses dados.
- **App instalável:** O sistema e o catálogo são dois aplicativos independentes (cada um com seu manifest, service worker e escopo) e se instalam separadamente. Ao abrir o link, o navegador oferece a instalação (no iPhone aparece a dica de Compartilhar > Adicionar à Tela de Início). Arquivos: `sistema/` e `catalogo/` (manifest.json e sw.js de cada um), `pwa.js` e os ícones na raiz.
- **Preços no catálogo:** só aparecem as formas de pagamento preenchidas no produto (cartão e carnê são opcionais).
- **Fiscal (NFC-e 65 e NF-e 55):** a aba Fiscal confere, venda a venda, se faltam dados da empresa, dos produtos (NCM, CFOP, CSOSN) e do cliente (CPF/CNPJ, IE e endereço com IBGE na NF-e). A emissão depende da integração com o microsserviço fiscal.
- **Catálogo:** botão de voltar ao topo, foto ampliada em tela cheia (com setas, deslizar e botão Voltar) e escolha, na aba Empresa, de quais preços aparecem (à vista, cartão, carnê).
- **Clientes e fornecedores:** cadastro único com filtro por tipo, busca por nome, fantasia, CPF/CNPJ, telefone, e-mail e cidade, exportação em Excel/CSV e preenchimento automático pelo CNPJ (BrasilAPI, com Minha Receita como reserva). Na Nova venda, o campo do cliente busca nos cadastros já salvos.
