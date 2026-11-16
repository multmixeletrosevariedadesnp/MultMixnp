/* Manual de ajuda — PDV. Gerado a partir de manual.json: edite os textos e regenere. */
window.MANUAL=[
{
"id": "venda",
"mod": "Vendas",
"t": "Fazer uma venda",
"k": [
"vender",
"venda",
"nova",
"venda",
"registrar",
"carrinho",
"finalizar",
"produto",
"qtd",
"pagamento"
],
"s": [
"Abra **Nova venda**.",
"Busque o produto pelo nome ou código, ou use **Escanear**. Toque nele para adicionar.",
"Ajuste a quantidade e, se precisar, o desconto do item.",
"Escolha a forma de pagamento (À vista, Cartão ou Carnê) e o meio.",
"Toque em **Finalizar venda**."
],
"go": "venda",
"n": "Sem internet a venda fica guardada e é enviada sozinha quando voltar."
},
{
"id": "pausar",
"mod": "Vendas",
"t": "Pausar uma venda e retomar depois",
"k": [
"pausar",
"espera",
"retomar",
"venda",
"em",
"espera",
"guardar",
"cliente"
],
"s": [
"Com itens no carrinho, toque em **Pausar venda**.",
"Para voltar, toque em **Em espera** e em **Retomar**.",
"Para jogar fora, toque em **Descartar**."
],
"go": "venda"
},
{
"id": "carne",
"mod": "Vendas",
"t": "Vender no carnê",
"k": [
"carne",
"carnê",
"crediario",
"parcelar",
"parcelas",
"entrada",
"vencimento",
"autorizacao",
"autorização"
],
"s": [
"Em **Nova venda**, escolha **Carnê**. Se o carnê não estiver liberado para você, a opção aparece como \"Carnê (com autorização do administrador)\".",
"Preencha o nome do cliente, a entrada, as parcelas e o 1º vencimento.",
"Toque em **Finalizar venda**. Se pedir autorização, o administrador digita e-mail e senha (e o código de 2 etapas, se tiver) e toca em **Autorizar**.",
"A autorização vale 20 minutos e só para esta venda. Precisa de internet."
],
"go": "venda"
},
{
"id": "desconto",
"mod": "Vendas",
"t": "Dar desconto",
"k": [
"desconto",
"desconto",
"acima",
"limite",
"autorizar",
"administrador",
"remover",
"desconto"
],
"s": [
"No carrinho, toque no desconto do item ou da venda e informe o valor.",
"Descontos até o limite livre passam direto. Acima dele, o administrador precisa autorizar com e-mail e senha.",
"Para tirar, toque em **Remover desconto**."
],
"go": "venda"
},
{
"id": "caixa",
"mod": "Caixa",
"t": "Abrir, movimentar e fechar o caixa",
"k": [
"caixa",
"abrir",
"fechar",
"sangria",
"suprimento",
"troco",
"dinheiro",
"fechamento"
],
"s": [
"Abra **Caixa** e toque em **Abrir caixa** com o valor do troco.",
"Use **Suprimento (colocar troco)** e **Sangria (retirar dinheiro)** quando mexer no dinheiro.",
"No fim do dia, toque em **Fechar caixa**, conte o dinheiro e informe o valor. O sistema mostra a diferença.",
"Use **Imprimir resumo** para guardar o fechamento."
],
"go": "caixa",
"n": "Se o caixa for obrigatório para você, o sistema só deixa vender com o caixa aberto."
},
{
"id": "terminal",
"mod": "Caixa",
"t": "Vincular este aparelho como terminal",
"k": [
"terminal",
"vincular",
"aparelho",
"codigo",
"código",
"caixa"
],
"s": [
"Peça ao administrador o código do terminal (em **Balcão (PDV) › Terminais** no Sistema).",
"No PDV, em **Caixa**, toque em **Vincular este aparelho** e digite o código."
],
"go": "caixa"
},
{
"id": "minhas",
"mod": "Vendas",
"t": "Ver minhas vendas e comissão",
"k": [
"minhas",
"vendas",
"comissao",
"comissão",
"historico",
"histórico",
"mes"
],
"s": [
"Abra **Minhas vendas**.",
"Veja as vendas do mês, o que ainda está pendente de envio e a sua comissão.",
"Se houver venda pendente, toque em **Tentar enviar agora**."
],
"go": "minhas"
},
{
"id": "devolucao",
"mod": "Vendas",
"t": "Devolver ou cancelar uma venda",
"k": [
"devolver",
"devolucao",
"devolução",
"cancelar",
"venda",
"troca",
"estorno"
],
"s": [
"Abra **Minhas vendas** e encontre a venda.",
"Toque em **Devolver** (itens devolvidos e motivo) ou em **Cancelar venda**.",
"Escolha como devolver o dinheiro: Dinheiro, Pix, Cartão ou Troca.",
"Venda no carnê ou fora do prazo: procure o administrador."
],
"go": "minhas"
},
{
"id": "ponto",
"mod": "Ponto de venda",
"t": "Meu ponto e estoque da loja",
"k": [
"ponto",
"meu",
"ponto",
"geral",
"loja",
"estoque",
"consignacao",
"consignação"
],
"s": [
"Se você tem ponto, o topo da venda mostra o nome do ponto e quantas peças você tem.",
"**Meu ponto** lista só o que está no seu estoque. **Geral (loja)** lista todos os produtos com a quantidade da loja.",
"Cada produto mostra \"Ponto N · Loja M\". Se vender algo que só tem na loja, a baixa sai da loja e o PDV avisa."
],
"go": "venda"
},
{
"id": "arte",
"mod": "Marketing",
"t": "Arte e cartão de visita",
"k": [
"arte",
"cartao",
"cartão",
"visita",
"oferta",
"saudacao",
"saudação",
"bom",
"dia",
"video",
"vídeo",
"divulgar",
"whatsapp"
],
"s": [
"Abra **Arte e cartão**.",
"Escolha o produto (ou a saudação), ajuste textos, foto e cores.",
"Toque em **Enviar pelo WhatsApp** ou **Baixar imagem**. Para vídeo, **Gerar vídeo** e depois **Baixar vídeo**.",
"**Meu cartão de visita** gera o seu cartão com nome e WhatsApp."
],
"go": "arte"
},
{
"id": "offline",
"mod": "Geral",
"t": "Trabalhar sem internet",
"k": [
"offline",
"sem",
"internet",
"pendente",
"enviar",
"sincronizar",
"sincronizacao",
"sincronização"
],
"s": [
"Pode vender normalmente sem internet: as vendas ficam guardadas neste aparelho.",
"O indicador no menu mostra \"N pendente(s)\". Ao voltar a internet elas são enviadas sozinhas.",
"Se uma venda for recusada pelo servidor, o administrador é avisado: procure-o."
]
},
{
"id": "aparencia",
"mod": "Geral",
"t": "Mudar aparência (tema claro ou escuro)",
"k": [
"aparencia",
"aparência",
"tema",
"escuro",
"claro",
"cores",
"modo"
],
"s": [
"Toque em **Aparência** no menu.",
"Escolha claro, escuro ou grafite e a cor de destaque."
]
},
{
"id": "atualizar",
"mod": "Geral",
"t": "Instalar o app e atualizar",
"k": [
"instalar",
"app",
"atualizar",
"versao",
"versão",
"forcar",
"forçar",
"atualizacao",
"atualização"
],
"s": [
"Para instalar, toque em **Instalar app** (ou Adicionar à tela inicial no navegador).",
"Para atualizar, role o menu até o rodapé e toque em **Forçar atualização**."
]
},
{
"id": "licenca",
"mod": "Geral",
"t": "Mensalidade e licença do sistema",
"k": [
"licenca",
"licença",
"mensalidade",
"pagar",
"pix",
"vencimento",
"bloqueado",
"consulta"
],
"s": [
"Quando a mensalidade estiver perto do vencimento, aparece uma faixa no topo.",
"Toque em **Pagar mensalidade (Pix)** para gerar o Pix e pagar.",
"Se vencer, o sistema pode ficar em \"somente consulta\" até regularizar."
]
}
];
