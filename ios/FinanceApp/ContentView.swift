import SwiftUI

struct ContentView: View {
    @Environment(FinanceViewModel.self) private var vm

    var body: some View {
        TabView {
            DashboardView()
                .tabItem { Label("Главная",  systemImage: "house.fill") }

            TransactionListView()
                .tabItem { Label("История",  systemImage: "arrow.left.arrow.right") }

            AnalyticsView()
                .tabItem { Label("Аналитика", systemImage: "chart.bar.fill") }

            CategoriesView()
                .tabItem { Label("Категории", systemImage: "tag.fill") }

            SettingsView()
                .tabItem { Label("Настройки", systemImage: "gearshape.fill") }
        }
        .tint(.purple)
    }
}
