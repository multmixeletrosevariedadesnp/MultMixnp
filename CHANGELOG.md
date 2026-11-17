# Histórico de versões

## Instalador Windows 1.3.3 + API fiscal — 17/11/2026
- Tabela do IBPT no app do Windows: o arquivo `tabela.csv` agora também é buscado na versão publicada ao abrir (antes o app usava a cópia embutida no instalador e a atualização automática da tabela não via o arquivo novo).
- API fiscal: a consulta ao IBPT espera até 10 s (antes 6 s), porque o serviço do IBPT e o Render acordando às vezes demoram.

## Instalador Windows 1.3.2 — 17/11/2026
- O Sistema, o PDV e o Catálogo agora abrem **já atualizados**, sem precisar "Forçar atualização": ao abrir, o programa busca a versão publicada (espera no máximo 3 segundos) e guarda uma cópia. Sem internet ou com internet lenta, usa a cópia guardada e funciona igual. Antes, a versão nova só aparecia depois de abrir duas vezes.

## Sistema 1.95.44 — 17/11/2026
- Menu do topo (Gestão, Vendas…): com ícones em vidro os botões ficam mais altos e o fim da lista (Auditoria, Relatórios, Configurações…) ficava cortado fora da tela. Agora o menu tem a altura limitada à janela e rola, e no estilo vidro os botões ficam um pouco mais compactos.

## Sistema 1.95.43 / PDV 1.33.25 — 17/11/2026
- **Cadastrar cliente novo direto na venda** (botão "+ Cadastrar cliente novo", no PDV e na tela Venda do Sistema), sem ir em Clientes. Formulário curto: nome (obrigatório), CPF/CNPJ, telefone e endereço (o CEP preenche rua, bairro, cidade e UF). O cliente já fica escolhido na venda. Se o CPF/CNPJ já existe, usa o cadastro existente.
- No PDV rode `supabase-v55.sql` (o vendedor cria cliente por uma função segura, que só cria e nunca altera cadastros). Sem internet, o PDV usa os dados digitados e o cadastro é criado quando a venda é enviada.

## PDV 1.33.24 — 16/11/2026
- Busca de cliente: a lista aparece logo abaixo do campo do nome (antes ficava depois de CPF/Telefone) e o campo explica o que fazer.

## PDV 1.33.23 — 16/11/2026
- Busca de cliente: o resultado (ou a mensagem) fica abaixo de CPF/Telefone e podia ficar fora da tela; agora a tela rola até ele.

## PDV 1.33.22 — 16/11/2026
- **Todo vendedor pode buscar cliente** (rode `supabase-v54.sql`). O vendedor vê nome e telefone; o CPF só aparece para administrador e quem vende no carnê (os demais veem "cadastro completo"). Ao escolher o cliente, a venda fica ligada ao cadastro completo, e a emissão fiscal usa CPF e endereço sem o vendedor ver. O servidor passou a ligar o cliente escolhido em qualquer forma de pagamento (antes só no carnê).

## PDV 1.33.21 — 16/11/2026
- Busca de cliente: não depende mais do aviso "online" do navegador (no app do Windows podia ficar travada), mostra "Buscando…", "Nenhum cliente encontrado" e o motivo quando falha (sem permissão de carnê, função não instalada, sem conexão). Admin também pode buscar.

## Instalador Windows 1.3.1 — 16/11/2026
- Corrigido: ao abrir o Sistema/PDV/Catálogo pelo instalador, o Windows mostrava "Obter um aplicativo para abrir este 'mm' link" e a janela ficava azul vazia. O endereço interno `mm://` agora é atendido na sessão própria de cada programa. Gere o instalador de novo (GitHub Actions) para valer.

## Sistema 1.95.42 — 16/11/2026
- Ao abrir o app já logado (ou depois de "Forçar atualização"), o administrador cai direto no **Início**. Antes só o login novo ia ao Início; a reabertura ainda abria em Produtos.

## Sistema 1.95.41 — 16/11/2026
- **Início no celular: grade de atalhos grandes** (estilo aplicativo): foto da empresa no alto, relógio e uma grade com Nova venda, Clientes, Produtos, Pedidos, Carnês, Cobrança, Caixa, Contas a pagar, Fiscal, Balcão, Relatórios, Buscar e Ajuda, com contagem de pendências. É o padrão no celular; dá para desligar em Aparência.
- Corrigido: ao mexer em Aparência o sistema guardava todas as posições (inclusive as automáticas), e o celular ficava preso na disposição errada do relógio e dos atalhos. Agora só guarda o que a pessoa escolheu, e limpa a escolha antiga errada no celular.

## Sistema 1.95.40 — 16/11/2026
- Celular deitado no Início: o cabeçalho some só nessa tela e o espaço extra vai para a foto (maior). Gire para em pé para ver versão e "Forçar atualização".

## Sistema 1.95.39 — 16/11/2026
- Ao girar o celular (deitado ↔ em pé) o Início agora se reorganiza sempre; antes podia ficar com a disposição do modo anterior (relógio sobre a logo, atalhos espremidos).

## Sistema 1.95.38 — 16/11/2026
- **Celular deitado:** o Início usa a disposição do computador (relógio embaixo à esquerda, atalhos embaixo), cabe na tela sem esconder os atalhos atrás do menu, e o menu inferior ocupa a largura toda. Gira o aparelho e a tela se ajusta.

## Sistema 1.95.37 — 16/11/2026
- Depois do login, o administrador agora cai direto no **Início** (Área de trabalho), no celular e no computador. Antes abria em Produtos.

## Sistema 1.95.31 a 1.95.36 — 16/11/2026
- **Celular — verificação completa:** 19 telas e 25 janelas testadas em iPhone SE, Android 360 e Pixel 7, sem texto cortado nem tela passando da largura.
- **Tabelas viram cartões no celular** (Clientes, Produtos, Carnês, Cobrança, etc.): cada linha mostra os campos com o nome acima, em vez de colunas apertadas.
- **Carrinho da Venda:** nome do produto completo, quantidade e valor em linha própria, botão Finalizar abaixo do cabeçalho e barra do carrinho sem quebrar.
- **Janelas** passam por cima do menu inferior (os botões de baixo não ficam escondidos).
- Caixinhas de marcar com tamanho normal; links do WhatsApp com área de toque maior.
- Botão Voltar do aparelho não prende em janelas quando se usa o menu "Mais".

## Sistema 1.95.30 — 16/11/2026
- **Celular, tela Venda:** a barra "Ver carrinho" cobria o menu inferior e não dava para sair da Venda sem fechar o sistema. Agora ela fica acima do menu.
- **Botão Voltar do aparelho (Android/iPhone):** fecha a janela aberta ou volta para a tela anterior, em vez de sair do sistema.

## Sistema 1.95.29 — 16/11/2026
- Fiscal no celular: o quadro "Emissão (API fiscal e SEFAZ)" (certificado, tabela IBPT) agora quebra em linhas e não corta o texto na direita. Vale para todas as linhas de resumo.

## PDV 1.33.20 — 16/11/2026
- Correção: no celular o cabeçalho podia ficar com altura de tela inteira (defeito da 1.33.19).

## Sistema 1.95.28 — 16/11/2026
- **Modo celular automático:** o sistema reconhece sozinho o celular (tela estreita ou aparelho de toque pequeno, inclusive deitado) e usa o menu inferior, a Área de trabalho adaptada (foto inteira, relógio no topo, atalhos embaixo em linha) e área segura do iPhone. Em Aparência › Modo de tela dá para forçar Celular ou Computador. Corrige também o cabeçalho que ficava gigante no celular na 1.95.22.

## Sistema 1.95.27 — 16/11/2026
- **Início padrão:** o sistema abre na Área de trabalho com a imagem da MultMix (`inicio.jpg`), relógio no canto inferior esquerdo e atalhos embaixo. Quem já escolheu outra aparência mantém a escolha; para voltar ao padrão, limpar os dados do navegador/app ou escolher de novo em Aparência.

## Sistema 1.95.26 — 16/11/2026
- **Área de trabalho com foto própria:** a imagem agora é ajustada à tela sem cortar (as sobras ficam preenchidas com a própria foto desfocada). Em Aparência há a opção "Preencher (corta as bordas)".

## Sistema 1.95.25 — 16/11/2026
- **Área de trabalho:** o tamanho do relógio e da data agora é uma barra deslizante (40% a 300%) que muda na hora.

## Sistema 1.95.24 — 16/11/2026
- **Aparência › Área de trabalho:** escolha em qual lugar da tela ficam a logo, o relógio e os atalhos (9 posições: cantos, laterais, topo, base e centro) e o tamanho do relógio (pequeno/médio/grande).

## Sistema 1.95.23 — 16/11/2026
- **Início "Área de trabalho"** agora ocupa a tela inteira (sem as margens laterais e bordas arredondadas), ajustando a altura até o rodapé.

## Sistema 1.95.22 + PDV 1.33.19 — 16/11/2026
- **Celular (iPhone e Android):** área segura (notch/barra inferior do iPhone), `100dvh` (barra do Safari/Chrome não corta a tela), campos com 16px no celular (o iPhone não dá mais zoom ao tocar no campo), botões e links com área de toque de 44px (PDV incluído), barra de status do iPhone integrada ao app instalado.

## Sistema 1.95.21 + PDV 1.33.18 — 16/11/2026
- **Ajuda:** botão **Ajuda** (ou tecla F1) abre um chat que responde só pelo manual, com passo a passo e botão "Abrir esta tela". Sistema: 34 temas; PDV: 14 temas. Funciona offline. Perguntas sem resposta ficam registradas (Ver todos os temas › Perguntas sem resposta) para completar o manual.
- O texto do manual está em `manual.js` de cada app (e `manual.json` na raiz). `MANUAL-MultMix.md` é a versão para ler e imprimir.

## PDV 1.33.17 — 16/11/2026
- **Carnê com autorização do administrador, venda a venda** (rode `supabase-v53.sql`). Vendedor sem a liberação fixa de carnê vê a opção "Carnê (com autorização do administrador)"; ao finalizar, o administrador digita e-mail e senha (e o código de 2 etapas, se tiver) na tela do PDV. A autorização vale 20 minutos e só uma vez, e só para aquele vendedor. Precisa de internet.

## Sistema 1.95.20 + PDV 1.33.16 — 16/11/2026
- Links (ex.: "WhatsApp Web") aparecem em azul claro legível nos temas escuro e grafite, em vez do roxo padrão do navegador que sumia no fundo escuro.

## PDV 1.33.15 — 16/11/2026
- Vendedor com ponto: botões **Meu ponto** (só o que está no ponto dele, padrão) e **Geral (loja)** (todos os produtos, com a quantidade da loja) na tela de venda. A escolha fica salva no aparelho.

## Sistema 1.95.19 + PDV 1.33.14 — 16/11/2026
**Pontos de venda (consignação)** — rode `supabase-v52.sql` no Supabase.
- **Sistema › Pontos de venda:** cadastra o ponto de um vendedor, envia mercadoria da loja ao ponto (remessa), recebe de volta (retorno) e mostra o estoque, o valor e as últimas movimentações de cada ponto.
- **PDV do vendedor com ponto:** vê todos os produtos com "Ponto N · Loja M" (só quantidades, sem custo). A venda baixa primeiro do ponto e o que faltar sai da loja automaticamente. Venda cancelada ou devolvida volta para onde saiu.
- A venda sobe para o Sistema como sempre e só o administrador emite a nota.
- Vendedor sem ponto: nada muda.
- Próximas etapas: saldo e comissão por ponto, acerto, carnê só com autorização, contagem do ponto.

## Sistema 1.95.18 — 16/11/2026
- **Início · Área de trabalho:** nova opção em Aparência. Esconde dashboard, avisos e números e deixa só o papel de parede e/ou a logo da empresa, como uma área de trabalho. Dá para ligar ou desligar logo, relógio, atalhos e um aviso discreto de pendências. Fica só neste aparelho.

## Sistema 1.95.17 — 16/11/2026
Sincronização (auditoria + correções):
- **Leitura completa:** o sistema lia só as primeiras 1000 linhas de cada tabela e apagava o resto do aparelho. Agora lê em páginas até o fim.
- **Estoque protegido:** editar preço ou dados de um produto não envia mais o estoque antigo (que desfazia a baixa de vendas feitas em outro aparelho). O estoque só vai quando a edição o altera de propósito.
- **Fila não trava:** se o servidor recusar um registro, só ele sai da fila e vai para "recusados" (clique no indicador de sincronização para tentar de novo ou descartar). As demais vendas seguem.
- Pendente: mover o banco local do localStorage (~5 MB) para IndexedDB.

## sistema 1.95.16 — 2026-11-16
Início com dashboard opcional (desligado por padrão), em dois modelos escolhidos no botão "Aparência" (junto do papel de parede): Modelo 1 "Foco no dia" (vendas de hoje, mini gráfico dos 7 dias, mês, recebido, atraso e lista de atenção) e Modelo 2 "Painel com anéis" (4 indicadores com anel de porcentagem, anel do recebido no mês, gráfico de vendas por dia com 7, 15 ou 30 dias e últimas vendas). Acompanham o tema claro ou escuro do sistema, usam só dados que o sistema já tem e funcionam offline. Cada aparelho guarda a sua escolha. Sem SQL. O PDV não muda (1.33.13).

## sistema 1.95.15 — 2026-11-16
Início com papel de parede opcional (sem dashboard): botão "Papel de parede" no Início, com paisagem do horário (muda sozinha entre dia, tarde e noite), dia, tarde, noite ou foto do próprio usuário. Mostra a saudação (Bom dia, Boa tarde, Boa noite) e deixa os cartões legíveis por cima da imagem. A escolha fica só no aparelho. Sem SQL. O PDV não muda (1.33.13).

## sistema 1.95.14 — 2026-11-16
Tela Fiscal: o texto de apoio deixou de dizer só "em homologação" e passou a explicar os dois ambientes (homologação sem valor fiscal; produção vale de verdade). Sem SQL. O PDV continua na 1.33.13.

## sistema 1.95.13 e pdv 1.33.13 — 2026-11-16
Arte de oferta de produto também com foto ou vídeo de fundo (ex.: Oferta Relâmpago com raios). O bloco "Foto de fundo" e o "Vídeo de fundo" passam a aparecer nos dois tipos de arte; no vídeo, a arte inteira (produto, preço e textos) entra por cima com efeito suave. Com fundo, os textos ficam brancos com contorno escuro para dar leitura (as cores ainda podem ser trocadas) e o controle "Escurecimento do fundo" ajuda a destacar. Sem SQL.

## sistema 1.95.12 e pdv 1.33.12 — 2026-11-16
Arte de saudação: ao escolher o tipo "Saudação", o selo (balão de oferta) já vem desligado, além das condições e da validade. Ao voltar para "Oferta de produto", tudo volta como estava. Sem SQL.

## sistema 1.95.11 e pdv 1.33.11 — 2026-11-16
Arte em vídeo: novo modo de geração quadro a quadro (30 quadros por segundo garantidos), que não depende da velocidade do aparelho: o vídeo pode demorar mais para gerar, mas sai sempre fluido. O gravador em tempo real passa a ser usado só se o navegador não tiver esse recurso. Sem SQL.

## sistema 1.95.10 e pdv 1.33.10 — 2026-11-16
Arte em vídeo: correção do vídeo travado (poucos quadros por segundo). Os textos da arte agora são preparados uma vez só em vez de redesenhados a cada quadro, o que deixa a geração bem mais leve. Qualidade de gravação maior, opção "Leve (540 px)" para aparelhos lentos e aviso se o aparelho gerar menos de 22 quadros por segundo. Sem SQL.

## sistema 1.95.9 e pdv 1.33.9 — 2026-11-16
Arte de saudação em vídeo: dá para enviar um vídeo de fundo do aparelho e gerar um vídeo (5, 8, 10 ou 15 segundos, 720 px, sem som) com a saudação, a frase, o selo, o logo e o rodapé por cima, entrando com efeito suave. O vídeo é gerado no próprio aparelho, sem servidor (MP4 no Chrome/Edge atualizado; WEBM em navegadores antigos). Botões para enviar ao WhatsApp ou baixar. Sem SQL.

## sistema 1.95.8 e pdv 1.33.8 — 2026-11-16
Gerador de artes: controle para aumentar ou diminuir a logo e o nome da empresa no topo (40% a 220%), em todos os tipos de arte. Sem SQL.

## sistema 1.95.7 e pdv 1.33.7 — 2026-11-16
Gerador de artes: mais de 30 novas fontes na lista (modernas, clássicas, manuscritas, de pincel, de giz etc.) e, na arte de saudação, fonte própria para a saudação e para a frase. As fontes dependem das letras instaladas no aparelho; se uma não existir, entra uma parecida. Sem SQL.

## sistema 1.95.6 e pdv 1.33.6 — 2026-11-16
Arte de saudação: ajuste fino com mover a saudação (subir/descer e esquerda/direita), tamanho, distância entre a saudação e a frase, transparência da saudação e da frase, e escurecimento da foto de paisagem. Botão "Voltar ao padrão". Sem SQL.

## sistema 1.95.5 e pdv 1.33.5 — 2026-11-16
Gerador de artes no computador: a prévia fica fixa ao lado e agora cabe inteira na altura da tela, para ver a arte completa enquanto rola as opções. Sem SQL.

## sistema 1.95.4 e pdv 1.33.4 — 2026-11-16
Gerador de artes: novo tipo de arte "Saudação" (Bom dia / Boa tarde / Boa noite). A saudação pode ser automática pelo horário ou escolhida, com texto próprio e frase editável. Dá para enviar uma foto de paisagem como fundo (enquadre com tamanho, posição e giro da foto) ou usar a paisagem desenhada pelo sistema (céu, sol ou lua e morros). Continuam valendo logo e nome, selo, data especial, fonte, cores, condições, validade, mascote, rodapé e formato Status/Feed. Sem SQL.

## sistema 1.95.3 e pdv 1.33.3 — 2026-11-16
Licença: a faixa de aviso (vence em breve / vencida) tampava o topo do sistema. A causa era que o sistema troca a classe do corpo da página ao mudar de layout e apagava o espaço reservado para a faixa. Agora o espaço é reservado em outro lugar (não é apagado), a faixa é fixa e de uma linha só, e o menu, o cabeçalho e os painéis fixos descem 28 px abaixo dela em todos os layouts (lateral, em cima, dock, mini, duo, foco e embaixo). Fica abaixo das janelas abertas, em vez de por cima delas. Sem SQL.

## painel de licenças 1.4.7 — 2026-11-13
Ícone do aplicativo trocado pela logo AdaptaSys em azul metálico, agora com bordas arredondadas (ícone do app e do instalador do Windows 1.0.4). Só imagens e cache; sem SQL.

## painel de licenças 1.4.6 — 2026-11-13
Ícone do aplicativo atualizado para a nova logo AdaptaSys (vertical, fundo branco), também no instalador do Windows. Só imagens e cache; sem SQL.

## painel de licenças 1.4.5 — 2026-11-13
Ícone do aplicativo trocado pela logo AdaptaSys vertical sobre fundo branco (menos azul na tela inicial); favicon da aba com o "A" e a órbita. Mesmo ícone no instalador do Windows. Só imagens e cache; sem SQL.

## painel de licenças 1.4.4 — 2026-11-13
O endereço do projeto central e a chave pública (publishable) já vêm preenchidos: ao abrir no celular, no app instalado ou no programa do Windows, vai direto para o login, sem digitar nada. O que for salvo na tela "Conectar" continua tendo prioridade. Sem SQL.

## painel de licenças 1.4.3 — 2026-11-12
Logo completa (com "Sistemas Inteligentes") também no cabeçalho, em tamanho maior. Sem SQL.

## painel de licenças 1.4.2 — 2026-11-12
Logo do cabeçalho e do login sem corte: o brilho e a órbita da logo estavam sendo cortados na borda da imagem (em cima e embaixo). Imagens refeitas com margem, versão compacta com a órbita inteira, caixa do cabeçalho maior. Sem SQL.

## painel de licenças 1.4.1 — 2026-11-12
Ícone do aplicativo trocado pelo ícone AdaptaSys azul neon (cantos arredondados, versões para Android, iPhone e aba do navegador). Só imagens e a versão do cache; sem SQL.

## painel de licenças 1.4.0 — 2026-11-12
Painel instalável como aplicativo no celular e no computador (ícone AdaptaSys, abre em tela cheia, sem barra do navegador; botão "Instalar app" no cabeçalho, com instrução para iPhone). Novos arquivos na pasta do painel: `manifest.webmanifest`, `sw.js` e os ícones. Layout ajustado para telas pequenas (cabeçalho em linhas, números em 3 colunas, botões e campos maiores para o toque, sem rolagem lateral). A central nunca passa pelo cache. Sem SQL.

## painel de licenças 1.3.1 — 2026-11-12
Logo AdaptaSys (nova) no cabeçalho (versão compacta, maior) e na tela de entrada (completa, com "Sistemas Inteligentes"); ícone da aba atualizado; textos "Adapta Systemas" trocados por "AdaptaSys". Só no painel; sem SQL.

## painel de licenças 1.3.0 — 2026-11-12
Tela de entrada nova: ilustração de segurança à esquerda e painel azul com a logo da Adapta Systemas, "Bem-vindo" e campos arredondados à direita (no celular só o painel azul). Mostra o tempo de sessão configurado. Inclui o limite de inatividade da 1.2.1. Só no painel; sem SQL.

## painel de licenças 1.2.1 — 2026-11-12
Sessão com limite de inatividade configurável no cabeçalho (sem limite, 5, 10, 15, 30, 60 min ou 2 h; padrão 15 min). Aviso 30 s antes com botão "Continuar logado"; ao vencer, o painel sai da conta e volta ao login com a mensagem. Vale também ao reabrir a aba depois do prazo. Só no painel; sem SQL.

## painel de licenças 1.2.0 — 2026-11-12
Visual novo "Tech" com a logo da Adapta Systemas (cabeçalho, entrada e ícone da aba): temas Tech claro (novo padrão) e Tech escuro, fundo em grade, botões em degradê azul, cartões com brilho e painel de números (em dia, teste, carência, vencidas, bloqueadas e receita mensal). Os temas e layouts anteriores continuam disponíveis. Sem SQL e sem mudar a função.

## pdv 1.33.2 — 2026-11-12
Arte do produto no PDV igualada ao Sistema: barra de giro livre da foto (-180° a 180°, botões ↶ ↷ de 1 em 1 grau); "Foto no padrão" zera o ângulo. Sem SQL.

## sistema 1.95.2 — 2026-11-12
Arte do produto: o giro da foto deixou de ser só de 90° e virou uma barra de ângulo livre (-180° a 180°, com botões ↶ ↷ de 1 em 1 grau), no mesmo estilo dos ajustes de tamanho e posição. É aplicado na hora, sem perder qualidade, e "Foto no padrão" zera o ângulo. Sem SQL.

## sistema 1.95.1 e pdv 1.33.1 — 2026-11-12
Licença: o aviso saiu da parte de baixo da tela e virou uma faixa fina no topo (rola junto com a página); aparece só nos 5 dias finais antes de vencer e, depois, enquanto estiver vencida. O aviso amarelo pode ser fechado no ×; o vermelho não. Sem SQL.

## licenciamento: sistema 1.95.0, pdv 1.33.0, painel de licenças 1.1.0 e função licenca — 2026-11-12
**Apps (Sistema e PDV):** LED ao lado de "sincronizado" mostrando a conexão com a central de licenças (verde = conectada, amarelo = sem conexão agora / vence em breve, vermelho = bloqueada, vencida ou sem conferir, cinza = sem chave; clique para abrir a licença) e aviso "Pagamento confirmado" quando a validade aumenta. **Painel:** 5 temas (Claro, Escuro, Oceano, Floresta, Ameixa), 3 layouts (Lista, Cartões, Compacto), LED de conexão por loja, LED do servidor, tela Atividade e aviso com som quando uma loja paga. **Função licenca:** nova ação `atividade` (atualize a função no Supabase). Sem SQL novo.

## sistema 1.94.2 e pdv 1.32.2 — 2026-11-12
Licença: chave pública do servidor de licenças atualizada (a anterior não era mais a usada na assinatura). Sem SQL.

## sistema 1.94.1 e pdv 1.32.1 — 2026-11-12
Licença: quando não consegue conferir, a janela (para o administrador) mostra o **detalhe técnico** do motivo (resposta do servidor, rede ou assinatura). Sem SQL.

## sistema 1.94.0 e pdv 1.32.0 — 2026-11-12
**Licença mensal ligada** (servidor central de licenças). **Rode o `supabase-v51.sql` antes de publicar.** Sem chave cadastrada em Empresa > Licença nada é bloqueado; com chave, vale o ciclo teste, mensalidade por Pix, carência e somente consulta.

## sistema 1.93.1 — 2026-11-12
**Arte do produto:** botões **Girar à esquerda** e **Girar à direita** na foto (90° por toque, sem perder qualidade). A remoção de fundo e o tamanho/posição continuam valendo. Não precisa rodar SQL.

## sistema 1.93.0, função fiscal e API fiscal — 2026-11-12
**Trocar certificado digital sem abrir o Render:** em Fiscal, o administrador escolhe o .pfx novo, digita a senha e o Sistema confere (abre com a senha, mostra titular e validade, barra certificado vencido ou de outro CNPJ) e grava `CERT_PFX_BASE64` e `CERT_PASSWORD` no Render pela API dele, já mandando publicar. Arquivo e senha não ficam salvos no Sistema nem no Supabase. **Precisa de:** nova versão da API fiscal (rota `/certificado/validar`), nova função `fiscal` e dois segredos nela: `RENDER_API_KEY` e `RENDER_SERVICE_ID`. Inclui também a versão 1.92.0 (licença mensal, ainda desligada).

## licenciamento mensal: sistema 1.92.0, pdv 1.31.0, catalogo 1.12.0, painel de licenças 1.0.0 — 2026-11-12
**Rode o `supabase-v51.sql` no banco da loja antes de publicar.** Novo servidor central de licenças (`supabase-licencas.sql` + função `licenca`, projeto Supabase próprio do fornecedor) e painel (`licencas/`). Chave por loja, 14 dias de teste, 5 de carência, depois **somente consulta** (não registra venda nem emite nota; recebimento de parcelas continua). Resposta assinada (ECDSA) guardada no banco da loja e conferida no aparelho; funciona 10 dias sem internet. Mensalidade por Pix (Mercado Pago) gerada automaticamente 7 dias antes do vencimento, renova sozinha ao pagar. Catálogo pausa pedidos quando a loja está em somente consulta. **Enquanto `LIC_URL` estiver vazio nos apps, nada muda** (é o caso da MultMix até você ligar).

## catalogo 1.11.0 — 2026-11-12
**Busca do catálogo corrigida:** digitar no campo não filtrava (o campo de busca do navegador tem uma propriedade `list` que escondia a função do catálogo). Agora filtra de verdade e ficou mais esperta: ignora acento, maiúscula e pontuação, aceita várias palavras em qualquer ordem e acha nome abreviado (“liquidificador” encontra LIQ.MONDIAL). A contagem das categorias acompanha a busca. A barra de busca e os botões de visualização ficaram com a mesma altura. **Visualização inicial passa a ser a compacta** (a escolha do cliente continua sendo lembrada).

## catalogo 1.10.1 — 2026-11-11
Os links “Primeiro acesso” e “Entrar” do Meu carnê ficavam azul escuro sobre fundo escuro; agora usam a cor do texto, em negrito e com sublinhado amarelo, legíveis em qualquer tema.

## sistema 1.91.0, catalogo 1.10.0 e função de cobrança — 2026-11-11
**Rode o `supabase-v50.sql` antes de publicar** e atualize a função `smart-service`. **Compra ligada ao cadastro**: com o cliente logado em Meu carnê, a sacola mostra “Comprando como Fulano ✓” e o pedido (WhatsApp ou Pix) é gravado pelo servidor ligado ao cadastro, com os preços do banco; o nome digitado não vale nesse caso. Sem login continua como antes, e o catálogo sem login não consegue ligar pedido a um cliente (regra no banco). No Sistema, Pedidos mostra “cliente cadastrado ✓” e Vender / Registrar venda já abre com esse cliente (mesmo havendo outro com o mesmo nome).

## função de cobrança — 2026-11-11
Só a função `smart-service`. **Meu carnê** cumprimenta com o nome completo do cadastro (“Olá, José Fulano de Tal!”) em vez do primeiro nome.

## sistema 1.90.1, catalogo 1.9.1 e função de cobrança — 2026-11-11
Sem SQL. **Meu carnê aceita CNPJ**: o cliente pessoa jurídica entra com o CNPJ (14 números, com ou sem pontos) e senha; o campo formata CPF ou CNPJ conforme a quantidade de números e a função confere os dígitos de cada um.

## sistema 1.90.0, catalogo 1.9.0 e função de cobrança — 2026-11-11
**Rode o `supabase-v49.sql` antes de publicar** e atualize a função `smart-service`. **Meu carnê no catálogo**: o cliente entra com CPF + senha (1º acesso com o código do carnê, que agora sai impresso no carnê) e vê as parcelas em aberto com multa e juros de hoje; pode pagar qualquer uma por Pix do Mercado Pago, inclusive adiantar, e a tela confirma sozinha. **Baixa feita pelo banco**: quando qualquer Pix de parcela é confirmado (Mercado Pago ou InfinitePay, gerado pelo Sistema ou pelo cliente), o banco lança o recebimento na hora com a mesma conta do Sistema, mesmo com o Sistema fechado; o Sistema puxa e avisa. Login do cliente separado do login da equipe (senha só embaralhada, bloqueio após 5 erros por 15 min, sessão de 7 dias). No carnê do Sistema: situação do acesso e botão “Liberar novo acesso”. Liga em Empresa > “Mostrar Meu carnê no catálogo”.

## sistema 1.89.0 — 2026-11-11
**Rode o `supabase-v48.sql` antes de publicar.** **Preços automáticos por porcentagem**: no produto, margem do à vista sobre o custo, cartão (% em cima do à vista) e carnê (% em cima do à vista); os preços se calculam sozinhos e continuam editáveis (preço digitado à mão mostra a % real). Padrão da loja em Empresa > Preços automáticos, com arredondamento opcional (,90 ou real inteiro). Produtos > **Recalcular preços** aplica as porcentagens em lote com prévia (não cria preço onde está em branco). Na entrada por XML com custo novo, o sistema oferece ver os preços sugeridos. A venda, o PDV, o catálogo e a nota usam os três preços como sempre.

## API fiscal (fiscalmultmix) e função `fiscal` — 2026-11-11
Sem SQL. **Desconto no campo próprio da nota**: quando a venda tem desconto (carnê pelo preço à vista, valor combinado, desconto no PDV), a nota sai com o preço de tabela da forma escolhida no item e a diferença no campo Desconto; o total da nota continua igual ao que o cliente pagou. Correção na API: o `Validator.php` agora soma o desconto de cada item (antes só olhava um desconto geral e recusava com “soma dos pagamentos difere do total da nota”). **Ordem: publique a API no Render primeiro, depois a função `fiscal`.** Promoção cadastrada no produto continua dentro do preço (não vira desconto).

## sistema 1.88.0 — 2026-11-10
Sem SQL, só o Sistema. **Novo layout “Dock (estilo Mac)”** em Aparência > Layout do menu: barra flutuante de vidro só com ícones, separados por grupo; ao passar o mouse o ícone cresce e os vizinhos acompanham, e o nome aparece num balão. Opções: posição (embaixo, em cima, esquerda, direita), tamanho dos ícones (32 a 64 px) e ligar/desligar o efeito de aumentar. O tamanho se ajusta sozinho para caber na tela. Números de avisos ficam no canto do ícone e a tela aberta ganha um pontinho amarelo. No celular fica embaixo, sem o efeito, e rola para o lado. Combina com qualquer estilo de ícone.

## sistema 1.87.0 — 2026-11-10
Sem SQL, só o Sistema. **Ícones novos e estilos de ícones**: cada tela ganhou um desenho próprio (casa no Início, caixa registradora no Balcão, prancheta em Pedidos, talão em Carnês, balão com $ em Cobrança, gaveta no Caixa, calendário em Contas a pagar, nota com selo ✓ no Fiscal, % em IBS/CBS/IS, nota com seta em Notas recebidas, % em Comissões, relógio em Auditoria, gráfico em Relatórios, paleta na Arte, cadeado em Senha). Em **Aparência > Estilo dos ícones** dá para escolher: Padrão (traço fino), **Vidro**, 3D brilhante, Tinta suave, Neon e Adesivo. Vale por aparelho, como o tema.

## sistema 1.86.0, pdv 1.30.0 e catalogo 1.8.0 — 2026-11-10
Sem SQL. **Cada app com ícone e nome próprios ao instalar no celular**: “MultMix Sistema” (faixa amarela SISTEMA), “MultMix Catálogo” (faixa laranja CATÁLOGO) e “MultMix PDV” (faixa verde PDV), também no formato redondo do Android e no iPhone. **Pedidos no celular**: cada pedido vira um cartão com o status no canto e os botões (Registrar venda, Vender, Cancelar, WhatsApp) sempre visíveis; antes ficavam escondidos à direita da tabela. Quem já instalou precisa remover o atalho e instalar de novo para ver o ícone novo.

## sistema 1.85.2 e pdv 1.29.6 — 2026-11-10
Sem SQL. **Imagem da cobrança no padrão MultMix**: topo azul com o logo, “MultMix” (Mult branco, Mix amarelo) e “Eletros e Variedades”, faixa amarela, cartão branco com o valor em destaque amarelo, QR Code com moldura azul e rodapé azul com o aviso “confira se o recebedor é a MultMix no app do banco”.

## sistema 1.85.1 e pdv 1.29.5 — 2026-11-10
Sem SQL. **Pix com link para a página da MultMix**: nas cobranças com código Pix (Mercado Pago e Pix da loja), a mensagem leva um link para a página `pix/`, que tem o botão grande **Copiar código Pix**, o valor, o recebedor e o QR Code. A imagem com o QR continua indo junto. O link não leva asterisco (o WhatsApp usaria como negrito e quebraria o link). Link da InfinitePay continua igual.

## catalogo 1.7.1 — 2026-11-10
Só o catálogo. **Cards alinhados**: o nome do produto ocupa sempre o espaço de 3 linhas (nome maior termina em “…”, o nome inteiro aparece ao abrir o produto), o preço fica na mesma altura em todos os cards da linha e o botão “Chamar no WhatsApp” fica sempre no rodapé do card. A visualização em lista não mudou.

## sistema 1.85.0, catalogo 1.7.0 e função de cobrança — 2026-11-10
**Rode o `supabase-v47.sql` antes de publicar** e atualize o código da função `smart-service`. **Pix pelo catálogo (Mercado Pago)**: na sacola aparece “Pagar agora com Pix · R$ X à vista” (só com a chave ligada em Empresa). O cliente paga pelo QR ou copia e cola, a tela confirma sozinha e o pedido chega no Sistema como **PAGO · entregar**, com aviso (bip e faixa) na Central de avisos até você registrar a venda (“Registrar venda (já pago)” em Pedidos, que já vem com à vista + Pix). Segurança: o valor é recalculado no servidor com os preços e promoções do banco; confere estoque; no máximo 3 Pix em aberto por telefone a cada 10 minutos; o catálogo só consegue consultar o status (pago/pendente), nenhum dado de cliente.

## sistema 1.84.2 e pdv 1.29.4 — 2026-11-10
Sem SQL. **Cobrança no modelo de banco**: o botão “Enviar ao cliente (imagem com QR + código)” manda uma imagem com a loja, o cliente, a parcela, o valor, o QR Code e a instrução “Escaneie o QR Code ou copie o código Pix da mensagem”, e o texto da mensagem é **só o código Pix** (ou o link), para o cliente copiar inteiro e colar no banco. No celular vai pelo “compartilhar”; no computador a imagem é copiada (Ctrl+V) e o código fica pronto na caixa de texto. “Só texto” continua mandando a mensagem completa.

## sistema 1.84.1 e pdv 1.29.3 — 2026-11-10
Sem SQL. **Cobrança em uma mensagem só**: o botão “Enviar ao cliente: mensagem + código + QR” manda o texto, o código Pix (ou link) e o QR Code juntos. No celular abre o “compartilhar” com o QR como imagem e o texto como legenda; no computador abre o WhatsApp com o texto pronto e copia o QR para colar (Ctrl+V). Há também “Só texto, direto no WhatsApp do cliente”. Substitui os 3 toques da versão anterior (parcela do carnê, Nova venda e PDV).

## sistema 1.84.0 — 2026-11-10
Sem SQL, só o Sistema. **Central de avisos recebe o pagamento de parcela**: seção “Pagamentos recebidos” (verde) com “Fulano pagou a parcela 3/6 · R$ … · pelo Mercado Pago/InfinitePay”, botões **Ok, visto**, **Ver carnê** e **Marcar todos como vistos**. Pagamento que cai com o sistema fechado ou em outro aparelho toca o bip e mostra a faixa quando o administrador abre o Sistema; os de hoje ficam 3 dias na lista até marcar como visto. Só vale para pagamentos novos (a partir desta versão); os antigos não viram aviso.

## sistema 1.83.4 e pdv 1.29.2 — 2026-11-10
Sem SQL. **Um botão só para enviar a cobrança**: “Enviar ao cliente · 1 de 3”. Cada toque abre o WhatsApp do cliente com a próxima parte, na ordem certa: mensagem, só o código e QR Code. Substitui os 3 botões separados (parcela do carnê, Nova venda e PDV). O WhatsApp não deixa enviar várias mensagens sozinho: em cada etapa você aperta enviar e volta ao sistema.

## sistema 1.83.3 e pdv 1.29.1 — 2026-11-10
Sem SQL, sem função nova. **Cobrança por WhatsApp em 3 envios separados**: 1 · mensagem (sem o código dentro), 2 · só o código Pix ou link (para copiar fácil) e 3 · QR Code como imagem (no celular abre o “compartilhar”; no computador copia a imagem para colar no WhatsApp, ou baixa). O código aparece num quadro verde destacado. Vale para parcela do carnê (Mercado Pago, InfinitePay e Pix manual), Nova venda e PDV.

## sistema 1.83.2 — 2026-11-10
Sem SQL, só o Sistema. **Criador de arte**: dois campos novos, **Carnê: parcelas** e **Cartão: em até quantas vezes**. Ao escolher o número, a arte mostra o valor de cada parcela (ex.: “ou 12x de R$ 16,58 no carnê” e “Cartão até 6x de R$ 29,83 = R$ 179,00”). O valor é o preço do carnê ou do cartão dividido pelo número escolhido, sem juros; o texto continua editável.

## sistema 1.83.1 — 2026-11-10
Sem SQL, só o Sistema. **Criador de arte no celular**: os botões Enviar para o WhatsApp, Baixar imagem e Copiar legenda ficam fixos na parte de baixo da tela (antes era preciso rolar a página inteira até o fim); a prévia fixa no topo ficou um pouco menor e ocupa toda a largura, sem faixas azuis dos lados; em celular deitado a prévia e os botões rolam junto com a página.

## sistema 1.83.0 — 2026-11-09
Sem SQL, só o Sistema. **Entrar sem internet**: quem já entrou com internet neste computador pode entrar sem internet com o mesmo e-mail e senha (a senha fica guardada só embaralhada, por 30 dias desde o último acesso com internet). Quando a internet volta, o sistema pede a senha de novo e envia as vendas pendentes. Sem internet a verificação em 2 etapas não pode ser conferida.

## desktop 1.3.0 — 2026-11-09
Instalador reconstruído: a cópia offline embutida é a do repositório no momento da geração (publique antes Sistema 1.82.1 e PDV 1.29.0). Inclui caixa por terminal, cobrança Mercado Pago/InfinitePay e aviso de parcela paga.

## sistema 1.82.1 — 2026-11-09
Sem SQL, só o Sistema. Quando uma parcela é paga e baixada sozinha, aparece uma faixa verde: “Fulano pagou a parcela 3/6 (R$ …) pelo Mercado Pago” (ou InfinitePay). Vale para pagamento na tela, em outro aparelho ou com o sistema fechado (o aviso aparece quando o administrador abre o Sistema).

## sistema 1.82.0 e pdv 1.29.0 — 2026-11-09
**Sem SQL. Republique a função de cobrança (mp-pix-index.ts).** Novo modo em Empresa > Cobrança automática > Provedor: **“Os dois (escolher na hora)”**. Nele, o carnê mostra os botões **Gerar com Mercado Pago** e **Gerar com InfinitePay**, e Nova venda e PDV ganham as opções de meio de pagamento com os mesmos nomes. Com um provedor só, o botão passa a se chamar “Gerar com …” e tudo segue como antes. O Mercado Pago só funciona depois de colocar o MP_ACCESS_TOKEN nos Secrets do Supabase.

## sistema 1.81.8 — 2026-11-09
**Republique a função de cobrança (mp-pix-index.ts).** Em Empresa > Chaves da InfinitePay: botão **Diagnosticar últimas cobranças** mostra, para as 5 últimas, o status gravado e a resposta crua da InfinitePay (para descobrir por que um pagamento não baixa).

## sistema 1.81.7 — 2026-11-09
**Republique a função `fiscal`.** Corrige “Dados inválidos · soma dos pagamentos difere do total da nota” em venda com desconto: a nota agora vai com os preços já com o desconto abatido (vDesc zerado), então o total da nota bate com os pagamentos. A janela Fiscal > Documento mostra o total da nota.

## sistema 1.81.6 — 2026-11-09
Sem SQL. Tela Fiscal > Documento: mostra “produtos / desconto / **total da nota**” exatamente como serão enviados (o desconto abate o valor da nota) e avisa se a soma não bater com o total da venda.

## sistema 1.81.5 e pdv 1.28.3 — 2026-11-09
Sem SQL. Mensagens de cobrança automática falam do provedor escolhido (InfinitePay ou Mercado Pago): “Falando com a InfinitePay”, erros e avisos sem citar Mercado Pago quando o provedor é InfinitePay.

## sistema 1.81.4 — 2026-11-09
Sem SQL. Cobrança do carnê por WhatsApp em **uma única mensagem**: leva um link para a página `pix/` com o botão **Copiar código Pix**, o **QR Code** (para pagar em outro aparelho ou mandar para outra pessoa escanear) e o código para copiar à mão. O botão “Enviar só o código” continua, opcional. **Publique também a pasta `pix/`.**

## sistema 1.81.3 — 2026-11-09
Sem SQL. **Republique a função de cobrança** (mp-pix-index.ts). A confirmação da InfinitePay não depende mais só do aviso automático: a cada conferência (a cada minuto com o Sistema aberto) a função pergunta à InfinitePay se o pedido foi pago e dá a baixa. Textos de “Pix recebido” sem citar Mercado Pago.

## sistema 1.81.2 — 2026-11-09
Sem SQL. Cobrança do carnê por WhatsApp: a mensagem não leva mais o código; ela avisa que o Pix vem na mensagem seguinte. Dois botões em ordem: **1. Enviar a mensagem** e **2. Enviar o código (mensagem separada)**, para o cliente segurar só o código e tocar em Copiar. A saudação ignora o início numérico do nome (ex.: CNPJ de MEI).

## sistema 1.81.0 — 2026-11-09
**Rode antes: `supabase-v46.sql`; republique a função `fiscal`.** Produto ganhou **Identificação por unidade** (IMEI, nº de série ou nº do quadro/chassi). Na Nova venda, o sistema pede um número por unidade (IMEI valida 15 dígitos e dígito verificador, aceita IMEI 2, avisa duplicidade e número já vendido), grava na venda e imprime no cupom. Na nota, a função `fiscal` envia cada unidade em uma linha com o número em `infAdProd`. Carnê com desconto agora envia `list_price`, e a nota destaca o desconto (vDesc) por item.

## sistema 1.80.1 — 2026-11-09
Sem SQL. Carnê com preço à vista ou valor combinado agora **sai como desconto**: o carrinho mostra “Tabela do carnê R$ X · desconto R$ Y”, a venda grava o desconto e quem concedeu, e ela aparece na tela de Descontos (auditoria). Os preços dos itens continuam ajustados para a nota fiscal bater com o total.

## sistema 1.80.0 — 2026-11-09
Sem SQL. Nova venda no **Carnê** (só administrador): campo **Preço do carnê** com “Preço de carnê (tabela)”, “Usar preço à vista” ou “Valor combinado (digitar o total)”. No valor combinado os preços dos itens são ajustados proporcionalmente (e os centavos acertados) para a soma bater com o total, o que vale também para a nota fiscal, e as parcelas são calculadas sobre esse total.

## sistema 1.79.4 e pdv 1.28.2 — 2026-11-08
Sem SQL. Na tela do QR da InfinitePay (Nova venda e PDV): campo de WhatsApp do cliente e botão **Enviar por WhatsApp** com o link de pagamento, para cobrar à distância. O link também continua copiável.

## sistema 1.79.3 e pdv 1.28.1 — 2026-11-08
Sem SQL. A função de cobrança passou a ser chamada pelo nome **smart-service** (o nome que o painel do Supabase sorteou ao publicar). O endereço do aviso de pagamento agora é montado a partir do nome real da função.

## sistema 1.79.2 — 2026-11-08
Sem SQL. Em Empresa > Chaves da InfinitePay: botão **Testar agora** gera um link de R$ 1,00, mostra o QR, confere se a cobrança automática/provedor estão ligados, mostra o erro exato se a InfinitePay recusar e confirma quando o pagamento chega.

## sistema 1.79.1 — 2026-11-08
Sem SQL novo (usa o v45 do 1.79.0). **Nova venda ganhou “Pix InfinitePay (QR automático)”** no meio de pagamento (aparece só com a cobrança automática ligada e provedor InfinitePay). Ao finalizar, abre o QR do link de pagamento; a venda só é registrada quando a InfinitePay confirma o pagamento. Se não conseguir gerar, oferece registrar como Pix comum.

## sistema 1.79.0 — 2026-11-08
**Rode antes: `supabase-v45.sql`.** Antes da nota fiscal: botão **Pagamento** troca a forma de pagamento de uma venda à vista (pede senha do admin e motivo; guarda a forma anterior, quem trocou e quando; o caixa passa a contar pela nova forma). Botão **Estornar** agora também na tela Fiscal (e em “Vendas do dia”, antes chamado Cancelar). Vendas com nota emitida não podem ter o pagamento trocado.

## sistema 1.78.1 — 2026-11-08
Sem SQL. Texto da cobrança automática em Empresa agora fala da InfinitePay.

## sistema 1.78.0 — 2026-11-08
**Rode antes: `supabase-v44.sql`, e republique a função `mp-pix`.** Empresa > “Chaves da InfinitePay”: o administrador digita a senha dele e cadastra InfiniteTag, token do aviso e chave da API. Ficam numa tabela do servidor sem leitura pelo navegador (a tela só mostra “configurado”) e a função `mp-pix` passa a usá-las; os segredos do Supabase continuam valendo como alternativa.

## sistema 1.77.0 e pdv 1.28.0 — 2026-11-08
**Rode antes: `supabase-v43.sql` (depois do v42).** **Vincular caixas por código (token)**: em Balcão > Terminais o administrador cria “Caixa 01, 02…” e recebe um código de 6 letras (vale 30 min). No PDV, em Caixa > “Vincular este aparelho”, o vendedor digita o código e o aparelho fica fixo naquele caixa. Enquanto houver terminal ativo, só aparelho vinculado abre caixa. Dá para gerar novo código (trocar de computador), desativar ou excluir.

## sistema 1.76.0 e pdv 1.27.0 — 2026-11-08
**Rode antes: `supabase-v42.sql`.** Cada caixa tem agora um **número (Caixa 01, 02…)**: o vendedor informa ao abrir (o PDV lembra no aparelho), e o número fica gravado no caixa. Dois vendedores não abrem o mesmo número ao mesmo tempo. No Sistema, Balcão > Caixas ganhou a coluna “Caixa”, e o título dos detalhes e o aviso de caixa aberto no fechamento do dia mostram o número.

## sistema 1.75.0 — 2026-11-08
**Rode antes: `supabase-v41.sql`.** Balcão > Caixas ganhou o **Fechamento geral do dia**: escolha o dia e veja todos os caixas dos vendedores somados (quantos, quais ainda abertos, dinheiro esperado, contado, diferença e recebido por forma). O botão “Conferir o dia” registra quem conferiu, quando e uma observação (só admin). Os caixas individuais continuam como antes.

## sistema 1.74.0 — 2026-11-08
Sem SQL. **Editar as peças do kit dentro do próprio kit**: cada peça da lista ganhou o botão “Editar peça”, que abre os campos (nome, cód. interno, EAN, NCM, CFOP, CSOSN, CEST, unidade e custo) logo abaixo dela. “Salvar peça” grava só aquela peça, sem fechar nem perder o que já foi digitado no kit.

## sistema 1.73.1 — 2026-11-08
Sem SQL. Corrige o erro **“Dados inválidos · item 1: NCM com 8 dígitos”** na emissão: a nota usa o NCM que ficou gravado na venda; se a venda foi feita quando o produto (ex.: kit) ainda não tinha NCM, o campo ficava vazio mesmo depois de preencher o cadastro. Agora, antes de emitir (nota única ou “emitir todas”), o sistema atualiza NCM, CFOP, CSOSN, CEST e unidade da venda a partir do cadastro atual do produto quando estiverem vazios ou inválidos.

## pdv 1.26.0 — 2026-11-07
Sem SQL. **Cartão de visita: ajuste dos textos** — tamanho do nome, do telefone e do cargo/extra, e mover o bloco de textos (esquerda/direita e subir/descer), com botão “Textos no padrão”. Vale para todos os modelos, horizontal e vertical. Útil quando o mascote ou a foto cobre algum texto.

## pdv 1.25.0 — 2026-11-07
Sem SQL. **Cartão de visita**: 13 paletas de cores prontas (azul, marinho e prata, verde, turquesa, roxo, vinho, rosa, laranja, vermelho, grafite, preto e dourado, champagne e branco/azul), **fundos premium** (linhas, pontilhado, ondas, geométrico, fibra de carbono, metal escovado e brilho cetim) e controles do **endereço**: mostrar/ocultar, tamanho (pequeno/normal/grande) e texto escrito à mão (vazio = endereço da empresa). Funciona em todos os modelos, horizontal e vertical.

## pdv 1.24.0 — 2026-11-07
Sem SQL. **Cartão de visita**: o mascote pode ficar na **esquerda** (novo campo “Lado do cartão”; a foto e os textos se ajustam, e esquerda/direita continua ajustável). O **círculo com as iniciais** não aparece mais no cartão quando você não tem foto: o cartão usa o espaço para os textos (nos modelos novos entra a logo da loja no lugar). Quem tem foto não muda.

## pdv 1.23.0 — 2026-11-07
Sem SQL. **Cartão de visita**: 4 modelos profissionais novos (Executivo com painel e fundo branco, Moderno com painel diagonal, Elegante escuro e Faixa superior), em horizontal e vertical, além do Clássico. **Mascote ou imagem sua**: ao escolher um mascote (ou enviar a sua imagem, ex.: gerada em outro chat) estando no cartão, ele já aparece no cartão; tamanho, esquerda/direita e subir/descer ajustáveis e opção de fundo branco atrás ou direto no cartão. Imagem enviada com fundo branco/liso tem o fundo removido automaticamente (só o fundo ligado às bordas).

## pdv 1.22.1 — 2026-11-07
Sem SQL. Removida da tela Arte e cartão a seção “Criar avatar a partir da foto (efeito de desenho)”. A foto do vendedor (círculo ou retrato) continua igual.

## pdv 1.22.0 — 2026-11-07
Sem SQL. **Modo foco no PDV** (Aparência > Layout do menu): some o menu lateral e fica uma barra fina com ☰ Menu e o status de sincronização; o menu abre por cima. Mais espaço para produtos e carrinho. O layout lateral continua como padrão.

## sistema 1.73.0 — 2026-11-07
Sem SQL. Dois **novos layouts de menu** em Aparência: **Duas colunas** (faixa fina com os grupos Vendas/Gestão/Conta e, ao lado, a lista do grupo escolhido; só em tela grande, no celular usa a lateral) e **Modo foco** (sem menu na tela: barra fina com ☰ Menu e Buscar; o menu abre por cima; dá a tela toda para vendas e relatórios). Os layouts anteriores continuam iguais.

## pdv 1.21.0 — 2026-11-07
Sem SQL. **Aparência no PDV**: botão “Aparência” no menu, com tema Automático/Claro/Escuro/**Grafite** e cor de destaque (azul, verde, roxo, laranja, cinza). Vale por aparelho.

## sistema 1.72.0 — 2026-11-07
Sem SQL. **Novo tema Grafite** (cinza-chumbo de alto contraste, menos cansativo para o balcão) e **cor de destaque** à escolha (azul, verde, roxo, laranja, cinza) em Aparência. Vale por aparelho; o layout do menu continua como estava.

## sistema 1.71.0 — 2026-11-07
Sem SQL. **Tela Nova venda no mesmo visual do PDV**: produtos em cartões verticais com foto grande e destacada (selo de estoque e de desconto sobre a foto), botão **Finalizar venda** fixo no topo do carrinho (mostra o total) e a linha de atalhos logo abaixo do título “Nova venda”.

## sistema 1.70.0 — 2026-11-07
Sem SQL. Novo relatório **Produtos (ativos, inativos, com/sem estoque)** em Relatórios, com filtros de situação (ativos/inativos), estoque (com, sem/zero, negativo, baixo) e categoria. Mostra código, produto, categoria, situação, quantidade (kit pelo estoque calculado), custo, preço e valor a custo; PDF e CSV.

## sistema 1.69.0 — 2026-11-07
Sem SQL. **Média de atraso do cliente** exibida em: lista de Clientes, topo do Carnê, tela de Cobrança e ao escolher o cliente na Nova venda — cada lugar pode ser ligado/desligado (botão “Média de atraso”, em Cobrança, Clientes > Mais ações e Relatórios), mais a opção de calcular só sobre as últimas X parcelas (padrão 12; 0 = todas). A média usa dias com sinal: pagar depois do vencimento aumenta, pagar antes diminui, parcela vencida em aberto soma os dias até hoje. O relatório “Média de atraso por cliente” passou a usar o mesmo cálculo (adiantado aparece negativo). A configuração vale por aparelho.

## sistema 1.68.0 — 2026-11-07
Sem SQL. Novo relatório **Média de atraso por cliente** (Relatórios): para as parcelas com vencimento no período, mostra por cliente quantas parcelas, quantas pagas e quantas no prazo, média de dias de atraso das pagas, parcelas vencidas em aberto (e valor), média geral e maior atraso. Ordenado do pior pagador para o melhor; sai em PDF ou CSV.

## sistema 1.67.0 — 2026-11-07
Sem SQL. **Extrato de recebimentos no Caixa**: lista todo o dinheiro que entrou (vendas à vista/cartão, entradas de carnê, parcelas recebidas) e saiu (devoluções) com data, hora, tipo, cliente, forma de pagamento e quem recebeu; botão Cupom/Carnê em cada linha. Filtros por período (de/até, atalhos dia/7 dias/mês), forma, tipo e quem recebeu; o total bate com o “Recebido no dia”. Botão **Gerar relatório / PDF** leva ao novo relatório **Extrato de recebimentos (caixa)** em Relatórios (PDF e planilha CSV) com os mesmos filtros. Parcelas de registro antigo podem não ter hora nem quem recebeu.

## sistema 1.66.0 e pdv 1.20.0 — 2026-11-07
Sem SQL. **Hora da venda** ao lado da data (dd/mm/aaaa hh:mm, no horário local) em: busca geral, lista de carnês, tela Fiscal, relatório de vendas por período, relatório de descontos, cabeçalho do documento da venda, e no PDV em Minhas vendas e Troca/devolução. O cupom já trazia a hora.

## sistema 1.65.1 — 2026-11-07
Sem SQL novo. **Montar kit na ficha do produto com busca**: em vez de uma lista enorme, agora há um campo de busca por nome, código interno, código de barras (inteiro ou parte), código do fornecedor ou categoria. Toque na peça (ou Enter para a 1ª) para adicionar; cada peça mostra código e estoque e tem a quantidade no kit e o botão Remover. Peças já adicionadas não aparecem de novo na busca.

## sistema 1.65.0 — 2026-11-07
Precisa do SQL **supabase-v40.sql** (kit). **Kit já na entrada da nota (XML)**: na tela de entrada há a seção “Montar KIT com itens desta nota”. Marque as peças que vêm separadas (ex.: condensadora + evaporadora), a quantidade de cada uma em 1 kit, e informe nome, preço e NCM do kit. Ao dar entrada, as peças entram no estoque como sempre e o kit é criado já ligado a elas (estoque calculado, custo somado, vende como um item só). Dá para montar mais de um kit na mesma nota.

## pdv 1.19.1 — 2026-11-07
Sem SQL. A linha de **atalhos** (F2, F4, F6, F8) subiu para o topo da tela de venda, logo abaixo do título.

## pdv 1.19.0 — 2026-11-07
Sem SQL. **Tela de venda**: o produto agora aparece num cartão com **foto grande** (inteira, sem cortar), estoque em etiqueta sobre a foto, desconto em destaque e preço maior. O botão **Finalizar venda** (com o total) subiu para o **topo do carrinho** e fica fixo ao rolar, sem precisar descer a tela. Atalho F4 continua igual.

## sistema 1.64.4 e pdv 1.18.4 — 2026-11-07
Sem SQL. **8 fundos novos** no criador de arte: Black Friday neon e Black Friday dourado; Natal noite com neve e Natal luxo vermelho e dourado; Ano Novo com fogos de ouro e Ano Novo branco e dourado; Oferta relâmpago azul elétrico e Oferta relâmpago com contagem regressiva. Os modelos de Black Friday, Natal e relâmpago usam os mesmos uniformes do robô da data. A prévia da arte não vaza mais para fora do quadro.

## sistema 1.64.2 e pdv 1.18.2 — 2026-11-07
Sem SQL. **Fundos juninos mais detalhados**: Festa Junina (pôr do sol), **São João** (novo, noite com lua, estrelas e fogueira) e Arraiá (toalha xadrez), com bandeirinhas estampadas, balões, fogueira com lenha e faíscas, espigas de milho e chapéu de palha. O São João entra nos atalhos de datas (24/6).

## sistema 1.64.1, pdv 1.18.1 e desktop 1.2.4 — 2026-11-07
Sem SQL. **Robô com uniformes**: 6 modelos de **Black Friday** e 6 de **Natal** (PNG transparente) na lista de mascotes (“Robô: uniforme Black Friday 2”…). Ao tocar na data Black Friday ou Natal com o robô selecionado, o 1º modelo entra sozinho. Mais modelos da mesma data: `robo-<data>-2.png`, `-3` … até `-9`. Instalador reconstruído com tudo embutido.

## desktop 1.2.3 — 2026-11-07
Instalador reconstruído com Sistema 1.64.0, PDV 1.18.0 e Catálogo 1.6.2 embutidos.

## sistema 1.64.0 — 2026-11-07
**Rode o SQL supabase-v40.sql ANTES de publicar.** **Produto KIT**: na ficha do produto, marque “Este produto é um KIT” e escolha as peças e a quantidade de cada (ex.: condensadora + evaporadora). Vender 1 kit baixa o estoque de cada peça; cancelar a venda ou devolver repõe as peças; o estoque do kit é calculado sozinho (quantos kits dá para montar). Nota fiscal e carnê mostram o kit como um item só. A lista de produtos mostra a etiqueta “kit” e o estoque calculado.

## sistema 1.63.0 e pdv 1.18.0 — 2026-11-07
Sem SQL. **Criador de arte**: 9 fundos novos de datas e ofertas — Festa Junina, Arraiá, Carnaval, Dia da Mulher, Dia do Cliente, Liquidação, Queima de estoque, Oferta relâmpago neon e Oferta relâmpago vermelho (também entram nos atalhos de datas próximas). **Uniformes do robô**: o programa passa a reconhecer arquivos `robo-<data>.png` (ex.: `robo-festajunina.png`, `robo-natal.png`, `robo-carnaval.png`) na pasta do programa; os que existirem aparecem na lista de mascotes como “Robô: uniforme …” e são escolhidos sozinhos ao tocar na data, se o robô estiver selecionado. Os PNGs dos uniformes ainda precisam ser criados.

## sistema 1.62.0 — 2026-11-07
Sem SQL. **Produtos**: novo filtro de estoque (Com estoque, Sem estoque/zero, Estoque negativo), que se combina com o filtro Todos / Só ativos / Só inativos, categoria e busca.

## sistema 1.61.0 — 2026-11-07
Sem SQL. **Produtos**: botão **Inativar / Reativar** em cada linha da lista e dentro da ficha do produto, etiqueta “inativo” e filtro Todos / Só ativos / Só inativos. Produto inativo some das vendas, do PDV e do catálogo; estoque e histórico ficam.

## sistema 1.60.0 — 2026-11-06
Sem SQL. **Contrato**: o botão do carnê agora é **Ver / imprimir contrato** e mostra o contrato na tela, com botão Imprimir para usar quando quiser (antes abria a impressão direto). O contrato assinado também abre na tela com a assinatura, a selfie e os dados de verificação, e pode ser impresso depois.

## desktop 1.2.2 — 2026-11-06
Instalador reconstruído com os programas embutidos mais novos (Sistema 1.59.0, PDV 1.17.0, Catálogo 1.6.2). Sem SQL.

## sistema 1.59.0 — 2026-11-06
Sem SQL. **Arte pelo celular**: a prévia fica fixa no topo enquanto você edita, e os controles foram organizados em 6 seções que abrem e fecham (Produto e formato; Selo, estilo e cores; Textos e preços; Foto; Mascote; Rodapé e legenda). No computador continua tudo aberto.

## sistema 1.58.0 — 2026-11-06
Sem SQL. Tela **Carnês** com filtros: situação (a receber, em atraso, quitados, cancelados, todos), **vencimento entre datas** (com atalhos Hoje, 7 dias, Este mês, Mês que vem), **data da venda** entre datas e busca por cliente/CPF/telefone. Mostra o total a receber no período, a próxima parcela de cada carnê e lembra o último filtro. (A tela Cobrança continua com o filtro "Vencimento entre datas" por parcela.)

## sistema 1.57.0 — 2026-11-06
Sem SQL. **Avisos mais altos e repetidos**: bip mais forte (Normal / Alto / Máximo, padrão Alto, em onda quadrada e repetido), **faixa vermelha no topo** ao surgir aviso novo, e **lembrete repetido** a cada 5, 10, 15 (padrão), 30 min ou 1 h enquanto houver aviso urgente pendente (cobrança ou conta vencida/de hoje, contrato assinado, nota de compra, problema fiscal ou do PDV). Ajuste em Avisos > Configurar avisos.

## sistema 1.56.1 — 2026-11-06
Fiscal: o botão **WhatsApp** agora só envia o **PDF da nota** (DANFE), sem a janela de texto. No celular anexa o PDF e você escolhe o contato; no computador baixa o PDF e abre a conversa do cliente para você anexar.

## sistema 1.56.0 — 2026-11-06
Sem SQL. Aba Fiscal: botão **WhatsApp** nas notas emitidas. Abre a conversa com o cliente (telefone do cadastro) com mensagem pronta e editável: tipo da nota, valor, número, **chave de acesso** e onde consultar. O PDF (DANFE) vai pelo botão "Enviar o PDF pelo celular" (celular) ou baixando para arrastar na conversa (computador), porque o WhatsApp não aceita anexo por link.

## sistema 1.55.1 — 2026-11-06
Sem SQL. **Aviso quando o cliente assina o contrato pelo link**: aparece na Central de avisos (sino) com o nome do cliente e o botão "Ver contrato", com bip e aviso do navegador se estiverem ligados. O Sistema confere a cada 45 segundos com ele aberto; o aviso some neste aparelho depois que você abre o contrato. Na primeira abertura não avisa de contratos que já estavam assinados.

## sistema 1.55.0 e nova página `assinar/` 1.0.0 — 2026-11-06
**Rode `supabase-v39.sql` ANTES de publicar.** No carnê: "Enviar contrato para assinar" gera um link (vale 7 dias) para o WhatsApp do cliente. O cliente abre no celular, lê o contrato, confirma o CPF, assina com o dedo e a câmera tira a selfie na hora de assinar (com autorização marcada). O Sistema mostra "Aguardando / Assinado" e abre o contrato assinado com assinatura, selfie, IP, aparelho, data e códigos de verificação. Novas cláusula de assinatura eletrônica no contrato. Assinatura eletrônica **simples**: peça a um advogado para confirmar se basta para o seu caso.

## sistema 1.54.0 — 2026-11-06
Sem SQL. **Contrato de compra e venda a prazo (carnê)** em A4, preenchido sozinho com os dados da loja (aba Empresa), do cliente, dos itens, da entrada, das parcelas e vencimentos (valores por extenso), e com multa/juros/tolerância iguais aos configurados. Botão "Contrato" no carnê; ao registrar uma venda no carnê o sistema oferece imprimir o contrato. Texto modelo baseado no Código de Defesa do Consumidor e na LGPD; **peça a um advogado ou contador para revisar antes de usar**.

## catalogo 1.6.2 — 2026-11-05
"Compartilhar" também usa a página de prévia do produto (cartão com foto, nome e preço no WhatsApp) quando ela existe; com a foto anexada, o link também passa a ser o da prévia.

## catalogo 1.6.1 — 2026-11-05
"Chamar no WhatsApp" abre direto a conversa da loja com o produto (prévia com foto, link, preço) e a pergunta "Ele está disponível? Se estiver, podem me chamar neste número". Corrige os links de produto quando o catálogo é aberto no programa de computador (usava o endereço interno em vez do endereço público).

## sistema 1.53.1 — 2026-11-05
Corrige o "offline · N pendente(s)" que não saía: salvar a aba Empresa mandava colunas novas (`mp_pix_on`, `pix_provider`) e, sem rodar `supabase-v37.sql` e `-v38.sql`, o banco recusava o envio inteiro. Agora o sistema envia sem a coluna que o banco ainda não tem e os campos só são gravados se você os mexer. A barra passa a dizer "erro ao enviar" (com o motivo ao passar o mouse) quando o problema não é a internet.

## sistema 1.53.0 e PDV 1.17.0 — 2026-11-05
**Rode `supabase-v38.sql` (depois do v37) e republique a função `mp-pix` ANTES de publicar.** Aba Empresa: escolha do provedor da cobrança automática, **Mercado Pago** (QR Pix) ou **InfinitePay** (link de pagamento, Pix ou cartão, com QR do link). A InfinitePay só dá baixa depois de a função confirmar o pagamento no servidor deles (payment_check) e conferir o valor.

## sistema 1.52.0 — 2026-11-02
Sem SQL novo (usa `app_settings`, do v27). Aba Empresa > **Multa e juros por atraso**: multa (máx. 2%), juros ao mês (máx. 1%) e dias de tolerância (0 a 10). Vale para carnê, Cobrança, Pix e PDF; só o administrador altera. Padrão continua 2% + 1% ao mês, sem tolerância.

## sistema 1.51.0 e PDV 1.16.0 — 2026-11-02
**Rode `supabase-v37.sql` e publique a função `mp-pix` ANTES de publicar.** Pix do Mercado Pago com reconhecimento automático, **desligado por padrão** (aba Empresa > Ligar Pix Mercado Pago). Sistema: no Pix atualizado do carnê aparece "Gerar Pix Mercado Pago"; o QR vale só no dia (juros mudam) e, quando o cliente paga, a parcela é baixada sozinha (também confere a cada minuto os Pix pagos com a tela fechada). PDV: venda no Pix só é registrada quando o pagamento cair; cancelar cancela o Pix. A chave do Mercado Pago fica só nos segredos do Supabase.

## sistema 1.50.0 — 2026-11-03
**Rode o SQL `supabase-v36.sql` ANTES de publicar.** Contas a pagar: ao pagar, além da forma e da data (já vem a data do dia), o sistema pede o **banco** (lista com os principais e digitação livre, lembra o último usado) e o **número do comprovante** (autenticação ou ID do Pix). Os dois aparecem na lista de contas pagas e no relatório. Nas contas já pagas o botão **Pagamento** permite corrigir banco, comprovante, data, forma e valor.

## sistema 1.49.1 — 2026-11-03
Só front-end (sem SQL). Notas recebidas: depois de conferida, a nota mostra "✓ Conferida" e o botão Conferir fica desativado ("Conferida ✓"), com um botão Desfazer para reabrir. O botão "Está tudo certo: marcar como conferida" fica na janela de conferência; relançar a entrada também marca a nota como conferida. A marcação fica neste computador.

## sistema 1.49.0 — 2026-11-03
**Rode o SQL `supabase-v35.sql` ANTES de publicar.** Cadastro do cliente: seção **Documentos do cliente** (RG, CNH, CPF, comprovantes, contrato). A foto é reduzida no aparelho para cerca de 300 KB (PDF até 3 MB) e vai para uma pasta PRIVADA do Supabase Storage; só o administrador vê, abre (link temporário de 3 minutos) e exclui. Nada vai para o GitHub nem para o catálogo. Precisa de internet para anexar e ver.

## sistema 1.48.0 — 2026-11-02
Só front-end (sem SQL). Notas recebidas: botão **Conferir** nas notas com entrada feita (mostra cada item da nota, o produto achado no cadastro, o estoque atual, se está inativo e se as parcelas estão em Contas a pagar) e **Relançar** (só os itens não encontrados, ou a nota inteira). No lançamento por XML a quantidade de cada item agora pode ser editada, e ao relançar o sistema avisa se as parcelas já existem em Contas a pagar. Notas com entrada feita e só resumo mostram **Baixar nota**.

## sistema 1.47.0 — 2026-11-02
Só front-end (sem SQL). Tela Cobrança: filtros por dia configuráveis. Novas opções: **Atrasadas há X dias ou mais**, **Vencem hoje**, **Vencem nos próximos X dias** e **Vencimento entre datas**, além de Em atraso e Todas em aberto. O número de dias é editável e tem atalhos (3/7/15/30 e 7/15/30/60/90). A escolha de dias fica salva neste aparelho e o resumo do topo acompanha os dias escolhidos.

## PDV 1.15.0 — 2026-11-02
Só front-end (sem SQL). Cartão de visita: opção **Caixa branca atrás do mascote** (liga/desliga), **QR Code do WhatsApp** do vendedor (gerado no aparelho, sem internet), **Moldura fina**, e dois estilos novos, **Claro (branco)** e **Preto e dourado**. O mascote no cartão vertical agora fica ao lado da foto, sem cobrir o telefone.

## sistema 1.46.0 e PDV 1.14.0 — 2026-11-02
Só front-end (sem SQL). 5 mascotes de Natal (vendedor, vendedora e Papai Noel em duas posições), em resolução original e fundo transparente. Os que apontam para a esquerda entram do lado direito da arte, apontando para o produto. Os arquivos carregam sob demanda e ficam em cache depois do primeiro uso.

## sistema 1.45.0 e PDV 1.13.0 — 2026-11-02
Só front-end (sem SQL). Novo mascote: **robô MultMix** (imagem original 954 x 1522, sem redução, fundo transparente). Disponível na arte e, no PDV, também no cartão.

## PDV 1.12.1 — 2026-11-02
Só front-end (sem SQL). Corrigido: ao escolher o mascote, as barras de tamanho, subir/descer e esquerda/direita ficavam escondidas até mexer de novo na tela. Agora aparecem assim que o mascote é escolhido.

## sistema 1.44.0 e PDV 1.12.0 — 2026-11-02
Só front-end (sem SQL). Arte do produto: foto do produto agora de 30% a 180% e com barras de esquerda/direita e subir/descer (botão "Foto no padrão"). PDV: opção de mostrar/ocultar a minha foto no cartão e no rodapé da arte (nome e WhatsApp do rodapé têm opção própria).

## sistema 1.43.0 e PDV 1.11.0 — 2026-11-02
Só front-end (sem SQL). Arte do produto: controle **Tamanho da foto do produto** (50% a 120%) e controle **Esquerda/direita** do mascote (junto de tamanho e altura).

## PDV 1.10.0 — 2026-11-02
Só front-end (sem SQL). Tela Arte e cartão mais simples: no topo ficam produto, formato, selo, nome, preços, mascote e os botões; fonte, cores, data especial, foto, remoção de fundo e demais opções foram para "Ajustes avançados" (fechado). Mascote agora também no cartão de visita (tamanho e posição) e opção "Meu mascote": o vendedor envia uma imagem pronta (corta as bordas transparentes, fica salva no aparelho) e ajusta tamanho e posição na arte e no cartão.

## PDV 1.9.0 — 2026-11-02
Só front-end (sem SQL). Tela Arte e cartão: removido o criador de boneco (caricatura). Continuam: foto do vendedor, avatar a partir da foto, cartão de visita, arte do produto e mascotes MultMix.

## sistema 1.42.1 e PDV 1.8.1 — 2026-11-02
Só front-end (sem SQL). Mascotes: os tênis brancos tinham áreas transparentes e o fundo azul da arte aparecia por dentro. Imagens corrigidas (tênis totalmente opacos).

## sistema 1.42.0 e PDV 1.8.0 — 2026-11-02
Só front-end (sem SQL). Arte do produto: controle **Altura do mascote** (botões Subir/Descer, barra e Padrão) para posicionar o mascote mais acima ou mais abaixo. Não sai da área da arte nem passa do rodapé.

## sistema 1.41.0 e PDV 1.7.0 — 2026-11-01
Só front-end (sem SQL). Arte do produto: controle **Tamanho do mascote** (50% a 140%). O limite de 140% é o ponto em que a imagem ainda não é ampliada além da resolução real (sem borrar). Ao diminuir, a imagem é reduzida em etapas com filtro de alta qualidade (sem serrilhado) e o produto ganha mais espaço.

## catálogo 1.6.0 + páginas de prévia — 2026-11-01
Só front-end no catálogo (sem SQL), mas precisa ativar a rotina em `tools/LEIA-ME.txt`.
- Nova rotina do GitHub (`.github/workflows/paginas-produto.yml` + `tools/gerar-paginas-produto.mjs`) gera `catalogo/p/<id>.html` com foto, nome e preço para cada produto com estoque.
- O "Chamar no WhatsApp" manda o link dessa página (o WhatsApp mostra o cartão com a foto). Se a página ainda não existe ou está desatualizada, manda o link simples da foto como antes.

## catálogo 1.5.3 — 2026-11-01
Só front-end (sem SQL). "Chamar no WhatsApp" volta a abrir direto a conversa da loja (sem passar pela tela de compartilhar). A foto vai como o primeiro link da mensagem, para o WhatsApp mostrar a prévia da imagem, seguida de nome, código, descrição, preços e link do catálogo.

## catálogo 1.5.2 — 2026-11-01
Só front-end (sem SQL). No detalhe do produto sobrou um só botão **Chamar no WhatsApp**, que já envia com a foto (celulares com compartilhamento; nos outros abre o WhatsApp da loja com o link da foto). Novo ícone flutuante do WhatsApp na lateral, acima da seta de voltar ao topo, que só abre o WhatsApp da loja.

## catálogo 1.5.1 — 2026-11-01
Só front-end (sem SQL). Novo botão **Chamar com a foto** no detalhe do produto (celulares): abre o compartilhamento com a foto anexada e a mesma mensagem (código, descrição, preços); a pessoa escolhe o WhatsApp e o contato da loja. Onde o aparelho não permite, o botão não aparece.

## catálogo 1.5.0 — 2026-11-01
Rode antes o `supabase-v34.sql` (libera só a coluna do código interno para o catálogo; sem ele o catálogo funciona igual, só não mostra o código).
- A mensagem do "Chamar no WhatsApp" agora leva o código do produto (Cód. 1001), além de nome, descrição, preços, foto e link do catálogo.
- Cada produto da lista ganhou o botão "Chamar no WhatsApp" (só se tem estoque), com a mesma mensagem.
- O código aparece no detalhe do produto.

## catálogo 1.4.1 — 2026-11-01
Só front-end (sem SQL). A foto do produto na lista aparece inteira, ajustada ao quadrado (sem cortar), com fundo branco.

## sistema 1.40.0 e PDV 1.6.0 — 2026-11-01
Só front-end (sem SQL). Arte do produto: opção **Mascote MultMix apresentando o produto** (mulher ou homem). Só aparece se escolhido; o mascote fica à esquerda, de frente para o produto, que passa para a direita. Imagens `mascote1.png` e `mascote2.png` ficam na pasta de cada app (funcionam offline).

## PDV 1.5.0 — 2026-11-01
Só front-end (sem SQL). Caricatura redesenhada com sombreado e mais opções: uniforme MultMix (camisa azul-marinho com gola amarela e a logo da loja no peito), poses (joinha, acenando, braços para baixo), fundo da loja (azul com prateleiras) ou sem fundo, expressões, cor dos olhos, 10 estilos de cabelo (topete, ondulado, raspado...), 8 cores de cabelo. Também: foto em "retrato" (inteira, em vez de círculo) no cartão.

## PDV 1.4.0 — 2026-11-01
Só front-end (sem SQL). Em Arte e cartão > Meus dados: **caricatura** — personagem desenhado (corpo inteiro ou só rosto e ombros em círculo) montado escolhendo pele, cabelo (7 estilos e 7 cores), barba, óculos e camisa; "Sugerir pela minha foto" preenche pele e cor do cabelo. Entra no cartão (horizontal e vertical) e no rodapé da arte. Não é desenho por IA.

## PDV 1.3.1 — 2026-11-01
Só front-end (sem SQL). Arte e cartão: a prévia fica fixa na lateral direita (no celular, fixa no topo da tela) e há "Criar avatar a partir da foto" (desenho, esboço a lápis ou pop-art, com troca opcional do fundo). É um filtro sobre a foto, feito no aparelho.

## PDV 1.3.0 — 2026-11-01
Só front-end (sem SQL). Nova aba **Arte e cartão** para o vendedor:
- Gerador de arte de oferta (mesmo do sistema: foto sem painel, fontes, cores, selos com/sem balão ou digitado).
- "Meus dados": nome, cargo, WhatsApp, linha extra e foto (ou avatar com iniciais), salvos no aparelho. A arte pode levar foto, nome e WhatsApp do vendedor no rodapé, e a legenda usa o WhatsApp dele.
- Cartão de visita horizontal (impressão) ou vertical (Status), em JPG.

## sistema 1.39.0 — 2026-11-01
Só front-end (sem SQL). Arte do produto:
- "Produto direto na arte": sem painel branco, remove o fundo claro da foto (com ajuste de força) e põe sombra.
- 11 opções de fonte e cores editáveis (texto, preço, título/faixa, selo, letra do selo), com botão para voltar às cores do estilo.
- Selo com balão ou sem balão, e opção "Digitar meu selo...".

## catálogo 1.4.0 — 2026-11-01
Só front-end (sem SQL). O catálogo mostra apenas produtos com estoque; sem estoque somem da lista.

## sistema 1.38.1 — 2026-11-01
Só front-end (sem SQL). Janelas de edição (produto etc.) não fecham mais ao clicar fora; só em Salvar, × ou Fechar.

## PDV 1.2.0 — 2026-11-01
Precisa do SQL v33. A busca do PDV encontra o produto pelo código interno (código exato aparece primeiro).

## sistema 1.38.0 — 2026-11-01
**Rode antes o `supabase-v33.sql`.**
- Código interno do produto (4 dígitos) por faixa de categoria (ex.: Eletros 1000–1999). Automático, sequencial, nunca reaproveitado e não muda se trocar a categoria.
- Produtos > Códigos: configurar faixas, "Sugerir faixas" e "Numerar produtos sem código".
- Coluna "Cód." e busca por código em Produtos, Nova venda, busca global e PDV.
- Aviso no sino quando a faixa chega a 90% ou enche.
- Não altera a emissão fiscal (cProd continua derivado do id do produto).

## sistema 1.37.1 — 2026-11-01
Só front-end (sem SQL). O lembrete é só do administrador e o "já enviei" fica no banco (tabela app_settings, chave pacote): vale para todos os aparelhos do administrador.

## sistema 1.37.0 — 2026-11-01
Só front-end (sem SQL).
- Aviso no sino do dia 1 ao 15: "Enviar o pacote do contador de {mês}" (só se houve notas de produção no mês). O botão Gerar pacote abre o pacote já no mês certo; ao enviar por e-mail/WhatsApp (ou baixar), o aviso some. O "enviado" vale por aparelho.

## sistema 1.36.0 — 2026-10-29
PRECISA DO SQL v32 ANTES de publicar (supabase-v32.sql).
- Carnê e Cobrança: botão Vencimento para mudar a data de uma parcela em aberto (motivo obrigatório, senha mestre, opção de mover as seguintes de mês em mês). Guarda o vencimento original e registra na auditoria.

## sistema 1.35.0 — 2026-10-29
PRECISA DO SQL v31 ANTES de publicar (supabase-v31.sql).
- Receber parcela: valor recebido pode ser MENOR que o devido (a parcela continua em aberto só com o restante) e há campo de abatimento (desconto) com motivo obrigatório. O dinheiro paga primeiro multa/juros; o abatimento tira primeiro multa/juros, depois a parcela.
- Recibo a cada recebimento: cupom térmico, A4/PDF e WhatsApp, com saldo restante do cliente. Histórico em Carnê > Pagamentos recebidos, com Recibo e Estornar.
- Receber várias parcelas de um cliente de uma vez (quitação), com abatimento total.
- Extrato do cliente (Clientes, Cobrança e Carnê): em aberto, atraso, multa/juros e últimos pagamentos, para imprimir/PDF ou WhatsApp.
- Caixa, "Recebido hoje" e comissão passam a usar o livro de recebimentos (parcelas antigas continuam contando).

## sistema 1.34.0 — 2026-10-29
PRECISA DO SQL v30 ANTES de publicar (supabase-v30.sql).
- Carnês > Lançar fiado antigo / Importar fiados (planilha): dívida de antes do sistema, com parcelas e vencimentos. Não baixa estoque, não gera nota e não soma no faturamento, relatórios e Fiscal; aparece em Carnês, Cobrança, avisos e Início (parcelas). Marcado como "saldo anterior".

## sistema 1.33.2 — 2026-10-29
Só front-end (sem SQL).
- Central de avisos: avisa quando a API fiscal ou a SEFAZ estiverem fora do ar e quando a consulta do IBPT falhar (conferência a cada 30 min com o sistema aberto; o IBPT só é testado quando a fonte é API/automática).

## sistema 1.33.1 — 2026-10-29
Só front-end (sem SQL).
- Produtos: campo Categoria com lista das existentes (digitando uma nova, ela é criada), filtro por categoria na lista e botão Categorias para renomear, unir ou remover (os produtos não são apagados).

## sistema 1.33.0 — 2026-10-28
Só front-end: não precisa rodar SQL nem mexer na função/API.
- Início virou painel do dia: "Para fazer" (avisos, vendas sem nota com dado faltando, estoque baixo) e valores alinhados.
- Busca global (Ctrl+K ou botão Buscar): produtos, clientes e telas.
- Tema claro/escuro/automático em Conta > Aparência (campanhas continuam valendo por cima).
- Celular: barra inferior com 5 abas + "Mais"; Clientes com menu "Mais ações".
- Fiscal: filtros (Todas/Prontas/Com pendência/Emitidas/Canceladas), selos coloridos e cada pendência com botão Corrigir.
- Estoque em cor nos Produtos; estados vazios e "carregando" nas listas.
- Nova venda: F3 cliente, F9 forma de pagamento, Esc limpa a busca.
- Confirmações claras ao emitir/cancelar nota (avisam quando é PRODUÇÃO).
- Acessibilidade: foco visível, alvos de toque maiores, contraste, link "Pular para o conteúdo".

Cada aplicativo tem a sua própria numeração. O número aparece no rodapé do catálogo e no menu do sistema
(toque nele para verificar atualização). A versão publicada fica em `version.json` de cada pasta.

## Como publicar uma nova versão
1. Escolha o novo número (ex.: 1.0.1 para correção, 1.1.0 para novidade).
2. Altere o número em 3 lugares da pasta do aplicativo: `window.APP_VERSION` no `index.html`,
   `version.json` e `const VER` no `sw.js`. Escreva o resumo em `notes` do `version.json` e neste arquivo.
3. Envie para o GitHub. Quem estiver com o aplicativo aberto recebe a atualização sozinho em até 5 minutos
   (ou ao reabrir), sem precisar limpar nada.

## API fiscal — `cont-9`
- O e-mail do cliente deixa de ir no XML (a DANFE o imprimia em "Informações complementares"); volta com `DEST_EMAIL=1`.

## Função `fiscal`
- Rodapé só com o obrigatório: frase do Simples Nacional ("DOCUMENTO EMITIDO POR ME OU EPP OPTANTE PELO SIMPLES NACIONAL") e, pela API, os tributos aproximados. Sem e-mail, telefone nem nome do sistema. (Substitui a mudança anterior do rodapé de contato.)
- Informações complementares da nota (rodapé) passam a vir da Empresa: "Empresa Optante pelo Simples Nacional | <nome> - Tel … - WhatsApp … - <e-mail> | Emitido por MultMix" (como na nota do sistema anterior). Os tributos aproximados são acrescentados pela API.

## Sistema (`sistema/`)
### 1.32.0 — 28/10/2026
- **Layout do menu à escolha** (menu Conta → Layout do menu, vale por aparelho): Lateral (padrão), Superior (barra no topo com menus suspensos), Lateral compacta (só ícones, abre ao passar o mouse) e Barra inferior (abas como aplicativo). Em celular, o Superior e o Compacto continuam como a lateral/rolagem de sempre. O menu agora tem grupo "Conta" (Alterar senha, 2 etapas, Layout).
### 1.31.0 — 28/10/2026
- Empresa: escolha **de onde vêm os percentuais** dos tributos aproximados: tabela do banco, API do IBPT (token da empresa), automático (tabela e, se o NCM não estiver nela, API) ou não informar. Função `fiscal` nova e API `cont-7`.
### 1.30.0 — 28/10/2026
- A tabela do IBPT é buscada sozinha no repositório: coloque o CSV novo em `ibpt/tabela.csv` (GitHub) e o sistema (aberto pelo administrador) carrega em até 12 h, ou na hora em Fiscal → Tabela IBPT → "Buscar atualização no repositório". Não troca por uma tabela mais antiga. Nova pasta `ibpt/` com LEIA-ME.
### 1.29.0 — 28/10/2026
- **Fiscal → Tabela IBPT**: o administrador envia o CSV do IBPT (do estado) a cada atualização; a tabela fica no banco (`ibpt_ncm`) e a nota usa os percentuais por NCM. Mostra versão/vigência na tela Fiscal e avisa no sino quando faltar 10 dias ou estiver vencida. Há consulta de NCM para conferir. Requer `supabase-v29.sql`, função `fiscal` nova e API `cont-6`. Prioridade na nota: tabela do banco → API do IBPT (token) → percentuais fixos.
### 1.28.0 — 28/10/2026
- Empresa: campo **Token do IBPT** (guardado só para o administrador, na tabela privada) e botão de teste. A função `fiscal` envia o token da empresa à API a cada emissão. Requer `supabase-v28.sql`, função `fiscal` nova e API `cont-5`.
### 1.27.1 — 28/10/2026
- A série das notas agora segue o cadastro da Empresa (antes era sempre 1). Função `fiscal` nova. A busca de "buracos" ignora as notas numeradas antes em outro sistema.
### 1.27.0 — 28/10/2026
- Nova tela **Balcão (PDV)** (só administrador): caixas dos vendedores (inicial, esperado, contado, diferença, sangrias), avisos do PDV, devoluções, vendas com desconto (e quem autorizou) e as regras (exigir caixa aberto, desconto livre até X%, prazo de devolução).
- Avisos no sino: venda recusada de um vendedor, diferença de caixa, devolução; e **vencimento do certificado digital** (30 dias antes, também na tela Fiscal). Exige a função `fiscal` nova e a API `cont-2`.
- Requer `supabase-v27.sql`.

## PDV do vendedor (`pdv/`) — 1.1.1
- Depois de finalizar a venda, botão "Enviar recibo no WhatsApp" (itens, total, pagamento e parcelas; sem valor fiscal). Só front-end, sem SQL.

## PDV do vendedor — 1.1.0
- Abertura e fechamento de caixa (conferência às cegas; sangria e suprimento), desconto no item ou na venda (acima do limite livre, só com a senha do administrador), venda em espera, troca/devolução e aviso ao administrador quando uma venda é recusada. Requer `supabase-v27.sql` (rodar DEPOIS de publicar o PDV 1.1.0 e o sistema 1.27.0).

## API fiscal — `cont-8`
- Ajustes pelo manual "De Olho no Imposto": origem 8 conta como importada (nacional só 0, 3, 4 e 5); o tributo aproximado é calculado sobre o valor pago (produto menos desconto); a consulta tenta também o endereço `iws.ibpt.org.br` descrito no manual se o primeiro não responder.

## API fiscal — `cont-7`
- Respeita o modo de tributos aproximados enviado pela função (`tabela`, `api`, `auto`, `off`).

## API fiscal — `cont-6`
- Aceita os percentuais por item e a fonte/chave da tabela enviados pela função `fiscal`.

## API fiscal — `cont-5`
- O token do IBPT pode vir da empresa (enviado pela função `fiscal`); `IBPT_TOKEN` no Render vira só reserva. Rota `POST /ibpt` para o teste.

## API fiscal — `cont-4`
- Tributos aproximados automáticos pela API De Olho no Imposto (IBPT), por NCM e UF, com cache de 7 dias; a fonte e a chave da tabela saem na nota. Variável `IBPT_TOKEN` no Render. Rota de teste `GET /ibpt?ncm=…`. Se o IBPT falhar, a nota sai normalmente. Endereço e formato da resposta não foram conferidos contra o serviço real.

## API fiscal — `cont-3`
- Desconto aparece por item na nota (preço de tabela + desconto), como no sistema anterior; tributos aproximados (Lei 12.741) em cada item, no total e nas informações complementares, se `TRIB_FED_PCT`/`TRIB_EST_PCT` estiverem no Render. Não testado contra a SEFAZ.

## API fiscal — `cont-2`
- Nova rota `GET /certificado` (validade do certificado A1, sem expor senha). Função `fiscal`: ação `cert`.

## Programa de computador (`desktop/`)
### 1.2.1 — 06/11/2026
- Reempacota o instalador com os programas mais novos embutidos (Sistema 1.55.1, PDV 1.17.0, Catálogo 1.6.2). Sem mudança no programa de computador em si.
### 1.2.0 — 05/11/2026
- Instala em Arquivos de Programas (assistente com escolha da pasta, permissão de administrador) e se atualiza sozinho por Releases do GitHub (electron-updater). Vários caixas: cada um offline + sincronização pelo Supabase. **Não testado em Windows real.**
### 1.1.0 — 05/11/2026
- Programas embutidos no instalador (abrem offline desde a 1ª vez) com atualização em segundo plano; endereço interno `mm://app/`.
- Banco local em arquivo por programa (`store.js`): gravação atômica com checksum, cópia anterior, backup diário (30 dias) em Documentos\MultMix\Backup, recuperação automática e menu Banco local (verificar, backup, restaurar, importar dados da versão anterior). Sem o limite de 5 MB do navegador.
- Opções na 1ª abertura: programas, abrir com o Windows e pasta dos backups. **Não testado em Windows/Electron real** (testados em Node/Chromium: o banco e a troca do localStorage).
### 1.0.1 — 28/10/2026
- Cada atalho (Sistema, PDV, Catálogo) e cada janela usa o ícone próprio; o `.bat` simples também (pasta `icons/` junto do arquivo).
### 1.0.0 — 28/10/2026
- Instalador para Windows com escolha do que instalar (Sistema, PDV e/ou Catálogo), um atalho para cada, funcionamento sem internet (cache do navegador do programa) e impressão do cupom DIRETO na impressora escolhida. Gerado na nuvem pelo GitHub Actions (`.github/workflows/desktop.yml`). Há também `Instalar-MultMix-simples.bat`, que cria atalhos no Chrome/Edge com impressão direta na impressora padrão.
- Sistema 1.26.1 e PDV 1.0.1: usam a impressão direta quando abertos no programa de computador.

## PDV do vendedor (`pdv/`)
### 1.0.2 — 28/10/2026
- Ícone próprio (etiqueta verde "PDV") para não confundir com o sistema na tela do celular e do computador.
### 1.0.0 — 28/10/2026
- App novo e separado: o vendedor entra com a própria senha (e 2 etapas, se tiver), vê produtos e estoque SEM custo, vende (à vista, cartão e, se o administrador liberar, carnê) e vê as próprias vendas e a comissão do mês.
- Funciona sem internet: a venda fica guardada no aparelho e é enviada sozinha (sem duplicar). Atalhos F2/F4/F6/F8, leitor USB, câmera, `3*código`, cupom não fiscal.
- Preço, vendedor e comissão são definidos pelo servidor (`pdv_sell`, em `supabase-v26.sql`): o vendedor não consegue alterá-los.

## Sistema (`sistema/`)
### 1.26.0 — 28/10/2026
- Vendedor passa a usar só o app `pdv/`; no sistema ele recebe um aviso e é desconectado. Em Usuários, o administrador liga/desliga "pode vender no carnê" por vendedor. Rode `supabase-v26.sql` DEPOIS de publicar.

### 1.25.0 — 28/10/2026
- PDV mais rápido: atalhos F2 (buscar), F4 (finalizar), F6 (quantidade), F8 (limpar carrinho); leitor USB funciona mesmo sem o campo de busca em foco; `3*código` adiciona 3 unidades; aviso na tela e bipe ao adicionar ou quando o código não existe (no lugar de janelas de alerta); aviso de estoque insuficiente. Não precisa de SQL.

### 1.24.0 — 28/10/2026
- Relatórios novos (PDF e CSV, em Relatórios): **Fluxo de caixa previsto** (30/60/90 dias, por semana, carnês x contas a pagar), **Resultado do período (DRE simples)**, **Lucro por produto** e **Sugestão de compra** (pelo giro de vendas e estoque mínimo). Não precisa de SQL.

### 1.23.0 — 28/10/2026
- Verificação em 2 etapas opcional (menu, qualquer usuário): QR Code para app autenticador, código ao entrar. Com `supabase-v25.sql` o banco passa a exigir o código de quem ativou; a função `fiscal` também confere. Publique o sistema ANTES de rodar o v25.

### 1.22.0 — 28/10/2026
- Auditoria (menu, só administrador): histórico de quem mudou preço/custo, cancelou venda ou nota, recebeu ou estornou parcela, pagou conta, mexeu na empresa e nos usuários, e das notas emitidas/canceladas/inutilizadas. Gravado por gatilhos no banco: a equipe não apaga nem edita. Filtros, CSV e PDF.
- Empresa > Restaurar backup: recoloca o que sumiu, ou volta registros alterados, ou restaura tudo em banco vazio; baixa uma cópia do estado atual antes e exige senha master e confirmação digitada. Rode `supabase-v24.sql` e publique a função `fiscal` nova.

### 1.21.0 — 28/10/2026
- Menu IBS / CBS / IS: regras de CST (3 dígitos) e cClassTrib (6 dígitos) por destino da venda (no estado, outro estado, exterior) e tipo do cliente (consumidor, contribuinte, não contribuinte, órgão público, exterior), padrão, alíquotas de teste e conferência por cenário. Produto com CST/cClassTrib próprios e marca de Imposto Seletivo; cliente com tipo e ente público; venda com destino. Só preparação: a nota emitida não muda. Rode `supabase-v23.sql` antes.

### 1.20.1 — 27/10/2026
- CNPJ: quando a fonte principal não traz o logradouro, ele é completado pela segunda fonte e, se ainda faltar, pelo CEP (ViaCEP), no cadastro e na tela de venda. Sem SQL.

### 1.20.0 — 27/10/2026
- Cadastro por CNPJ mais completo: busca também a inscrição estadual (cnpj.ws), usa segunda fonte se a primeira falhar, mostra situação, abertura, porte, atividade e Simples. Na tela de venda, digitar um CNPJ novo busca os dados e salva o cadastro completo ao finalizar. Sem SQL.

### 1.19.1 — 27/10/2026
- Cupom: o aviso CUPOM NÃO FISCAL aparece só no rodapé (antes estava no topo e no rodapé). Sem SQL.

### 1.19.0 — 27/10/2026
- Cupom não fiscal configurável (Empresa > Configurar cupom, ou botão no Caixa): escolhe quais campos aparecem (IE, CNPJ, endereço, telefone, dados do cliente, parcelas, nota fiscal), mensagem final, papel 58/80 mm e tamanho da letra, com prévia e modelos Completo/Simples/Mínimo. Fica salvo em cada aparelho. Sem SQL.

### 1.18.0 — 27/10/2026
- Cupom não fiscal (80 mm) com empresa, cliente, itens, total, forma de pagamento e parcelas do carnê. Pergunta ao registrar a venda e há botão Cupom no Caixa, Fiscal, Carnês e histórico do cliente. Sem SQL.

### 1.17.0 — 27/10/2026
- Relatórios > Curva ABC de produtos ou clientes, por faturamento, quantidade ou lucro, com classes A (80%), B (95%) e C, % acumulado, PDF e CSV. Sem SQL.

### 1.16.4 — 27/10/2026
- PDF das notas do contador redesenhado: cartões de resumo, grupos Emitidas e Recebidas com subtotal, total do mês, CPF/CNPJ formatado, colunas Número e Série separadas, canceladas em vermelho e espaçamento uniforme. Sem SQL.

### 1.16.3 — 27/10/2026
- resumo.csv do pacote: chave de acesso e CNPJ/CPF não viram notação científica no Excel, nova coluna Modelo, série e número das notas recebidas lidos da chave, datas dd/mm/aaaa e ordem por tipo e data. Sem SQL.

### 1.16.2 — 27/10/2026
- PDF das notas do contador: folha deitada quando a tabela não cabe em pé, colunas ajustadas ao conteúdo e nomes completos, sem cortar. Sem SQL.

### 1.16.1 — 27/10/2026
- Pacote do contador: o relatório em PDF das notas do mês vai dentro do .zip (PDF gerado pelo próprio sistema, sem biblioteca). Sem SQL.

### 1.16.0 — 27/10/2026
- Fiscal > Pacote do contador: botão Relatório em PDF com as notas emitidas, canceladas e recebidas do mês (além do .zip e do CSV). Sem SQL.

### 1.15.1 — 27/10/2026
- Menu lateral: destaque ao passar o mouse (fundo mais claro, barra lateral e ícone colorido). Só visual, sem SQL.

### 1.15.0 — 27/10/2026
- Produto: campo Preço de custo, margem de lucro (% sobre o custo, lucro em R$ e margem sobre a venda) ao digitar o preço, campo para calcular o preço à vista por % de margem e coluna Margem na lista. O custo continua sendo atualizado pela Entrada por XML. Não precisa de SQL.

### 1.14.0 — 27/10/2026
- Menu Relatórios (PDF): vendas por período, estoque, carnês em atraso/a receber, contas a pagar/pagas, caixa por dia e comissões. Gerar PDF (impressão > Salvar como PDF) e planilha CSV. Não precisa de SQL.

### 1.13.0 — 27/10/2026
- Fiscal: indicador da API fiscal/SEFAZ, botão "Emitir todas as prontas", tela Numeração (buracos e inutilização) e conferência na SEFAZ antes de reenviar uma nota que ficou sem resposta. Rode `supabase-v22.sql`, publique a função `fiscal` e a API (versão `cont-1`) antes.

### 1.12.0 — 27/10/2026
- Fiscal > Pacote do contador: .zip do mês com XMLs emitidos, cancelados e recebidos mais resumo.csv; envio por WhatsApp/e-mail (compartilhar no celular). Contador cadastrado em Empresa. Rode `supabase-v21.sql` antes.

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
### 1.3.1 — 28/10/2026
- Ícone próprio (etiqueta laranja "CATÁLOGO").
### 1.3.0 — 28/10/2026
- Pede só as colunas públicas (id, nome, preços, fotos…). Com `supabase-v26.sql` o preço de custo, EAN, NCM e código do fornecedor deixam de ser legíveis por qualquer pessoa. Publique ANTES de rodar o v26.

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
