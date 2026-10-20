# MultMix · Eletros e Variedades

Catálogo virtual + vendas (à vista, cartão, carnê) + clientes. Site estático (GitHub Pages) com Supabase e cache offline no navegador.

## Páginas
- `catalogo.html`: vitrine pública para os clientes (sacola e pedido pelo WhatsApp). Divulgue este link.
- `index.html`: sistema da loja (login da equipe).

## Configurar
1. Supabase > SQL Editor: rode `supabase.sql`, depois `supabase-v2.sql` e `supabase-v3.sql` (perfis admin/vendedor) `supabase-v4.sql` (dados do cliente no pedido) e `supabase-v5.sql` (dados da empresa).
2. Storage: crie o bucket público `produtos`.
3. Authentication: crie o usuário da equipe (e-mail e senha).
4. Em `index.html`, preencha `URL`, `KEY` (chave anon) e `WHATS` no bloco `CFG` do `index.html` **e** do `catalogo.html`.

## Publicar
GitHub > Settings > Pages > Deploy from a branch > `main` / root.

## Roadmap
- [x] Pedidos do catálogo, caixa, inativar clientes, multa/juros
- [x] Controle fiscal (pendentes, exportação CSV)
- [ ] Emissão automática da NFC-e (precisa de emissor e certificado)

## Acesso
- **Administrador:** vê tudo (Produtos, Caixa, Fiscal) e muda nomes e preços.
- **Vendedor:** vende, atende pedidos, cadastra clientes e recebe carnês. Não vê Caixa nem Fiscal e não muda preços (bloqueado no banco).
- **Senha mestre:** ações sensíveis (mudar preço, inativar cliente, cancelar pedido, marcar nota emitida) pedem a senha do administrador. Vale por 5 minutos. Para o vendedor usar, preencha `ADMIN_EMAIL` no `index.html`.
- Novo vendedor: crie o usuário em Authentication e rode o comando comentado no fim do `supabase-v3.sql`.
- **Empresa:** o administrador preenche logo, CNPJ, razão social, endereço, telefone e WhatsApp na aba Empresa. O catálogo e o carnê usam esses dados.
