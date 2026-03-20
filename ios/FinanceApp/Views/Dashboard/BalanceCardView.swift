import SwiftUI

struct BalanceCardView: View {
    @Environment(FinanceViewModel.self) private var vm
    @Binding var period: Period

    var body: some View {
        let b = vm.balance(for: period)
        ZStack {
            RoundedRectangle(cornerRadius: 20)
                .fill(
                    LinearGradient(
                        colors: [Color(hex: "#6C63FF") ?? .purple, Color(hex: "#00D4AA") ?? .teal],
                        startPoint: .topLeading, endPoint: .bottomTrailing
                    )
                )
            VStack(alignment: .leading, spacing: 12) {
                Text("Общий баланс")
                    .font(.subheadline)
                    .foregroundStyle(.white.opacity(0.8))

                Text(Formatters.currency(b.total, currency: vm.settings.currency))
                    .font(.system(size: 36, weight: .bold, design: .rounded))
                    .foregroundStyle(.white)

                HStack(spacing: 12) {
                    StatChip(label: "Доходы", value: b.income, currency: vm.settings.currency, icon: "arrow.up")
                    StatChip(label: "Расходы", value: b.expenses, currency: vm.settings.currency, icon: "arrow.down")
                }

                Picker("Период", selection: $period) {
                    ForEach(Period.allCases, id: \.self) { p in
                        Text(p.displayName).tag(p)
                    }
                }
                .pickerStyle(.segmented)
                .colorMultiply(.white)
            }
            .padding(20)
        }
    }
}

private struct StatChip: View {
    let label: String
    let value: Double
    let currency: AppCurrency
    let icon: String

    var body: some View {
        HStack(spacing: 6) {
            Image(systemName: icon).font(.caption)
            VStack(alignment: .leading, spacing: 1) {
                Text(label).font(.caption2).opacity(0.75)
                Text(Formatters.currency(value, currency: currency)).font(.caption).bold()
            }
        }
        .foregroundStyle(.white)
        .padding(.horizontal, 12)
        .padding(.vertical, 8)
        .background(.white.opacity(0.15))
        .clipShape(RoundedRectangle(cornerRadius: 10))
    }
}
