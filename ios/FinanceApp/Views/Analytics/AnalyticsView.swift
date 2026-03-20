import SwiftUI
import Charts

struct AnalyticsView: View {
    @Environment(FinanceViewModel.self) private var vm
    @State private var period: Period = .month

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 16) {
                    Picker("Период", selection: $period) {
                        ForEach([Period.week, .month, .year, .all], id: \.self) {
                            Text($0.displayName).tag($0)
                        }
                    }
                    .pickerStyle(.segmented)
                    .padding(.horizontal)

                    StatsCardsView(period: period)
                    DonutChartView(period: period)
                    BarChartView()
                }
                .padding(.vertical)
            }
            .background(Color(.systemGroupedBackground))
            .navigationTitle("Аналитика")
        }
    }
}

private struct StatsCardsView: View {
    @Environment(FinanceViewModel.self) private var vm
    let period: Period

    var body: some View {
        let b = vm.balance(for: period)
        LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 12) {
            StatCard(title: "Доходы",  value: Formatters.currency(b.income, currency: vm.settings.currency),   color: Color(hex: "#00D4AA") ?? .green)
            StatCard(title: "Расходы", value: Formatters.currency(b.expenses, currency: vm.settings.currency), color: Color(hex: "#FF4D6D") ?? .red)
            StatCard(title: "Баланс",  value: Formatters.currency(b.total, currency: vm.settings.currency),    color: Color(hex: "#6C63FF") ?? .purple)
            let savings = b.income > 0 ? b.total / b.income * 100 : 0
            StatCard(title: "Сбережения", value: String(format: "%.1f%%", savings), color: savings >= 0 ? .green : .red)
        }
        .padding(.horizontal)
    }
}

private struct StatCard: View {
    let title: String
    let value: String
    let color: Color

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(title).font(.caption).foregroundStyle(.secondary)
            Text(value).font(.headline).fontWeight(.bold).foregroundStyle(color)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(14)
        .background(Color(.secondarySystemGroupedBackground))
        .clipShape(RoundedRectangle(cornerRadius: 14))
    }
}

struct DonutChartView: View {
    @Environment(FinanceViewModel.self) private var vm
    let period: Period

    var body: some View {
        let stats = vm.categoryStats(period: period, type: .expense)
        VStack(alignment: .leading, spacing: 12) {
            Text("Расходы по категориям").font(.headline).padding(.horizontal)
            Chart(stats, id: \.category.id) { item in
                SectorMark(angle: .value("Сумма", item.amount), innerRadius: .ratio(0.55), angularInset: 2)
                    .foregroundStyle(item.category.swiftUIColor)
            }
            .frame(height: 200)
            .padding(.horizontal)

            VStack(spacing: 6) {
                ForEach(stats.prefix(5), id: \.category.id) { item in
                    HStack {
                        Circle().fill(item.category.swiftUIColor).frame(width: 8)
                        Text(item.category.name).font(.caption).foregroundStyle(.secondary)
                        Spacer()
                        Text(Formatters.currency(item.amount, currency: vm.settings.currency)).font(.caption).fontWeight(.semibold)
                        Text(String(format: "%.0f%%", item.percentage)).font(.caption2).foregroundStyle(.secondary).frame(width: 36, alignment: .trailing)
                    }
                }
            }
            .padding(.horizontal)
        }
        .padding(.vertical)
        .background(Color(.secondarySystemGroupedBackground))
        .clipShape(RoundedRectangle(cornerRadius: 16))
        .padding(.horizontal)
    }
}

struct BarChartView: View {
    @Environment(FinanceViewModel.self) private var vm

    struct MonthData: Identifiable {
        let id = UUID()
        let month: String
        let type: String
        let amount: Double
    }

    var data: [MonthData] {
        let months = 6
        let cal = Calendar.current
        let now = Date()
        var result: [MonthData] = []
        for i in (0..<months).reversed() {
            guard let date = cal.date(byAdding: .month, value: -i, to: now) else { continue }
            let comps = cal.dateComponents([.year, .month], from: date)
            let label = Formatters.monthYear(date).prefix(3).description
            let txs = vm.transactions.filter {
                let c = cal.dateComponents([.year, .month], from: $0.date)
                return c.year == comps.year && c.month == comps.month
            }
            let income   = txs.filter { $0.type == .income  }.reduce(0.0) { $0 + $1.amount }
            let expenses = txs.filter { $0.type == .expense }.reduce(0.0) { $0 + $1.amount }
            result.append(MonthData(month: label, type: "income",   amount: income))
            result.append(MonthData(month: label, type: "expenses", amount: expenses))
        }
        return result
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Доходы и расходы").font(.headline).padding(.horizontal)
            Chart(data) { item in
                BarMark(x: .value("Месяц", item.month), y: .value("Сумма", item.amount))
                    .foregroundStyle(item.type == "income" ? (Color(hex: "#00D4AA") ?? .green) : (Color(hex: "#FF4D6D") ?? .red))
                    .position(by: .value("Тип", item.type))
                    .cornerRadius(4)
            }
            .frame(height: 180)
            .padding(.horizontal)
        }
        .padding(.vertical)
        .background(Color(.secondarySystemGroupedBackground))
        .clipShape(RoundedRectangle(cornerRadius: 16))
        .padding(.horizontal)
    }
}
