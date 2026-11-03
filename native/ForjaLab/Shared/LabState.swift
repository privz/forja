import Foundation

struct LabState: Codable {
    var focus = "Um passo de cada vez."
    var doneDates: [String] = []
    static func key(_ date: Date) -> String {
        let calendar = Calendar(identifier: .gregorian)
        let parts = calendar.dateComponents([.year, .month, .day], from: date)
        return String(format: "%04d-%02d-%02d", parts.year!, parts.month!, parts.day!)
    }
    func isDone(_ date: Date = Date()) -> Bool { doneDates.contains(Self.key(date)) }
    func weekCount(_ now: Date = Date()) -> Int {
        let calendar = Calendar(identifier: .gregorian)
        let shift = (calendar.component(.weekday, from: now) + 5) % 7
        let start = calendar.date(byAdding: .day, value: -shift, to: calendar.startOfDay(for: now))!
        return Set(doneDates).filter { $0 >= Self.key(start) && $0 <= Self.key(now) }.count
    }
    mutating func toggleToday(_ now: Date = Date()) {
        let today = Self.key(now)
        if isDone(now) { doneDates.removeAll { $0 == today } }
        else { doneDates.append(today) }
    }
}
