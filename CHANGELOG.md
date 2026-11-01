# Histórico de mudanças

Este arquivo descreve mudanças no produto, sem registros ou dados de usuários. Toda alteração de código enviada ao GitHub deve atualizar a seção correspondente. Propostas ficam em “Planejado” até serem implementadas e verificadas.

## Planejado

- Recompensas com imagem opcional escolhida do aparelho ou ícone de uma coleção coerente (presente, relógio, roupa, refeição, passeio, livro, jogo, troféu).
- Imagens pessoais armazenadas apenas no aparelho, sem envio ao GitHub. Preparar armazenamento apropriado, compressão e backup/restauração com imagens antes de liberar o recurso.
- Calendário com compromissos, tarefas por dia e notas curtas.
- Personalização de frases e imagens, escolha fixa ou rotação automática.
- Celebração breve e opcional ao concluir uma tarefa ou meta.
- Estados neutros para pendências e dias sem registro. Linguagem de incentivo à retomada; preservar conquistas anteriores.
- Navegação com ícones consistentes: chama/sol para Hoje, calendário para Jornada, caderno para Diário e troféu/louros para Conquistas. Personagens ficam em artes e detalhes, sem prejudicar a identificação das abas.

## 0.2.0 — 2026-11-01

- Compromissos e tarefas por dia com horário opcional, conclusão e exclusão confirmada.
- Nota curta e marcação de realizado/não realizado no calendário, inclusive correção de dias anteriores.
- Frase própria, troca manual de frase e imagem pessoal de fundo nas configurações.
- Fotos locais de recompensa com compressão, armazenamento IndexedDB e seleção de ícones.
- Backup/restauração inclui fotos locais; compatibilidade com registros anteriores mantida.
- Exclusão confirmada de desafios, entradas do diário e conquistas resgatadas.
- Celebração breve opcional e respeito à preferência de movimento reduzido.

Limites: coleção diária de imagens, feriados e nova família de ícones de navegação continuam pendentes. Novas opções de inspiração do app ainda não são transferidas ao Scriptable. Calendário e configurações conferidos no navegador durante o desenvolvimento; envio de imagens e restauração completa ainda precisam de teste no iPhone.

## 0.1.0 — 2026-11-01

- Primeira versão estática com quatro abas: Hoje, Jornada, Diário e Conquistas.
- Metas semanais, registros diários, recompensas editáveis e histórico de resgates.
- Calendário com planejamento, diário por data e backup JSON.
- Arte inicial e mensagens originais por período do dia.
- Script Scriptable com frases e envio manual opcional de progresso.
- Publicação no GitHub Pages e testes automatizados básicos.

Validação inicial: registro e diário persistiram após recarregar no navegador; edição de meta e resgate conferidos. Instalação no iPhone, widgets, restauração pela interface e offline real ainda pendentes de validação.

## 0.3.0 — 2026-11-01

- Jornada redesenhada com cabeçalho ilustrado, calendário em painel, seleção dourada e resumo compacto do dia.
- Removidos os controles duplicados de planejamento da tela; nota curta recolhida e tarefas com caixas de marcação.
- Arte do Midoriya adicionada à seleção visual junto do Rock Lee.
- Duas falas curtas com personagem, episódio e indicação de tradução própria nas configurações.
- Fontes dos trechos: Naruto episódio 48 (transcrição em https://transcripts.foreverdreaming.org/viewtopic.php?t=76298) e My Hero Academia episódio 13.5 (https://subs.yakuaru.com/books/my-hero-academia/page/e135-hero-notebook/edit?editor=markdown-clean).
- Imagem Midoriya criada com image_gen integrado, prompt: personagem em treino no terraço ao nascer do sol, visual anime cinematográfico verde e dourado, sem texto.

## 0.4.0 — 2026-11-01

- Interface reconstruída a partir da referência visual: cabeçalhos ilustrados, superfícies escuras, ações douradas e tipografia editorial.
- Jornada compacta com calendário e resumo; detalhes do dia separados em tela própria, com compromissos, tarefas e nota.
- Personalização em tela própria com prévia, miniaturas, troca de frase e controles de fixar/alternar inspiração.
- Navegação com ícones vetoriais consistentes, novos cartões de recompensa e celebração com confirmação visual.
- Camada de imagens locais e backups preservada. Chave dos registros e banco de fotos mantidos para compatibilidade.
- Atualização de arquivos versionada e cache offline consistente para evitar mistura entre interfaces antigas e novas. A primeira atualização ainda exige recarregar/reabrir a aba antiga.
- Versão visível em Configurações. Falha ao ler registros antigos não permite sobrescrevê-los silenciosamente.

Verificação: personalização salva, registros anteriores presentes e navegação entre resumo e detalhes conferidas em navegador a 390 e 320 pixels. Instalação e widgets no iPhone continuam dependendo de teste no aparelho. Feriados e coleção de 31 artes continuam pendentes; duas artes estão disponíveis.

## 0.4.1 — 2026-11-01

- Página isolada de demonstração em `previews/movimento.html`, com reprodução manual de três animações, botão repetir e estado de execução visível.
- Controle explícito de movimento, respeitando inicialmente a preferência de movimento reduzido. Não acessa registros ou dados do app.
- Conceito provisório de punho utilizado somente na demonstração. Ícone principal do aplicativo preservado.

## 0.5.0 — 2026-11-01

- Identidade aplicada com punho enfaixado na direção Anime, no cabeçalho e nos ícones de instalação.
- Tipografia sem serifa: Barlow Condensed para títulos e Manrope para leitura. Fontes e licenças incluídas localmente para uso offline, sem dependência do Google Fonts em tempo de execução.
- Quatro símbolos vetoriais próprios na navegação: punho, caminho de evolução, pergaminho e insígnia. Mantidos os rótulos e indicação acessível de aba ativa.
- Celebração principal de conquista com logo, luz, partículas breves e revelação da recompensa; confirmação simples para tarefas comuns. Movimento reduzido respeitado e botão de continuar/tecla Escape disponíveis.
- Ícones PNG gerados em 180, 192 e 512 px e cache offline atualizado.

Logo: criada com ferramenta integrada image_gen usando a direção Anime da comparação aprovada como referência. Prompt final: standalone square app icon, dark forest green background, athletic fist with cream wraps in dynamic shonen anime 3/4 punching perspective, strong ink lines, warm gold highlights, emerald shadows, short wrist, subtle gold brushstroke, no text or franchise marks. Arquivo original em `public/assets/forja-mark.png`.

## 0.5.1 — 2026-11-01

- Correção de largura intrínseca de campos de data/horário do Safari: largura e tamanho mínimo limitados ao cartão, aparência nativa ajustada e texto de formulário mantido em 16 px.
- Ajustes de área segura, navegação, formulários e diálogos; altura disponível acompanha visualViewport para reduzir cortes quando o espaço visível muda.
- Símbolo Hoje passa a usar o punho da própria logo, substituindo o desenho simplificado.
- Opções de movimento: seguir sistema, completo, suave ou sem movimento. Botão de teste da celebração sem alteração de registros.
- Confirmação visual breve no registro diário e celebração completa reservada à meta concluída.

Verificação: campos de diário e diálogo medidos dentro de seus contêineres em viewport móvel de 390 px e em espaço reduzido de 320 × 480. Conferência no navegador de desktop; Safari/PWA e teclado físico do iPhone ainda exigem confirmação no aparelho.

## 0.6.0 — 2026-11-01

- Estrutura com uma área principal de rolagem; documento externo bloqueado e overscroll contido para reduzir o fundo vazio ao puxar os limites no iPhone.
- Editor de desafios em tela própria, em duas etapas (compromisso e recompensa), com ações fixas, sem abrir teclado automaticamente. Exclusão destacada em vermelho e também acessível na etapa da recompensa.
- Desafios semanais ou mensais, escolha de dias da semana, mês e meta própria. Registros extras fora dos dias planejados contam para a meta.
- Jornada mostra tarefas dos dias programados e permite concluir compromissos com horário. Check de dia concluído exige todos os itens previstos; dias vazios não recebem conclusão automática.
- Hoje volta a um símbolo vetorial monocromático de punho, no mesmo padrão dos demais ícones.
- Seleção e menus de toque longo desativados na interface, preservando seleção/edição nos campos.
- Transições curtas entre seções, resposta ao toque e luz ambiente discreta nas artes em modo de movimento completo; opção de movimento reduzido preservada.
- Cabeçalhos de Jornada e Conquistas usam novas artes de treino de Midoriya e Rock Lee, provenientes da primeira rodada do pacote de conteúdo. São ilustrações, não vídeos de personagens.
- Protocolo atual do widget continua semanal; metas mensais ficam no aplicativo.

Verificação: 15 testes automatizados; criação e persistência de meta mensal, resgate, check de dia finalizado e edição nas duas etapas conferidos no navegador. Em altura reduzida de 480 px, ações ficaram no limite visível e formulário ganhou rolagem própria na tela de edição. O Safari nativo e a elasticidade física do iPhone ainda precisam ser confirmados no aparelho.
- Ajuste de celebração: registros extras após atingir a meta não repetem a celebração de conclusão.
- Revisão offline 061 identifica o pacote final desta atualização e evita reusar o JavaScript anterior.

## 0.6.1 — 2026-11-01

- Integração do pacote aura-frases: duas novas artes do Rock Lee e 30 falas com autoria, obra, referência e tradução própria. Metadados originais preservados no catálogo público.
- Todas as falas disponíveis na personalização, com links para as fontes comunitárias fornecidas pelo pacote; não são apresentadas como dublagem brasileira ou verificação oficial.
- Novas artes disponíveis para escolha e rotação diária. Contagem contínua de dias evita reiniciar a coleção na virada do mês.
- Revisão offline 062; dados pessoais, fotos e preferências existentes preservados.

## 0.7.0 — 2026-11-01

- Seis artes do pacote personagens-aura: Might Guy, Naruto, Minato, All Might, Edward Elric e Killua; catálogo e pontos focais preservados.
- Scriptable preparado para widgets pequeno/médio/grande na tela inicial e retangular/circular/em linha na tela bloqueada. Imagens públicas em cache; fallback verde sem rede.
- Transferência manual v2: nomes/contadores semanais e mensais, frase, autoria e preferência de inspiração. Diário, agenda e fotos pessoais não são transferidos. Compatibilidade de leitura com payload v1.
- Contadores de períodos antigos não são exibidos como atuais. Seleção treino/mensal por parâmetro; prévias escolhidas no Scriptable.
- Guia público widgets.html com código copiável e instalação; geração reproduzível por node build-scriptable.mjs. Revisão offline 063, dados locais preservados.
- Testes automatizados de protocolo e simulação das famílias Scriptable. Renderização e atualização no iPhone físico ainda precisam de validação.

## 0.7.1 — 2026-11-01

- Widgets da tela bloqueada sem fundo adaptativo, com cor explicitamente transparente; aplicado à frase, circular e texto em linha.
- Guia explica como substituir o código mantendo nome, configuração dos widgets e progresso. Código instalável com revisão 064 para evitar cache antigo.
- Teste de regressão verifica transparência nas três famílias de bloqueio. Aparência final ainda precisa ser conferida no iPhone.

## Prévias de calendário — 2026-11-01

- Estudo visual em previews/calendario-widgets.html: widget horizontal do mês na tela inicial e semana compacta transparente no bloqueio, com troca de arte e simulação de dia concluído.
- Dados fictícios, sem acesso aos registros pessoais. Calendário ainda não implementado no script; proposta de integração futura usa envio manual dos checks do FORJA, sem Calendário da Apple.

## 0.8.0 — 2026-11-01

- Widget calendario (sem acento no parâmetro): personagem, frase e mês completo no médio; semana compacta transparente no retangular de bloqueio. Pequeno/grande e formatos circular/em linha têm versões adaptadas de data/calendário.
- Dia atual destacado; checks vêm das datas concluídas do FORJA, transferidas manualmente com os contadores. O envio abrange o mês e a semana atual, sem diário, notas ou nomes de compromissos. Não lê o Calendário da Apple.
- Calendário acompanha a data do aparelho; checks permanecem os do último envio, identificado no widget. Na virada do mês, envie novamente para preencher os novos checks. Tocar abre Jornada; células não são interativas.
- Prévia no Scriptable oferece calendário inicial/bloqueio. Guia público atualizado, revisão offline 065, leitura dos envios anteriores preservada.
- Testes de datas, limites do envio e simulação das famílias. Renderização real e recortes ainda precisam de conferência no iPhone.

## 0.8.1 — 2026-11-01

- Corrige corte do segundo dígito nos calendários: linhas desenhadas em largura fixa, sem compressão de texto por espaçadores horizontais.
- Checks desenhados abaixo do dia, separados dos algarismos; fundo de bloqueio continua transparente.
- Teste de regressão cobre 10 a 31 e semana com datas de dois dígitos; revisão offline 066. Aparência final requer conferência no iPhone.

## 0.8.2 — 2026-11-01

- Verificar atualização consulta a versão publicada sem cache e distingue versão atual, nova disponível e falha de rede; Atualizar agora recarrega com revisão explícita sem limpar dados.
- Recuperação das versões antigas nas telas Hoje, Conquistas e Configurações ao ativar o novo worker; páginas com rascunhos não são recarregadas automaticamente.
- Artes adicionais passam a cache sob demanda, limitado a 12 imagens; uma arte indisponível deixa de impedir instalação de toda a atualização. Arquivos essenciais continuam disponíveis offline.
- Revisão 067. Não altera localStorage ou IndexedDB. Testes de recuperação e ciclo de atualização; comportamento final ainda requer confirmação no PWA do iPhone.

## 0.9.0 — 2026-11-01

- Widget calendário grande reorganizado verticalmente: faixa própria de arte/frase, mês completo e até três tarefas de hoje. A faixa é desenhada como uma imagem única para não perder a frase por compressão de colunas.
- Envio manual inclui datas com tarefas, totais de hoje e até seis títulos/estados; não inclui notas, diário ou horários. Check de dia concluído usa o mesmo critério da Jornada, considerando todos os compromissos, mesmo além do limite visual.
- Pontos em dias programados, checks em dias concluídos. Tarefas antigas não aparecem como atuais; arte indisponível gera orientação para carregar no Scriptable com internet.
- Revisão 068, guia atualizado e compatibilidade com envios anteriores mantida. Testes de snapshot, privacidade e layout simulado; conferência visual no iPhone ainda necessária.

## 0.9.1 — 2026-11-01

- Opção experimental -app no parâmetro do widget (calendario-app, frase-app, treino-app, mensal-app) tenta abrir o FORJA instalado via webapp://, mantendo o modo sem sufixo como alternativa para navegador.
- Guia oferece botão para testar no iPhone antes de configurar o widget. Compatibilidade e abertura da rota não são garantidas; a URL leva somente ao endereço público raiz, sem dados pessoais.
- Revisão 069. Testes verificam destino opcional e preservação do calendário. Validação real no iPhone pendente.
