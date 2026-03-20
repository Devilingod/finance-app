import SwiftUI

struct RecentTransactionsView: View {
    @Environment(FinanceViewModel.self) private var vm

    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            Text("Последние операции")
                .font(.headline)

            let recent = Array(vm.transactions.prefix(5))
            if recent.isEmpty {
                ContentUnavailableView("Нет транзакций", systemImage: "tray")
            } else {
                ForEach(recent) { tx in
                    TransactionRowView(transaction: tx)
                }
            }
        }
    }
}
