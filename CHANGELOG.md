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
