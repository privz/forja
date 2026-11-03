import SwiftUI
import WidgetKit

struct LabEntry: TimelineEntry {
    let date: Date
    let state: LabState
    let shared: Bool
}
struct LabProvider: TimelineProvider {
    func placeholder(in context: Context) -> LabEntry { LabEntry(date: Date(), state: LabState(), shared: true) }
    func getSnapshot(in context: Context, completion: @escaping (LabEntry) -> Void) { completion(LabEntry(date: Date(), state: LabStore.read(), shared: LabStore.sharedAvailable)) }
    func getTimeline(in context: Context, completion: @escaping (Timeline<LabEntry>) -> Void) {
        let now = Date()
        completion(Timeline(entries: [LabEntry(date: now, state: LabStore.read(), shared: LabStore.sharedAvailable)], policy: .after(now.addingTimeInterval(15 * 60))))
    }
}
@main
struct ForjaLabWidget: Widget {
    let kind = "ForjaLabFocus"
    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: LabProvider()) { entry in LabWidgetView(entry: entry) }
            .configurationDisplayName("Meu foco · Forja Lab")
            .description("Frase e compromisso compartilhados com o protótipo nativo.")
            .supportedFamilies([.systemSmall, .systemMedium, .accessoryRectangular, .accessoryCircular, .accessoryInline])
    }
}
struct LabWidgetView: View {
    @Environment(\.widgetFamily) private var family
    let entry: LabEntry
    private var score: String { entry.shared ? "\(entry.state.weekCount(entry.date))/4" : "—" }
    private var lock: Bool { [.accessoryRectangular, .accessoryCircular, .accessoryInline].contains(family) }
    var body: some View {
        Group {
            switch family {
            case .accessoryCircular:
                VStack(spacing: 3) { Image(systemName: "dumbbell.fill"); Text(score).font(.headline) }
            case .accessoryInline:
                Text(entry.shared ? entry.state.focus : "Abra Forja Lab para configurar")
            case .accessoryRectangular:
                VStack(alignment: .leading, spacing: 3) {
                    Text(entry.shared ? entry.state.focus : "Abra Forja Lab").font(.headline).lineLimit(2)
                    Text(entry.shared ? "Treinar · \(score)" : "Verifique o compartilhamento").font(.caption2)
                }
            default:
                VStack(alignment: .leading, spacing: 8) {
                    Text("FORJA LAB /").font(.caption2.bold()).tracking(2)
                    Spacer(minLength: 0)
                    Text(entry.state.focus).font(family == .systemSmall ? .headline : .title3.bold()).lineLimit(3)
                    Text(entry.shared ? (entry.state.isDone(entry.date) ? "✓ Hoje concluído · \(score)" : "Meu compromisso · \(score)") : "Abra o app · valide o grupo compartilhado").font(.caption.bold()).lineLimit(2)
                }.foregroundStyle(.white)
            }
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .leading)
        .background {
            if !lock {
                ZStack {
                    artwork.scaledToFill()
                    LinearGradient(colors: [.black.opacity(0.25), .black.opacity(0.88)], startPoint: .top, endPoint: .bottom)
                }.clipped()
            } else { Color.clear }
        }
        .containerBackground(for: .widget) { lock ? Color.clear : Color(red: 0.04, green: 0.10, blue: 0.07) }
        .widgetURL(URL(string: "forja-lab://today"))
    }
    @ViewBuilder private var artwork: some View {
        if #available(iOS 18.0, *) { Image("Lee").resizable().widgetAccentedRenderingMode(.fullColor) }
        else { Image("Lee").resizable() }
    }
}
