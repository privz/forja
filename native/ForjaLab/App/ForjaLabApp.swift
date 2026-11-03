import SwiftUI
import UserNotifications

@main
struct ForjaLabApp: App {
    var body: some Scene { WindowGroup { LabView() } }
}

struct LabView: View {
    @Environment(\.scenePhase) private var scenePhase
    @State private var state = LabStore.read()
    @State private var message = ""
    @State private var enteredFocus = ""
    private let gold = Color(red: 0.96, green: 0.79, blue: 0.43)
    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: 20) {
                    ZStack(alignment: .bottomLeading) {
                        Image("Lee").resizable().scaledToFill().frame(height: 240).clipped()
                        LinearGradient(colors: [.clear, .black.opacity(0.85)], startPoint: .top, endPoint: .bottom)
                        VStack(alignment: .leading, spacing: 8) {
                            Text("FORJA LAB").font(.caption.bold()).tracking(3)
                            Text(state.focus).font(.title.bold())
                        }.padding(20)
                    }.frame(height: 240).clipShape(RoundedRectangle(cornerRadius: 22))
                    Text("Protótipo nativo · dados de teste separados do FORJA web.").font(.footnote).foregroundStyle(.secondary)
                    VStack(alignment: .leading, spacing: 12) {
                        Text("Meu compromisso").font(.title2.bold())
                        Text("\(state.weekCount()) / 4 nesta semana").font(.title.bold()).foregroundStyle(gold)
                        Button { state.toggleToday(); persist() } label: {
                            Label(state.isDone() ? "Hoje concluído" : "Registrar hoje", systemImage: state.isDone() ? "checkmark.circle.fill" : "plus.circle.fill").frame(maxWidth: .infinity).padding(8)
                        }.buttonStyle(.borderedProminent).tint(gold).foregroundStyle(.black)
                    }.padding(18).background(.white.opacity(0.05), in: RoundedRectangle(cornerRadius: 18))
                    TextField("Minha frase de foco", text: $enteredFocus, axis: .vertical).textFieldStyle(.roundedBorder)
                    Button("Salvar frase e atualizar widget") {
                        let text = enteredFocus.trimmingCharacters(in: .whitespacesAndNewlines)
                        guard !text.isEmpty else { return }
                        state.focus = String(text.prefix(180)); persist()
                    }.buttonStyle(.bordered)
                    Button("Testar lembrete local em 1 minuto") { Task { await testReminder() } }.buttonStyle(.bordered)
                    Button("Cancelar lembrete de teste") {
                        UNUserNotificationCenter.current().removePendingNotificationRequests(withIdentifiers: ["forja-lab-test"])
                        message = "Lembrete de teste cancelado."
                    }.font(.footnote)
                    Label(LabStore.sharedAvailable ? "Compartilhamento com widget disponível" : "Compartilhamento com widget indisponível nesta assinatura", systemImage: LabStore.sharedAvailable ? "checkmark.shield" : "exclamationmark.triangle").font(.footnote).foregroundStyle(LabStore.sharedAvailable ? Color.green : Color.orange)
                    Text("Adicione o widget Forja Lab à tela inicial ou bloqueada. Toque nele para abrir este app. A atualização visual do widget é controlada pelo iOS.").font(.footnote).foregroundStyle(.secondary)
                    if !message.isEmpty { Text(message).font(.callout).accessibilityLabel(message) }
                }.padding(18)
            }.background(Color(red: 0.04, green: 0.09, blue: 0.07)).navigationTitle("Forja Lab")
        }.preferredColorScheme(.dark)
        .onAppear { state = LabStore.read(); enteredFocus = state.focus }
        .onChange(of: scenePhase) { _, phase in if phase == .active { state = LabStore.read() } }
        .onOpenURL { _ in state = LabStore.read(); message = "Você abriu o app pelo widget." }
    }
    private func persist() {
        do { try LabStore.save(state); message = LabStore.sharedAvailable ? "Salvo. Atualização do widget solicitada ao iOS." : "Salvo apenas neste app. Precisamos validar a assinatura do grupo compartilhado." }
        catch { message = "Não foi possível salvar: \(error.localizedDescription)" }
    }
    private func testReminder() async {
        do {
            let center = UNUserNotificationCenter.current()
            guard try await center.requestAuthorization(options: [.alert, .sound, .badge]) else { message = "Permita notificações para testar o lembrete."; return }
            let content = UNMutableNotificationContent()
            content.title = "FORJA · Um passo de cada vez"
            content.body = "Seu lembrete local de teste funcionou."
            content.sound = .default
            let request = UNNotificationRequest(identifier: "forja-lab-test", content: content, trigger: UNTimeIntervalNotificationTrigger(timeInterval: 60, repeats: false))
            try await center.add(request)
            message = "Lembrete agendado para daqui a um minuto. Pode bloquear a tela; Foco e ajustes do iOS podem silenciá-lo."
        } catch { message = "Falha ao agendar: \(error.localizedDescription)" }
    }
}
