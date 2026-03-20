import Foundation

struct StoredData: Codable {
    var transactions: [Transaction]
    var categories: [Category]
    var settings: AppSettings
}

final class DataService {
    private let key = "finance-app-data"

    func save(transactions: [Transaction], categories: [Category], settings: AppSettings) {
        let data = StoredData(transactions: transactions, categories: categories, settings: settings)
        if let encoded = try? JSONEncoder().encode(data) {
            UserDefaults.standard.set(encoded, forKey: key)
        }
    }

    func load() -> StoredData {
        guard
            let raw = UserDefaults.standard.data(forKey: key),
            let data = try? JSONDecoder().decode(StoredData.self, from: raw)
        else {
            return StoredData(transactions: [], categories: [], settings: AppSettings())
        }
        return data
    }

    func exportJSON(transactions: [Transaction], categories: [Category]) -> Data? {
        let data = StoredData(transactions: transactions, categories: categories, settings: AppSettings())
        return try? JSONEncoder().encode(data)
    }
}
