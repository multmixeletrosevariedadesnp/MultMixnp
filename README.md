# MultMix · Eletros e Variedades

Dois aplicativos independentes, publicados no GitHub Pages, que compartilham só o banco (Supabase).

- `sistema/`: sistema da loja (login da equipe). Endereço: `.../MultMixnp/sistema/`
- `catalogo/`: catálogo público para os clientes. Endereço: `.../MultMixnp/catalogo/`
- `index.html` e `catalogo.html` (raiz): só redirecionam para as pastas acima.
- `sw.js` (raiz): limpa o cache de versões antigas.
- `supabase*.sql`: banco de dados. Rode no SQL Editor na ordem: `supabase.sql`, `-v2`, `-v3`, ... `-v10`.

Cada pasta é autocontida (HTML, manifest, service worker, `pwa.js`, logo e ícones). Mexer em uma não altera a outra.

## Configuração
No topo do script de `sistema/index.html` e de `catalogo/index.html`, o bloco `CFG` tem a URL e a chave anon do Supabase.
Telefone, WhatsApp, CNPJ e logo da empresa são cadastrados no sistema, na aba Empresa.

## Acesso
- **Administrador:** acesso total.
- **Vendedor:** vende, atende pedidos, cadastra clientes e recebe carnês; não vê Caixa, Fiscal, Empresa nem Usuários.
- **Senha mestre:** ações sensíveis pedem a senha do administrador (vale 5 minutos).

## Pendente
- Emissão automática de NFC-e e NF-e (aguarda a documentação do microsserviço fiscal).

## Carnê em PDF
Na aba Carnês, "Gerar PDF do carnê" cria um PDF A4 com página de resumo (cliente, compra, parcelas) e uma ficha por parcela, com canhoto e QR Code Pix já com o valor da parcela.
A chave Pix é cadastrada na aba Empresa (guardada em tabela privada, `supabase-v10.sql`). O PDF é gerado no próprio navegador, sem bibliotecas externas.
