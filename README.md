# MultMix · Eletros e Variedades

Catálogo virtual + vendas (à vista, cartão, carnê) + clientes. Site estático (GitHub Pages) com Supabase e cache offline no navegador.

## Páginas
- `catalogo.html`: vitrine pública para os clientes (sacola e pedido pelo WhatsApp). Divulgue este link.
- `index.html`: sistema da loja (login da equipe).

## Configurar
1. Supabase > SQL Editor: rode `supabase.sql`.
2. Storage: crie o bucket público `produtos`.
3. Authentication: crie o usuário da equipe (e-mail e senha).
4. Em `index.html`, preencha `URL`, `KEY` (chave anon) e `WHATS` no bloco `CFG` do `index.html` **e** do `catalogo.html`.

## Publicar
GitHub > Settings > Pages > Deploy from a branch > `main` / root.

## Roadmap
- [ ] Emissão fiscal (NFC-e)
- [ ] Relatórios e caixa
- [ ] Inativar clientes
- [ ] Juros/multa por atraso
