import Foundation
import Observation

@Observable
final class FinanceViewModel {
    var transactions: [Transaction] = []
    var categories: [Category] = Category.defaults
    var settings: AppSettings = AppSettings()

    private let dataService = DataService()

    init() {
        load()
        if transactions.isEmpty {
            transactions = MockData.transactions
        }
    }

    func addTransaction(_ t: Transaction) {
        transactions.insert(t, at: 0)
        save()
    }

    func updateTransaction(_ t: Transaction) {
        if let idx = transactions.firstIndex(where: { $0.id == t.id }) {
            var updated = t
            updated.updatedAt = Date()
            transactions[idx] = updated
            save()
        }
    }

    func deleteTransaction(id: String) {
        transactions.removeAll { $0.id == id }
        save()
    }

    func addCategory(_ c: Category) {
        categories.append(c)
        save()
    }

    func updateCategory(_ c: Category) {
        if let idx = categories.firstIndex(where: { $0.id == c.id }) {
            categories[idx] = c
            save()
        }
    }

    func deleteCategory(id: String) {
        categories.removeAll { $0.id == id }
        save()
    }

    func updateSettings(_ s: AppSettings) {
        settings = s
        save()
    }

    func balance(for period: Period) -> (total: Double, income: Double, expenses: Double) {
        let filtered = transactions.filter { period.contains($0.date) }
        let income   = filtered.filter { $0.type == .income  }.reduce(0) { $0 + $1.amount }
        let expenses = filtered.filter { $0.type == .expense }.reduce(0) { $0 + $1.amount }
        return (income - expenses, income, expenses)
    }

    func category(for id: String) -> Category? {
        categories.first { $0.id == id }
    }

    func filteredTransactions(search: String, type: TransactionType?, categoryId: String?, period: Period) -> [Transaction] {
        transactions
            .filter { period.contains($0.date) }
            .filter { type == nil || $0.type == type }
            .filter { categoryId == nil || $0.categoryId == categoryId }
            .filter { search.isEmpty || $0.description.localizedCaseInsensitiveContains(search) }
    }

    func categoryStats(period: Period, type: TransactionType = .expense) -> [(category: Category, amount: Double, percentage: Double)] {
        let filtered = transactions.filter { $0.type == type && period.contains($0.date) }
        let total = filtered.reduce(0.0) { $0 + $1.amount }
        var map: [String: Double] = [:]
        for t in filtered { map[t.categoryId, default: 0] += t.amount }
        return map.compactMap { (catId, amount) in
            guard let cat = category(for: catId) else { return nil }
            return (cat, amount, total > 0 ? amount / total * 100 : 0)
        }.sorted { $0.amount > $1.amount }
    }

    private func save() {
        dataService.save(transactions: transactions, categories: categories, settings: settings)
    }

    private func load() {
        let data = dataService.load()
        transactions = data.transactions
        categories   = data.categories.isEmpty ? Category.defaults : data.categories
        settings     = data.settings
    }
}

enum Period: String, CaseIterable {
    case day, week, month, year, all

    var displayName: String {
        switch self {
        case .day:   return "День"
        case .week:  return "Неделя"
        case .month: return "Месяц"
        case .year:  return "Год"
        case .all:   return "Всё время"
        }
    }

    func contains(_ date: Date) -> Bool {
        let cal = Calendar.current
        let now = Date()
        switch self {
        case .day:   return cal.isDateInToday(date)
        case .week:  return cal.isDate(date, equalTo: now, toGranularity: .weekOfYear)
        case .month: return cal.isDate(date, equalTo: now, toGranularity: .month)
        case .year:  return cal.isDate(date, equalTo: now, toGranularity: .year)
        case .all:   return true
        }
    }
}
