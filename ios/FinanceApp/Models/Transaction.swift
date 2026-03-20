import Foundation

enum TransactionType: String, Codable, CaseIterable {
    case income = "income"
    case expense = "expense"
}

struct Transaction: Identifiable, Codable, Equatable {
    var id: String
    var type: TransactionType
    var amount: Double
    var categoryId: String
    var description: String
    var date: Date
    var note: String?
    var createdAt: Date
    var updatedAt: Date?

    init(
        id: String = UUID().uuidString,
        type: TransactionType,
        amount: Double,
        categoryId: String,
        description: String,
        date: Date = Date(),
        note: String? = nil
    ) {
        self.id = id
        self.type = type
        self.amount = amount
        self.categoryId = categoryId
        self.description = description
        self.date = date
        self.note = note
        self.createdAt = Date()
    }
}
