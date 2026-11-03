# Forja Lab — protótipo nativo de validação

Este é um aplicativo separado, ainda sem o diário/calendário/recompensas do FORJA web. Objetivo: testar a instalação gratuita e o widget nativo antes de migrar dados ou reconstruir o produto completo.

## O que testar

1. Instalar o app mantendo a extensão ForjaLabWidget.
2. Conferir o indicador de compartilhamento no app. Se estiver indisponível, parar e verificar a assinatura/App Groups; não confundir o contador local com sincronização bem-sucedida.
3. Salvar uma frase e marcar Hoje. Conferir widget inicial e retangular/circular de bloqueio; iOS pode atrasar o redesenho.
4. Tocar no widget: deve abrir Forja Lab, não o Safari.
5. Agendar o lembrete de teste, permitir notificações e bloquear o aparelho; Foco e ajustes podem silenciá-lo.
6. Conferir arte e texto com o tema tingido. Código nativo usa fullColor para a imagem em iOS 18+, mas aparência precisa de validação real.
7. Renovar app e SideStore antes de sete dias e confirmar que o contador/frase persistem.

## Compilação

O workflow `.github/workflows/native-lab.yml` usa runner macOS padrão, gera projeto com XcodeGen, testa as regras de progresso e compila app + extensão sem assinatura. O artefato `ForjaLab-unsigned-ipa` expira após um dia para limitar armazenamento. Uma nova execução pode gerar outro arquivo.

O IPA SEM ASSINATURA não instala diretamente pelo Safari. SideStore/AltStore deve assinar usando a conta do próprio usuário. O workflow não recebe Apple ID, senha, certificado ou pairing file. Não enviar esses arquivos ao GitHub.

Uma compilação bem-sucedida não comprova instalação, App Groups ou execução no aparelho. Estes são critérios de validação pendentes. Ferramentas de assinatura podem modificar grupos; o protótipo tenta resolver `ALTAppGroups` injetado pelo instalador e informa se não houver grupo acessível.

## Windows e renovação

Seguir a documentação oficial atual, sem baixar instaladores de sites de terceiros:

- https://docs.sidestore.io/docs/installation/install
- Pré-requisitos: acessar o link Prerequisites dessa documentação, pois ferramentas e versões mudam.

A configuração inicial usa Windows, cabo USB e login do próprio usuário. Pode exigir confiança no desenvolvedor e Developer Mode, conforme iOS. O usuário faz essas etapas no aparelho/computador; nenhuma credencial é necessária no chat.

Na rotina: Wi-Fi e conexão local/VPN exigida pelo SideStore; abrir My Apps e renovar tanto SideStore quanto Forja Lab antes de vencer. Renovação automática não é garantia. O PC não precisa permanecer ligado para a rotina do SideStore; falhas ou novo emparelhamento podem exigir computador novamente.

## App Store e outras pessoas

SideStore não publica na App Store. Outra pessoa precisaria configurar a própria instalação/assinatura e renovação. Distribuição normal na App Store requer Apple Developer Program (preço base US$99/ano; impostos/região podem variar), preparação para distribuição e revisão da Apple. Usuários da versão da loja não fazem a renovação semanal de desenvolvimento.

Não prometer push remoto nativo com conta gratuita. Este protótipo utiliza apenas notificações LOCAIS, sem servidor/APNs. TestFlight também é distribuição vinculada ao programa pago e seus builds de teste têm validade própria.

## Dados

Bundle IDs distintos: com.privz.forja.lab e com.privz.forja.lab.widget. Nenhum dado é importado do PWA. Não desinstalar o FORJA web, não limpar Safari e não restaurar backups pessoais neste protótipo. Compartilhamento só envolve a frase e as datas de teste gravadas no app nativo.

## Referências

- Apple, limites de conta: https://developer.apple.com/help/account/basics/about-your-developer-account
- Apple, notificações locais: https://developer.apple.com/documentation/usernotifications/scheduling-a-notification-locally-from-your-app
- Apple, inscrição: https://developer.apple.com/help/account/membership/program-enrollment
- SideStore: https://docs.sidestore.io/docs/faq
- GitHub, runners e armazenamento: https://docs.github.com/en/billing/concepts/product-billing/github-actions
