import Foundation

enum MockData {
    static func daysAgo(_ n: Int) -> Date {
        Calendar.current.date(byAdding: .day, value: -n, to: Date()) ?? Date()
    }

    static let transactions: [Transaction] = [
        Transaction(type: .income,  amount: 180000, categoryId: "cat-salary",        description: "Зарплата за март",          date: daysAgo(2)),
        Transaction(type: .income,  amount: 45000,  categoryId: "cat-freelance",     description: "Проект Yandex UI",          date: daysAgo(5)),
        Transaction(type: .expense, amount: 8500,   categoryId: "cat-food",          description: "Пятёрочка + Вкусвилл",      date: daysAgo(1)),
        Transaction(type: .expense, amount: 1200,   categoryId: "cat-transport",     description: "Яндекс Такси",              date: daysAgo(1)),
        Transaction(type: .expense, amount: 3500,   categoryId: "cat-restaurants",   description: "Обед с командой",           date: daysAgo(2)),
        Transaction(type: .expense, amount: 799,    categoryId: "cat-subscriptions", description: "Spotify Premium",           date: daysAgo(3)),
        Transaction(type: .expense, amount: 12400,  categoryId: "cat-clothes",       description: "Кроссовки Nike",            date: daysAgo(4)),
        Transaction(type: .expense, amount: 5600,   categoryId: "cat-health",        description: "Аптека + анализы",          date: daysAgo(4)),
        Transaction(type: .expense, amount: 18000,  categoryId: "cat-utilities",     description: "ЖКХ март",                  date: daysAgo(5)),
        Transaction(type: .income,  amount: 12000,  categoryId: "cat-investments",   description: "Дивиденды Сбер",            date: daysAgo(6)),
        Transaction(type: .expense, amount: 4200,   categoryId: "cat-entertainment", description: "Кино + попкорн",            date: daysAgo(7)),
        Transaction(type: .income,  amount: 180000, categoryId: "cat-salary",        description: "Зарплата за февраль",       date: daysAgo(32)),
        Transaction(type: .income,  amount: 28000,  categoryId: "cat-freelance",     description: "Логотип для стартапа",      date: daysAgo(35)),
        Transaction(type: .expense, amount: 75000,  categoryId: "cat-travel",        description: "Авиабилеты + отель СПб",    date: daysAgo(36)),
        Transaction(type: .expense, amount: 15000,  categoryId: "cat-education",     description: "Курс React Advanced",      date: daysAgo(40)),
        Transaction(type: .income,  amount: 180000, categoryId: "cat-salary",        description: "Зарплата за январь",        date: daysAgo(62)),
        Transaction(type: .expense, amount: 95000,  categoryId: "cat-travel",        description: "Новый год в Дубае",         date: daysAgo(68)),
    ]
}
