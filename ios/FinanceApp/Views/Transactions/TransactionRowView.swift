import SwiftUI

struct TransactionRowView: View {
    @Environment(FinanceViewModel.self) private var vm
    let transaction: Transaction

    var body: some View {
        let cat = vm.category(for: transaction.categoryId)
        HStack(spacing: 12) {
            ZStack {
                Circle()
                    .fill((cat?.swiftUIColor ?? .gray).opacity(0.15))
                    .frame(width: 44, height: 44)
                Image(systemName: cat?.icon ?? "circle")
                    .font(.system(size: 18))
                    .foregroundStyle(cat?.swiftUIColor ?? .gray)
            }

            VStack(alignment: .leading, spacing: 3) {
                Text(transaction.description)
                    .font(.subheadline).fontWeight(.semibold)
                    .lineLimit(1)
                Text("\(cat?.name ?? "") · \(Formatters.dateShort(transaction.date))")
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }

            Spacer()

            Text("\(transaction.type == .income ? "+" : "−")\(Formatters.currency(transaction.amount, currency: vm.settings.currency))")
                .font(.subheadline).fontWeight(.bold)
                .foregroundStyle(transaction.type == .income ? Color(hex: "#00D4AA") ?? .green : Color(hex: "#FF4D6D") ?? .red)
        }
        .padding(.vertical, 4)
    }
}
