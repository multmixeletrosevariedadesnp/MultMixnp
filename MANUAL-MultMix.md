# Manual do MultMix Sistema


## Vendas


### Fazer uma venda

1. Abra **Venda** (menu ou botão "Nova venda" no Início).
2. Busque o produto pelo nome ou código, ou use **Escanear** para ler o código de barras. Toque no produto para colocar no carrinho.
3. Ajuste a quantidade (**Qtd**) de cada item.
4. Escolha a **Forma de pagamento** (À vista, Cartão ou Carnê) e o **Meio de pagamento**.
5. Se precisar, escolha o **Vendedor** e o cliente.
6. Toque em **Finalizar venda**.

> Se o estoque for insuficiente o sistema avisa e pergunta se quer registrar mesmo assim.

### Vender no carnê (parcelado)

1. Abra **Venda**, adicione os produtos e escolha **Forma de pagamento: Carnê**.
2. Busque o cliente por nome, CPF/CNPJ ou telefone, ou preencha os dados dele.
3. Informe a **Entrada** (se houver), o **Preço do carnê**, o número de **Parcelas** e o **1º vencimento**.
4. Toque em **Finalizar venda**. O carnê fica em **Carnês**, de onde você imprime ou envia.

> O número máximo de parcelas depende dos produtos do carrinho.

### Pedidos que chegam do catálogo online

1. Abra **Pedidos**. Os novos aparecem em destaque e no aviso do Início.
2. Confira o pedido e o pagamento.
3. Para transformar em venda, toque em **Vender**; se o cliente já pagou, use **Registrar venda (já pago)**.
4. Para recusar, toque em **Cancelar**.

### Caixa e vendas do dia

1. Abra **Caixa** para ver as vendas do dia e o total por forma de pagamento.
2. Para imprimir ou enviar o comprovante, use **Cupom**; para ajustar o formato, **Configurar cupom**.
3. Para desfazer uma venda, toque em **Estornar** (o estoque volta e as parcelas ainda não pagas são canceladas).

### Acompanhar o balcão (PDV dos vendedores)

1. Abra **Balcão (PDV)**. As abas são **Caixas**, **Terminais**, **Avisos**, **Devoluções**, **Descontos** e **Configurações**.
2. Em **Caixas** veja os caixas abertos e fechados e o **Fechamento geral do dia** (confira a diferença de dinheiro).
3. Em **Terminais** vincule os aparelhos que podem abrir caixa.
4. Em **Avisos**, **Devoluções** e **Descontos** acompanhe o que os vendedores fizeram.

> Peça aos vendedores para fechar o caixa antes de conferir o dia.

## Pontos de venda


### Enviar mercadoria para o ponto de um vendedor

1. Abra **Pontos de venda** e toque em **Novo ponto**: dê um nome e escolha o vendedor (ele precisa ter usuário com perfil Vendedor).
2. No ponto, toque em **Enviar mercadoria**, busque o produto e a quantidade e confirme a remessa.
3. O estoque da loja diminui e o do ponto aumenta. O vendedor vê isso no PDV dele.

> Kits não são enviados: envie as peças que os compõem.

### Receber mercadoria de volta do ponto

1. Abra **Pontos de venda** e toque em **Ver estoque / receber** no ponto.
2. Digite a quantidade na coluna **Receber** de cada produto.
3. Toque em **Receber na loja**. O estoque do ponto diminui e o da loja aumenta.

### Como a venda do vendedor com ponto baixa o estoque

1. A venda feita no PDV do vendedor baixa primeiro do estoque do **ponto**.
2. Se faltar no ponto, o que sobra sai do estoque da **loja** automaticamente.
3. Cancelamento ou devolução devolve a peça para onde ela saiu.
4. A venda chega ao Sistema e só você emite a nota fiscal (veja "Emitir nota fiscal").

## Clientes e cobrança


### Cadastrar cliente

1. Abra **Clientes** e toque em **Novo cadastro**.
2. Preencha nome, CPF/CNPJ, telefone e endereço. Salve.
3. Para trazer vários de uma vez, use **Importar planilha**; para levar os dados, **Exportar Excel** ou **Exportar CSV**.

### Cobrar parcelas em atraso

1. Abra **Cobrança**.
2. Escolha o filtro: parcelas em atraso, vencem hoje, vencem nos próximos X dias ou por faixa de datas.
3. Toque em **Cobrar** para mandar a cobrança ao cliente (WhatsApp).
4. Quando ele pagar, toque em **Receber** na parcela (ou **Receber várias**).

> O botão **Média de atraso** mostra o histórico de atraso de cada cliente.

### Receber o pagamento de uma parcela

1. Abra **Cobrança** (ou abra o carnê em **Carnês**).
2. Na parcela, toque em **Receber**.
3. Escolha a forma de pagamento e confirme. Juros e multa por atraso são calculados na hora.
4. Para vários pagamentos juntos, use **Receber várias**. O **Extrato** mostra o histórico.

### Lançar fiado antigo ou importar fiados

1. Abra **Carnês**.
2. Para lançar um por um, use **Lançar fiado antigo**.
3. Para trazer vários, use **Importar fiados (planilha)** e confira antes de confirmar.

> Vendas antigas lançadas assim não baixam o estoque.

## Produtos e estoque


### Cadastrar produto

1. Abra **Produtos** e toque em **Novo produto**.
2. Preencha nome, categoria, preços (à vista, cartão e carnê), estoque e foto.
3. Para vender com nota fiscal, preencha também **NCM**, **CFOP** e **unidade** (e CEST/CSOSN quando for o caso).
4. Salve. O produto já aparece no PDV e no catálogo (se estiver ativo).

### Importar produtos de uma planilha

1. Abra **Produtos** e toque em **Importar planilha**.
2. Escolha o arquivo e confira como as colunas foram entendidas.
3. Confirme. O sistema avisa quantos produtos foram importados.

### Dar entrada no estoque por XML da nota do fornecedor

1. Abra **Produtos** e toque em **Entrada por XML (NF-e)**, ou use **Notas recebidas** (SEFAZ).
2. Escolha o XML e confira os itens, quantidades e custos.
3. Confirme: o estoque aumenta e produtos novos são cadastrados.

### Recalcular preços e usar categorias e códigos

1. Em **Produtos**, use **Recalcular preços** para aplicar a regra de preço a vários produtos.
2. Use **Categorias** para organizar (renomear ou remover).
3. Use **Códigos** para ver e gerar códigos internos e de barras.

## Fiscal


### Emitir nota fiscal

1. Abra **Fiscal**. A lista mostra as vendas ainda sem nota.
2. Vendas com dado faltando mostram **Corrigir**: complete o que falta (NCM, CPF, etc.).
3. Nas prontas, toque em **Emitir nota** (ou **Emitir todas as prontas**).
4. Depois de emitida, use **DANFE (PDF)**, **XML** e **WhatsApp** para enviar ao cliente.

### Cancelar uma nota fiscal

1. Abra **Fiscal** e encontre a venda com a nota emitida.
2. Toque em **Cancelar nota** e informe o motivo.
3. Respeite o prazo de cancelamento da SEFAZ; passado o prazo, fale com o contador.

### Numeração, certificado, tabela IBPT e pacote do contador

1. Em **Fiscal**, use **Numeração** para ver/ajustar a sequência das notas.
2. **Trocar certificado** atualiza o certificado digital quando ele vence.
3. **Tabela IBPT** atualiza os percentuais de tributos exibidos na nota.
4. **Pacote do contador** gera os XMLs do mês para enviar ao contador.

> Mexer na numeração só com orientação do contador.

### Notas recebidas dos fornecedores

1. Abra **Notas recebidas** e toque em **Buscar notas agora** (o sistema também consulta sozinho, no máximo uma vez por hora).
2. Primeiro chega só o resumo. Toque em **Baixar nota** para registrar a ciência e trazer o XML completo.
3. Toque em **Dar entrada** para lançar os itens no estoque, e depois em **Conferir**.
4. Use **Ignorar** para notas que não são suas.

### IBS, CBS e IS (reforma tributária)

1. Abra **IBS / CBS / IS**.
2. Confira os percentuais de teste e o CST/cClassTrib padrão.
3. Ajuste as regras por destino e tipo de cliente e toque em **Salvar regras**.

> Configure com o contador: é uma área em transição.

## Financeiro


### Contas a pagar

1. Abra **Contas a pagar** e toque em **Nova conta** (ou **Entrada por XML** para trazer da nota do fornecedor).
2. Preencha descrição, valor e vencimento.
3. Quando pagar, toque em **Pagar**. Use **Editar** para corrigir.
4. Contas vencidas e as dos próximos 7 dias aparecem no Início.

### Comissões dos vendedores

1. Abra **Comissões**, escolha o mês e o vendedor.
2. A tabela mostra cada venda (ou parcela recebida) e a comissão.
3. O percentual e a base (sobre a venda ou sobre o recebido) são definidos em **Usuários**, no cadastro do vendedor.

### Relatórios em PDF e planilha

1. Abra **Relatórios (PDF)** e escolha o relatório e o período.
2. Toque em **Gerar PDF** ou **Planilha (CSV)**.

### Auditoria: quem fez o quê

1. Abra **Auditoria**.
2. Escolha o período e filtre.
3. O registro mostra as ações feitas no sistema e por quem.

## Equipe


### Criar usuário e vendedor

1. Abra **Usuários** e toque em **Novo usuário**.
2. Informe nome e e-mail (é o login) e anote a senha provisória.
3. Escolha o **Perfil**: Vendedor (usa só o PDV) ou Administrador.
4. Defina a comissão e a base dela. Salve e passe login e senha ao usuário.
5. Para trocar a senha depois, abra **Editar** e use **Redefinir senha**.

### Liberar ou bloquear carnê para um vendedor

1. Abra **Usuários** e toque em **Editar** no vendedor.
2. No campo **Vendedor pode vender no carnê (PDV)**, escolha Sim ou Não.
3. Com **Não**, ele ainda pode pedir sua autorização venda a venda (veja o manual do PDV).

## Marketing


### Criar arte de oferta, saudação ou vídeo

1. Abra **Arte do produto**.
2. Escolha o **Produto**, o **Formato** e o **Tipo de arte** (oferta, saudação...).
3. Ajuste textos, cores, foto e selo; veja o resultado ao lado.
4. Toque em **Baixar imagem** ou envie pelo WhatsApp. Para vídeo, use **Gerar vídeo** e depois **Baixar vídeo**.

> No modo Saudação (Bom dia, Boa tarde, Boa noite) você pode usar a sua própria paisagem.

### Mudar a tela inicial: dashboard, papel de parede ou área de trabalho

1. No **Início**, toque em **Aparência**.
2. Em **Dashboard**, escolha Desligado, Foco no dia, Painel com anéis ou **Área de trabalho** (só papel de parede e/ou logo).
3. Em **Papel de parede**, escolha a paisagem do horário ou envie a sua foto.
4. Na Área de trabalho, marque o que mostrar: logo, relógio, atalhos e aviso de pendências.

> A escolha vale só para este aparelho.

## Configuração


### Dados da empresa, logo, Pix e tema

1. Abra **Empresa**.
2. Preencha os dados da empresa, envie a **Logo** e informe a **Chave Pix**.
3. Ajuste multa e juros do carnê e o **Tema** (cores sazonais).
4. Toque em salvar.

### Backup e restauração dos dados

1. Abra **Empresa** e vá até **Backup dos dados**.
2. Toque em **Baixar backup agora** e guarde o arquivo fora deste computador (por exemplo, no Google Drive).
3. Para voltar um backup, use **Restaurar backup** e escolha o arquivo.

> Faça backup com frequência, principalmente antes de importar planilhas grandes.

### Sincronização e trabalhar sem internet

1. O sistema funciona sem internet: as vendas ficam guardadas no aparelho.
2. O indicador no topo mostra "sincronizado" ou "N pendente(s)". Ao voltar a internet, tudo é enviado sozinho.
3. Se aparecer "recusado(s)", toque no indicador: o servidor não aceitou aquele registro. Corrija e use **Tentar de novo**, ou **Descartar**.

### Buscar qualquer coisa e atalhos

1. Toque em **Buscar** (ou use **Ctrl+K**).
2. Digite o nome de um cliente, produto ou tela e escolha o resultado.

### Instalar o app e atualizar para a versão nova

1. Para instalar, toque em **Instalar app** (no navegador, Adicionar à tela inicial).
2. Para atualizar, use **Forçar atualização** (botão no topo, ao lado do número da versão) ou, em **Empresa**, no fim da página, **Verificar atualização**.
3. Seus dados e vendas não são apagados na atualização.


---

# Manual do MultMix PDV (vendedor)


## Vendas


### Fazer uma venda

1. Abra **Nova venda**.
2. Busque o produto pelo nome ou código, ou use **Escanear**. Toque nele para adicionar.
3. Ajuste a quantidade e, se precisar, o desconto do item.
4. Escolha a forma de pagamento (À vista, Cartão ou Carnê) e o meio.
5. Toque em **Finalizar venda**.

> Sem internet a venda fica guardada e é enviada sozinha quando voltar.

### Pausar uma venda e retomar depois

1. Com itens no carrinho, toque em **Pausar venda**.
2. Para voltar, toque em **Em espera** e em **Retomar**.
3. Para jogar fora, toque em **Descartar**.

### Vender no carnê

1. Em **Nova venda**, escolha **Carnê**. Se o carnê não estiver liberado para você, a opção aparece como "Carnê (com autorização do administrador)".
2. Preencha o nome do cliente, a entrada, as parcelas e o 1º vencimento.
3. Toque em **Finalizar venda**. Se pedir autorização, o administrador digita e-mail e senha (e o código de 2 etapas, se tiver) e toca em **Autorizar**.
4. A autorização vale 20 minutos e só para esta venda. Precisa de internet.

### Dar desconto

1. No carrinho, toque no desconto do item ou da venda e informe o valor.
2. Descontos até o limite livre passam direto. Acima dele, o administrador precisa autorizar com e-mail e senha.
3. Para tirar, toque em **Remover desconto**.

### Ver minhas vendas e comissão

1. Abra **Minhas vendas**.
2. Veja as vendas do mês, o que ainda está pendente de envio e a sua comissão.
3. Se houver venda pendente, toque em **Tentar enviar agora**.

### Devolver ou cancelar uma venda

1. Abra **Minhas vendas** e encontre a venda.
2. Toque em **Devolver** (itens devolvidos e motivo) ou em **Cancelar venda**.
3. Escolha como devolver o dinheiro: Dinheiro, Pix, Cartão ou Troca.
4. Venda no carnê ou fora do prazo: procure o administrador.

## Caixa


### Abrir, movimentar e fechar o caixa

1. Abra **Caixa** e toque em **Abrir caixa** com o valor do troco.
2. Use **Suprimento (colocar troco)** e **Sangria (retirar dinheiro)** quando mexer no dinheiro.
3. No fim do dia, toque em **Fechar caixa**, conte o dinheiro e informe o valor. O sistema mostra a diferença.
4. Use **Imprimir resumo** para guardar o fechamento.

> Se o caixa for obrigatório para você, o sistema só deixa vender com o caixa aberto.

### Vincular este aparelho como terminal

1. Peça ao administrador o código do terminal (em **Balcão (PDV) › Terminais** no Sistema).
2. No PDV, em **Caixa**, toque em **Vincular este aparelho** e digite o código.

## Ponto de venda


### Meu ponto e estoque da loja

1. Se você tem ponto, o topo da venda mostra o nome do ponto e quantas peças você tem.
2. **Meu ponto** lista só o que está no seu estoque. **Geral (loja)** lista todos os produtos com a quantidade da loja.
3. Cada produto mostra "Ponto N · Loja M". Se vender algo que só tem na loja, a baixa sai da loja e o PDV avisa.

## Marketing


### Arte e cartão de visita

1. Abra **Arte e cartão**.
2. Escolha o produto (ou a saudação), ajuste textos, foto e cores.
3. Toque em **Enviar pelo WhatsApp** ou **Baixar imagem**. Para vídeo, **Gerar vídeo** e depois **Baixar vídeo**.
4. **Meu cartão de visita** gera o seu cartão com nome e WhatsApp.

## Geral


### Trabalhar sem internet

1. Pode vender normalmente sem internet: as vendas ficam guardadas neste aparelho.
2. O indicador no menu mostra "N pendente(s)". Ao voltar a internet elas são enviadas sozinhas.
3. Se uma venda for recusada pelo servidor, o administrador é avisado: procure-o.

### Mudar aparência (tema claro ou escuro)

1. Toque em **Aparência** no menu.
2. Escolha claro, escuro ou grafite e a cor de destaque.

### Instalar o app e atualizar

1. Para instalar, toque em **Instalar app** (ou Adicionar à tela inicial no navegador).
2. Para atualizar, role o menu até o rodapé e toque em **Forçar atualização**.

### Mensalidade e licença do sistema

1. Quando a mensalidade estiver perto do vencimento, aparece uma faixa no topo.
2. Toque em **Pagar mensalidade (Pix)** para gerar o Pix e pagar.
3. Se vencer, o sistema pode ficar em "somente consulta" até regularizar.
