import Foundation
import WidgetKit

// Sideloading tools can rewrite App Group identifiers. Prefer their signed metadata.
enum LabStore {
    static let baseGroup = "group.com.privz.forja.lab"
    static let key = "forja-lab-state-v1"
    static var availableGroup: String? {
        let injected = Bundle.main.object(forInfoDictionaryKey: "ALTAppGroups") as? [String] ?? []
        return (injected.filter { $0.contains("forja") } + [baseGroup]).first {
            FileManager.default.containerURL(forSecurityApplicationGroupIdentifier: $0) != nil
        }
    }
    static var sharedAvailable: Bool { availableGroup != nil }
    static var defaults: UserDefaults {
        availableGroup.flatMap { UserDefaults(suiteName: $0) } ?? .standard
    }
    static func read() -> LabState {
        guard let data = defaults.data(forKey: key), let value = try? JSONDecoder().decode(LabState.self, from: data) else { return LabState() }
        return value
    }
    static func save(_ value: LabState) throws {
        let data = try JSONEncoder().encode(value)
        defaults.set(data, forKey: key)
        WidgetCenter.shared.reloadTimelines(ofKind: "ForjaLabFocus")
    }
}
