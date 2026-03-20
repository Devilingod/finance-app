import SwiftUI

struct DashboardView: View {
    @Environment(FinanceViewModel.self) private var vm
    @State private var period: Period = .month
    @State private var showAdd = false

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 16) {
                    BalanceCardView(period: $period)
                    RecentTransactionsView()
                }
                .padding()
            }
            .background(Color(.systemGroupedBackground))
            .navigationTitle("Мой кошелёк")
            .toolbar {
                ToolbarItem(placement: .primaryAction) {
                    Button { showAdd = true } label: {
                        Image(systemName: "plus.circle.fill")
                            .font(.title2)
                            .foregroundStyle(.purple)
                    }
                }
            }
            .sheet(isPresented: $showAdd) {
                AddTransactionView()
            }
        }
    }
}
