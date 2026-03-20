import SwiftUI

enum CategoryType: String, Codable, CaseIterable {
    case income = "income"
    case expense = "expense"
    case both = "both"
}

struct Category: Identifiable, Codable, Equatable {
    var id: String
    var name: String
    var icon: String
    var color: String
    var type: CategoryType
    var isCustom: Bool

    var swiftUIColor: Color {
        Color(hex: color) ?? .blue
    }

    static let defaults: [Category] = [
        Category(id: "cat-salary",        name: "Зарплата",       icon: "briefcase",           color: "#00D4AA", type: .income,  isCustom: false),
        Category(id: "cat-freelance",     name: "Фриланс",        icon: "laptopcomputer",      color: "#6C63FF", type: .income,  isCustom: false),
        Category(id: "cat-investments",   name: "Инвестиции",     icon: "chart.line.uptrend.xyaxis", color: "#F59E0B", type: .income, isCustom: false),
        Category(id: "cat-gifts-in",      name: "Подарки",        icon: "gift",                color: "#EC4899", type: .income,  isCustom: false),
        Category(id: "cat-other-in",      name: "Прочее доход",   icon: "plus.circle",         color: "#10B981", type: .income,  isCustom: false),
        Category(id: "cat-food",          name: "Продукты",       icon: "cart",                color: "#F97316", type: .expense, isCustom: false),
        Category(id: "cat-restaurants",   name: "Рестораны",      icon: "fork.knife",          color: "#EF4444", type: .expense, isCustom: false),
        Category(id: "cat-transport",     name: "Транспорт",      icon: "car",                 color: "#3B82F6", type: .expense, isCustom: false),
        Category(id: "cat-entertainment", name: "Развлечения",    icon: "gamecontroller",      color: "#8B5CF6", type: .expense, isCustom: false),
        Category(id: "cat-subscriptions", name: "Подписки",       icon: "creditcard",          color: "#06B6D4", type: .expense, isCustom: false),
        Category(id: "cat-health",        name: "Здоровье",       icon: "heart",               color: "#F43F5E", type: .expense, isCustom: false),
        Category(id: "cat-clothes",       name: "Одежда",         icon: "tshirt",              color: "#A78BFA", type: .expense, isCustom: false),
        Category(id: "cat-utilities",     name: "ЖКХ",            icon: "house",               color: "#64748B", type: .expense, isCustom: false),
        Category(id: "cat-travel",        name: "Путешествия",    icon: "airplane",            color: "#0EA5E9", type: .expense, isCustom: false),
        Category(id: "cat-education",     name: "Образование",    icon: "book",                color: "#84CC16", type: .expense, isCustom: false),
        Category(id: "cat-other-ex",      name: "Прочее",         icon: "ellipsis.circle",     color: "#94A3B8", type: .expense, isCustom: false),
    ]
}

extension Color {
    init?(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let r, g, b: Double
        switch hex.count {
        case 6:
            r = Double((int >> 16) & 0xFF) / 255
            g = Double((int >> 8)  & 0xFF) / 255
            b = Double(int         & 0xFF) / 255
        default: return nil
        }
        self.init(red: r, green: g, blue: b)
    }
}
