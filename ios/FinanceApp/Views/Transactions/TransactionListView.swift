import SwiftUI

struct TransactionListView: View {
    @Environment(FinanceViewModel.self) private var vm
    @State private var search = ""
    @State private var showAdd = false
    @State private var period: Period = .month
    @State private var filterType: TransactionType? = nil

    var filtered: [Transaction] {
        vm.filteredTransactions(search: search, type: filterType, categoryId: nil, period: period)
    }

    var body: some View {
        NavigationStack {
            List {
                Section {
                    Picker("Период", selection: $period) {
                        ForEach([Period.week, .month, .year, .all], id: \.self) {
                            Text($0.displayName).tag($0)
                        }
                    }
                    .pickerStyle(.segmented)

                    Picker("Тип", selection: $filterType) {
                        Text("Все").tag(Optional<TransactionType>.none)
                        Text("Доходы").tag(Optional(TransactionType.income))
                        Text("Расходы").tag(Optional(TransactionType.expense))
                    }
                    .pickerStyle(.segmented)
                }

                if filtered.isEmpty {
                    ContentUnavailableView("Нет транзакций", systemImage: "magnifyingglass")
                } else {
                    ForEach(filtered) { tx in
                        TransactionRowView(transaction: tx)
                    }
                    .onDelete { ids in
                        ids.forEach { i in vm.deleteTransaction(id: filtered[i].id) }
                    }
                }
            }
            .searchable(text: $search, prompt: "Поиск...")
            .navigationTitle("История")
            .toolbar {
                ToolbarItem(placement: .primaryAction) {
                    Button { showAdd = true } label: {
                        Image(systemName: "plus.circle.fill").font(.title2).foregroundStyle(.purple)
                    }
                }
            }
            .sheet(isPresented: $showAdd) { AddTransactionView() }
        }
    }
}
