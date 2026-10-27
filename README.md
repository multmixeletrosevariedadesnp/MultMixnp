# MultMix · Eletros e Variedades

Dois aplicativos independentes, publicados no GitHub Pages, que compartilham só o banco (Supabase).

- `sistema/`: sistema da loja (login da equipe). Endereço: `.../MultMixnp/sistema/`
- `catalogo/`: catálogo público para os clientes. Endereço: `.../MultMixnp/catalogo/`
- `index.html` e `catalogo.html` (raiz): só redirecionam para as pastas acima.
- `sw.js` (raiz): limpa o cache de versões antigas do site.
- `supabase*.sql`: banco de dados. Rode no SQL Editor, na ordem: `supabase.sql`, `-v2`, `-v3`, ... `-v17`. Só rode os que ainda não rodou.
- `supabase/functions/fiscal/`: função que liga o sistema à API fiscal (publicada no Supabase, não no GitHub Pages). Veja o README dentro da pasta.

Cada pasta (`sistema/` e `catalogo/`) é autocontida: HTML, manifest, service worker, `pwa.js`, logo e ícones. Mexer em uma não altera a outra.

## Configuração
No topo do script de `sistema/index.html` e de `catalogo/index.html`, o bloco `CFG` tem a URL e a chave anon (pública) do Supabase.
Telefone, WhatsApp, CNPJ, logo, chave Pix e tema da empresa são cadastrados no sistema, na aba Empresa.
Nunca coloque no GitHub: senhas, chave `service_role`, certificado digital ou a chave da API fiscal.

## Acesso
- **Administrador:** acesso total (Início, Caixa, Contas a pagar, Fiscal, Empresa, Usuários, Arte do produto).
- **Vendedor:** vende, atende pedidos, cadastra clientes, cobra e recebe carnês; não vê Caixa, Contas a pagar, Fiscal, Empresa nem Usuários.
- **Senha mestre:** ações sensíveis pedem a senha do administrador (vale 5 minutos).

## Principais recursos do sistema
- Vendas com busca por nome, foto, preço e código de barras (leitor ou câmera do celular).
- Estoque com baixa na venda, devolução ao cancelar e entrada por XML de NF-e (que também lança as contas a pagar).
- Carnê em PDF com QR Code Pix; Pix atualizado com multa e juros por parcela vencida e mensagem pronta de WhatsApp.
- Tela de Cobrança, Contas a pagar e Central de avisos (bip, vibração e aviso do navegador).
- Fiscal: emissão de NF-e pela API fiscal (homologação até a troca para produção), DANFE, XML e cancelamento.
- Backup em arquivo (com envio para o Google Drive), temas sazonais e Arte do produto.

## Fiscal (API em outro repositório)
A emissão passa por: sistema, função `fiscal` no Supabase e API PHP no Render (repositório próprio). Estado atual: homologação. Falta, antes de produção: conferir CFOP/CSOSN/PIS-COFINS com o contador, zerar a numeração de teste, trocar para ambiente de produção e preparar o IBS/CBS de 2027.

## Versões e atualização automática
Cada aplicativo mostra a versão (rodapé do catálogo, menu e aba Empresa do sistema) e se atualiza sozinho quando uma versão nova é publicada: confere `version.json` ao abrir, ao voltar para o app e a cada 5 minutos. O botão "Forçar atualização" apaga o cache do app sem apagar os dados. Veja `CHANGELOG.md` para o histórico e o passo a passo de publicar uma versão.
