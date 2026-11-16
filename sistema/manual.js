/* Manual de ajuda — Sistema. Gerado a partir de manual.json: edite os textos e regenere. */
window.MANUAL=[
{
"id": "venda",
"mod": "Vendas",
"t": "Fazer uma venda",
"k": [
"vender",
"venda",
"balcao",
"nova",
"venda",
"registrar",
"carrinho",
"finalizar",
"produto",
"qtd",
"quantidade",
"pagamento",
"vendedor"
],
"s": [
"Abra **Venda** (menu ou botão \"Nova venda\" no Início).",
"Busque o produto pelo nome ou código, ou use **Escanear** para ler o código de barras. Toque no produto para colocar no carrinho.",
"Ajuste a quantidade (**Qtd**) de cada item.",
"Escolha a **Forma de pagamento** (À vista, Cartão ou Carnê) e o **Meio de pagamento**.",
"Se precisar, escolha o **Vendedor** e o cliente.",
"Toque em **Finalizar venda**."
],
"go": "pdv",
"n": "Se o estoque for insuficiente o sistema avisa e pergunta se quer registrar mesmo assim."
},
{
"id": "carne",
"mod": "Vendas",
"t": "Vender no carnê (parcelado)",
"k": [
"carne",
"carnê",
"crediario",
"crediário",
"parcelar",
"parcelas",
"entrada",
"vencimento",
"fiado"
],
"s": [
"Abra **Venda**, adicione os produtos e escolha **Forma de pagamento: Carnê**.",
"Busque o cliente por nome, CPF/CNPJ ou telefone, ou preencha os dados dele.",
"Informe a **Entrada** (se houver), o **Preço do carnê**, o número de **Parcelas** e o **1º vencimento**.",
"Toque em **Finalizar venda**. O carnê fica em **Carnês**, de onde você imprime ou envia."
],
"go": "pdv",
"n": "O número máximo de parcelas depende dos produtos do carrinho."
},
{
"id": "pedidos",
"mod": "Vendas",
"t": "Pedidos que chegam do catálogo online",
"k": [
"pedido",
"pedidos",
"catalogo",
"catálogo",
"online",
"cliente",
"site",
"whatsapp",
"pago"
],
"s": [
"Abra **Pedidos**. Os novos aparecem em destaque e no aviso do Início.",
"Confira o pedido e o pagamento.",
"Para transformar em venda, toque em **Vender**; se o cliente já pagou, use **Registrar venda (já pago)**.",
"Para recusar, toque em **Cancelar**."
],
"go": "ped"
},
{
"id": "caixa",
"mod": "Vendas",
"t": "Caixa e vendas do dia",
"k": [
"caixa",
"vendas",
"do",
"dia",
"estornar",
"estorno",
"cupom",
"recibo",
"imprimir"
],
"s": [
"Abra **Caixa** para ver as vendas do dia e o total por forma de pagamento.",
"Para imprimir ou enviar o comprovante, use **Cupom**; para ajustar o formato, **Configurar cupom**.",
"Para desfazer uma venda, toque em **Estornar** (o estoque volta e as parcelas ainda não pagas são canceladas)."
],
"go": "cx"
},
{
"id": "balcao",
"mod": "Vendas",
"t": "Acompanhar o balcão (PDV dos vendedores)",
"k": [
"balcao",
"balcão",
"pdv",
"caixas",
"terminais",
"avisos",
"devolucoes",
"devoluções",
"descontos",
"fechamento"
],
"s": [
"Abra **Balcão (PDV)**. As abas são **Caixas**, **Terminais**, **Avisos**, **Devoluções**, **Descontos** e **Configurações**.",
"Em **Caixas** veja os caixas abertos e fechados e o **Fechamento geral do dia** (confira a diferença de dinheiro).",
"Em **Terminais** vincule os aparelhos que podem abrir caixa.",
"Em **Avisos**, **Devoluções** e **Descontos** acompanhe o que os vendedores fizeram."
],
"go": "bal",
"n": "Peça aos vendedores para fechar o caixa antes de conferir o dia."
},
{
"id": "pontos",
"mod": "Pontos de venda",
"t": "Enviar mercadoria para o ponto de um vendedor",
"k": [
"ponto",
"pontos",
"consignacao",
"consignação",
"comodato",
"remessa",
"vendedor",
"mercadoria",
"enviar"
],
"s": [
"Abra **Pontos de venda** e toque em **Novo ponto**: dê um nome e escolha o vendedor (ele precisa ter usuário com perfil Vendedor).",
"No ponto, toque em **Enviar mercadoria**, busque o produto e a quantidade e confirme a remessa.",
"O estoque da loja diminui e o do ponto aumenta. O vendedor vê isso no PDV dele."
],
"go": "pts",
"n": "Kits não são enviados: envie as peças que os compõem."
},
{
"id": "pontoretorno",
"mod": "Pontos de venda",
"t": "Receber mercadoria de volta do ponto",
"k": [
"receber",
"de",
"volta",
"retorno",
"devolver",
"ponto",
"estoque",
"ponto",
"contagem"
],
"s": [
"Abra **Pontos de venda** e toque em **Ver estoque / receber** no ponto.",
"Digite a quantidade na coluna **Receber** de cada produto.",
"Toque em **Receber na loja**. O estoque do ponto diminui e o da loja aumenta."
],
"go": "pts"
},
{
"id": "pontovenda",
"mod": "Pontos de venda",
"t": "Como a venda do vendedor com ponto baixa o estoque",
"k": [
"ponto",
"baixa",
"estoque",
"loja",
"vendedor",
"saem",
"da",
"loja",
"ponto",
"geral"
],
"s": [
"A venda feita no PDV do vendedor baixa primeiro do estoque do **ponto**.",
"Se faltar no ponto, o que sobra sai do estoque da **loja** automaticamente.",
"Cancelamento ou devolução devolve a peça para onde ela saiu.",
"A venda chega ao Sistema e só você emite a nota fiscal (veja \"Emitir nota fiscal\")."
],
"go": "pts"
},
{
"id": "cliente",
"mod": "Clientes e cobrança",
"t": "Cadastrar cliente",
"k": [
"cliente",
"clientes",
"cadastro",
"cadastrar",
"novo",
"importar",
"exportar",
"excel",
"csv"
],
"s": [
"Abra **Clientes** e toque em **Novo cadastro**.",
"Preencha nome, CPF/CNPJ, telefone e endereço. Salve.",
"Para trazer vários de uma vez, use **Importar planilha**; para levar os dados, **Exportar Excel** ou **Exportar CSV**."
],
"go": "cli"
},
{
"id": "cobranca",
"mod": "Clientes e cobrança",
"t": "Cobrar parcelas em atraso",
"k": [
"cobrar",
"cobranca",
"cobrança",
"atraso",
"atrasada",
"inadimplente",
"whatsapp",
"parcelas",
"vencem",
"hoje"
],
"s": [
"Abra **Cobrança**.",
"Escolha o filtro: parcelas em atraso, vencem hoje, vencem nos próximos X dias ou por faixa de datas.",
"Toque em **Cobrar** para mandar a cobrança ao cliente (WhatsApp).",
"Quando ele pagar, toque em **Receber** na parcela (ou **Receber várias**)."
],
"go": "cob",
"n": "O botão **Média de atraso** mostra o histórico de atraso de cada cliente."
},
{
"id": "receber",
"mod": "Clientes e cobrança",
"t": "Receber o pagamento de uma parcela",
"k": [
"receber",
"parcela",
"pagamento",
"baixar",
"baixa",
"quitar",
"pix",
"dinheiro"
],
"s": [
"Abra **Cobrança** (ou abra o carnê em **Carnês**).",
"Na parcela, toque em **Receber**.",
"Escolha a forma de pagamento e confirme. Juros e multa por atraso são calculados na hora.",
"Para vários pagamentos juntos, use **Receber várias**. O **Extrato** mostra o histórico."
],
"go": "cob"
},
{
"id": "fiado",
"mod": "Clientes e cobrança",
"t": "Lançar fiado antigo ou importar fiados",
"k": [
"fiado",
"antigo",
"importar",
"fiados",
"planilha",
"carnes",
"antigos",
"migrar"
],
"s": [
"Abra **Carnês**.",
"Para lançar um por um, use **Lançar fiado antigo**.",
"Para trazer vários, use **Importar fiados (planilha)** e confira antes de confirmar."
],
"go": "car",
"n": "Vendas antigas lançadas assim não baixam o estoque."
},
{
"id": "produto",
"mod": "Produtos e estoque",
"t": "Cadastrar produto",
"k": [
"produto",
"produtos",
"cadastrar",
"novo",
"preco",
"preço",
"estoque",
"ncm",
"foto",
"categoria"
],
"s": [
"Abra **Produtos** e toque em **Novo produto**.",
"Preencha nome, categoria, preços (à vista, cartão e carnê), estoque e foto.",
"Para vender com nota fiscal, preencha também **NCM**, **CFOP** e **unidade** (e CEST/CSOSN quando for o caso).",
"Salve. O produto já aparece no PDV e no catálogo (se estiver ativo)."
],
"go": "prod"
},
{
"id": "importprod",
"mod": "Produtos e estoque",
"t": "Importar produtos de uma planilha",
"k": [
"importar",
"planilha",
"produtos",
"excel",
"csv",
"lote"
],
"s": [
"Abra **Produtos** e toque em **Importar planilha**.",
"Escolha o arquivo e confira como as colunas foram entendidas.",
"Confirme. O sistema avisa quantos produtos foram importados."
],
"go": "prod"
},
{
"id": "entradaxml",
"mod": "Produtos e estoque",
"t": "Dar entrada no estoque por XML da nota do fornecedor",
"k": [
"entrada",
"xml",
"nfe",
"nota",
"fornecedor",
"compra",
"estoque",
"entrada"
],
"s": [
"Abra **Produtos** e toque em **Entrada por XML (NF-e)**, ou use **Notas recebidas** (SEFAZ).",
"Escolha o XML e confira os itens, quantidades e custos.",
"Confirme: o estoque aumenta e produtos novos são cadastrados."
],
"go": "prod"
},
{
"id": "precos",
"mod": "Produtos e estoque",
"t": "Recalcular preços e usar categorias e códigos",
"k": [
"recalcular",
"precos",
"preços",
"margem",
"categoria",
"categorias",
"codigos",
"códigos",
"barras"
],
"s": [
"Em **Produtos**, use **Recalcular preços** para aplicar a regra de preço a vários produtos.",
"Use **Categorias** para organizar (renomear ou remover).",
"Use **Códigos** para ver e gerar códigos internos e de barras."
],
"go": "prod"
},
{
"id": "nota",
"mod": "Fiscal",
"t": "Emitir nota fiscal",
"k": [
"nota",
"fiscal",
"nfe",
"nfce",
"emitir",
"emissao",
"emissão",
"danfe",
"xml",
"sefaz",
"fiscal"
],
"s": [
"Abra **Fiscal**. A lista mostra as vendas ainda sem nota.",
"Vendas com dado faltando mostram **Corrigir**: complete o que falta (NCM, CPF, etc.).",
"Nas prontas, toque em **Emitir nota** (ou **Emitir todas as prontas**).",
"Depois de emitida, use **DANFE (PDF)**, **XML** e **WhatsApp** para enviar ao cliente."
],
"go": "fis"
},
{
"id": "cancelanota",
"mod": "Fiscal",
"t": "Cancelar uma nota fiscal",
"k": [
"cancelar",
"nota",
"cancelamento",
"fiscal",
"prazo"
],
"s": [
"Abra **Fiscal** e encontre a venda com a nota emitida.",
"Toque em **Cancelar nota** e informe o motivo.",
"Respeite o prazo de cancelamento da SEFAZ; passado o prazo, fale com o contador."
],
"go": "fis"
},
{
"id": "fiscalconfig",
"mod": "Fiscal",
"t": "Numeração, certificado, tabela IBPT e pacote do contador",
"k": [
"numeracao",
"numeração",
"certificado",
"digital",
"ibpt",
"pacote",
"contador",
"xml",
"mensal"
],
"s": [
"Em **Fiscal**, use **Numeração** para ver/ajustar a sequência das notas.",
"**Trocar certificado** atualiza o certificado digital quando ele vence.",
"**Tabela IBPT** atualiza os percentuais de tributos exibidos na nota.",
"**Pacote do contador** gera os XMLs do mês para enviar ao contador."
],
"go": "fis",
"n": "Mexer na numeração só com orientação do contador."
},
{
"id": "dfe",
"mod": "Fiscal",
"t": "Notas recebidas dos fornecedores",
"k": [
"notas",
"recebidas",
"dfe",
"sefaz",
"fornecedor",
"ciencia",
"ciência",
"baixar",
"entrada",
"conferir"
],
"s": [
"Abra **Notas recebidas** e toque em **Buscar notas agora** (o sistema também consulta sozinho, no máximo uma vez por hora).",
"Primeiro chega só o resumo. Toque em **Baixar nota** para registrar a ciência e trazer o XML completo.",
"Toque em **Dar entrada** para lançar os itens no estoque, e depois em **Conferir**.",
"Use **Ignorar** para notas que não são suas."
],
"go": "dfe"
},
{
"id": "rtc",
"mod": "Fiscal",
"t": "IBS, CBS e IS (reforma tributária)",
"k": [
"ibs",
"cbs",
"is",
"reforma",
"tributaria",
"tributária",
"imposto",
"novo",
"teste",
"2026"
],
"s": [
"Abra **IBS / CBS / IS**.",
"Confira os percentuais de teste e o CST/cClassTrib padrão.",
"Ajuste as regras por destino e tipo de cliente e toque em **Salvar regras**."
],
"go": "rtc",
"n": "Configure com o contador: é uma área em transição."
},
{
"id": "pagar",
"mod": "Financeiro",
"t": "Contas a pagar",
"k": [
"contas",
"a",
"pagar",
"boleto",
"despesa",
"fornecedor",
"pagar",
"vencimento"
],
"s": [
"Abra **Contas a pagar** e toque em **Nova conta** (ou **Entrada por XML** para trazer da nota do fornecedor).",
"Preencha descrição, valor e vencimento.",
"Quando pagar, toque em **Pagar**. Use **Editar** para corrigir.",
"Contas vencidas e as dos próximos 7 dias aparecem no Início."
],
"go": "pag"
},
{
"id": "comissao",
"mod": "Financeiro",
"t": "Comissões dos vendedores",
"k": [
"comissao",
"comissão",
"vendedor",
"comissoes",
"percentual",
"mes"
],
"s": [
"Abra **Comissões**, escolha o mês e o vendedor.",
"A tabela mostra cada venda (ou parcela recebida) e a comissão.",
"O percentual e a base (sobre a venda ou sobre o recebido) são definidos em **Usuários**, no cadastro do vendedor."
],
"go": "com"
},
{
"id": "relatorio",
"mod": "Financeiro",
"t": "Relatórios em PDF e planilha",
"k": [
"relatorio",
"relatório",
"pdf",
"planilha",
"csv",
"gerar",
"vendas",
"periodo"
],
"s": [
"Abra **Relatórios (PDF)** e escolha o relatório e o período.",
"Toque em **Gerar PDF** ou **Planilha (CSV)**."
],
"go": "rel"
},
{
"id": "auditoria",
"mod": "Financeiro",
"t": "Auditoria: quem fez o quê",
"k": [
"auditoria",
"historico",
"histórico",
"log",
"quem",
"alterou",
"registro",
"acoes",
"ações"
],
"s": [
"Abra **Auditoria**.",
"Escolha o período e filtre.",
"O registro mostra as ações feitas no sistema e por quem."
],
"go": "aud"
},
{
"id": "usuario",
"mod": "Equipe",
"t": "Criar usuário e vendedor",
"k": [
"usuario",
"usuário",
"vendedor",
"novo",
"senha",
"perfil",
"login",
"acesso",
"redefinir"
],
"s": [
"Abra **Usuários** e toque em **Novo usuário**.",
"Informe nome e e-mail (é o login) e anote a senha provisória.",
"Escolha o **Perfil**: Vendedor (usa só o PDV) ou Administrador.",
"Defina a comissão e a base dela. Salve e passe login e senha ao usuário.",
"Para trocar a senha depois, abra **Editar** e use **Redefinir senha**."
],
"go": "usr"
},
{
"id": "liberarcarne",
"mod": "Equipe",
"t": "Liberar ou bloquear carnê para um vendedor",
"k": [
"liberar",
"carne",
"carnê",
"vendedor",
"bloquear",
"permissao",
"permissão",
"pdv"
],
"s": [
"Abra **Usuários** e toque em **Editar** no vendedor.",
"No campo **Vendedor pode vender no carnê (PDV)**, escolha Sim ou Não.",
"Com **Não**, ele ainda pode pedir sua autorização venda a venda (veja o manual do PDV)."
],
"go": "usr"
},
{
"id": "arte",
"mod": "Marketing",
"t": "Criar arte de oferta, saudação ou vídeo",
"k": [
"arte",
"oferta",
"saudacao",
"saudação",
"bom",
"dia",
"status",
"whatsapp",
"video",
"vídeo",
"mp4",
"imagem",
"divulgar"
],
"s": [
"Abra **Arte do produto**.",
"Escolha o **Produto**, o **Formato** e o **Tipo de arte** (oferta, saudação...).",
"Ajuste textos, cores, foto e selo; veja o resultado ao lado.",
"Toque em **Baixar imagem** ou envie pelo WhatsApp. Para vídeo, use **Gerar vídeo** e depois **Baixar vídeo**."
],
"go": "arte",
"n": "No modo Saudação (Bom dia, Boa tarde, Boa noite) você pode usar a sua própria paisagem."
},
{
"id": "inicio",
"mod": "Marketing",
"t": "Mudar a tela inicial: dashboard, papel de parede ou área de trabalho",
"k": [
"inicio",
"início",
"dashboard",
"papel",
"de",
"parede",
"area",
"de",
"trabalho",
"logo",
"aparencia",
"aparência",
"fundo"
],
"s": [
"No **Início**, toque em **Aparência**.",
"Em **Dashboard**, escolha Desligado, Foco no dia, Painel com anéis ou **Área de trabalho** (só papel de parede e/ou logo).",
"Em **Papel de parede**, escolha a paisagem do horário ou envie a sua foto.",
"Na Área de trabalho, marque o que mostrar: logo, relógio, atalhos e aviso de pendências."
],
"go": "ini",
"n": "A escolha vale só para este aparelho."
},
{
"id": "empresa",
"mod": "Configuração",
"t": "Dados da empresa, logo, Pix e tema",
"k": [
"empresa",
"logo",
"pix",
"chave",
"tema",
"cores",
"dados",
"cnpj",
"multa",
"juros"
],
"s": [
"Abra **Empresa**.",
"Preencha os dados da empresa, envie a **Logo** e informe a **Chave Pix**.",
"Ajuste multa e juros do carnê e o **Tema** (cores sazonais).",
"Toque em salvar."
],
"go": "emp"
},
{
"id": "backup",
"mod": "Configuração",
"t": "Backup e restauração dos dados",
"k": [
"backup",
"copia",
"cópia",
"seguranca",
"segurança",
"restaurar",
"drive",
"baixar"
],
"s": [
"Abra **Empresa** e vá até **Backup dos dados**.",
"Toque em **Baixar backup agora** e guarde o arquivo fora deste computador (por exemplo, no Google Drive).",
"Para voltar um backup, use **Restaurar backup** e escolha o arquivo."
],
"go": "emp",
"n": "Faça backup com frequência, principalmente antes de importar planilhas grandes."
},
{
"id": "sinc",
"mod": "Configuração",
"t": "Sincronização e trabalhar sem internet",
"k": [
"sincronizar",
"sincronizacao",
"sincronização",
"offline",
"internet",
"pendente",
"recusado",
"erro",
"enviar"
],
"s": [
"O sistema funciona sem internet: as vendas ficam guardadas no aparelho.",
"O indicador no topo mostra \"sincronizado\" ou \"N pendente(s)\". Ao voltar a internet, tudo é enviado sozinho.",
"Se aparecer \"recusado(s)\", toque no indicador: o servidor não aceitou aquele registro. Corrija e use **Tentar de novo**, ou **Descartar**."
]
},
{
"id": "buscar",
"mod": "Configuração",
"t": "Buscar qualquer coisa e atalhos",
"k": [
"buscar",
"busca",
"atalho",
"ctrl",
"k",
"procurar",
"achar"
],
"s": [
"Toque em **Buscar** (ou use **Ctrl+K**).",
"Digite o nome de um cliente, produto ou tela e escolha o resultado."
]
},
{
"id": "atualizar",
"mod": "Configuração",
"t": "Instalar o app e atualizar para a versão nova",
"k": [
"instalar",
"app",
"atualizar",
"atualizacao",
"atualização",
"versao",
"versão",
"forcar",
"forçar",
"pwa"
],
"s": [
"Para instalar, toque em **Instalar app** (no navegador, Adicionar à tela inicial).",
"Para atualizar, use **Forçar atualização** (botão no topo, ao lado do número da versão) ou, em **Empresa**, no fim da página, **Verificar atualização**.",
"Seus dados e vendas não são apagados na atualização."
]
}
];
