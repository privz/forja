import Foundation
@main enum ProgressChecks {
    static func main() {
        let f = ISO8601DateFormatter()
        let monday = f.date(from: "2026-11-02T12:00:00Z")!
        var state = LabState()
        state.toggleToday(monday)
        precondition(state.isDone(monday))
        precondition(state.weekCount(monday) == 1)
        state.toggleToday(monday)
        precondition(!state.isDone(monday))
        state.doneDates = ["2026-11-01", "2026-11-02", "2026-11-02", "2026-11-04"]
        precondition(state.weekCount(monday) == 1)
        let encoded = try! JSONEncoder().encode(state)
        precondition(try! JSONDecoder().decode(LabState.self, from: encoded).focus == state.focus)
        print("Native progress checks passed")
    }
}
