import Foundation

enum AppTheme: String, Codable, CaseIterable {
    case dark, light, neon, glass

    var displayName: String {
        switch self {
        case .dark:  return "Тёмная"
        case .light: return "Светлая"
        case .neon:  return "Неоновая"
        case .glass: return "Стеклянная"
        }
    }
}

enum AppCurrency: String, Codable, CaseIterable {
    case rub = "RUB"
    case usd = "USD"
    case eur = "EUR"
    case gbp = "GBP"

    var symbol: String {
        switch self {
        case .rub: return "₽"
        case .usd: return "$"
        case .eur: return "€"
        case .gbp: return "£"
        }
    }
}

struct AppSettings: Codable {
    var theme: AppTheme = .dark
    var currency: AppCurrency = .rub
    var pinEnabled: Bool = false
    var pinHash: String? = nil
    var useFaceID: Bool = false
}
