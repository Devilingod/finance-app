import SwiftUI

struct AddTransactionView: View {
    @Environment(FinanceViewModel.self) private var vm
    @Environment(\.dismiss) private var dismiss

    @State private var type: TransactionType = .expense
    @State private var amountText = ""
    @State private var description = ""
    @State private var categoryId = ""
    @State private var date = Date()
    @State private var note = ""
    @State private var error = ""

    var visibleCats: [Category] {
        vm.categories.filter { $0.type == type || $0.type == .both }
    }

    var body: some View {
        NavigationStack {
            Form {
                Section {
                    Picker("Тип", selection: $type) {
                        Text("Расход").tag(TransactionType.expense)
                        Text("Доход").tag(TransactionType.income)
                    }
                    .pickerStyle(.segmented)
                }

                Section("Сумма") {
                    TextField("0", text: $amountText)
                        .keyboardType(.decimalPad)
                        .font(.system(size: 28, weight: .bold))
                        .multilineTextAlignment(.center)
                }

                Section("Описание") {
                    TextField("Например: Продукты в Ашан", text: $description)
                }

                Section("Категория") {
                    Picker("Категория", selection: $categoryId) {
                        ForEach(visibleCats) { cat in
                            Label(cat.name, systemImage: cat.icon).tag(cat.id)
                        }
                    }
                }

                Section("Дата") {
                    DatePicker("Дата", selection: $date, displayedComponents: .date)
                }

                Section("Заметка (необязательно)") {
                    TextField("Дополнительная информация", text: $note)
                }

                if !error.isEmpty {
                    Section {
                        Text(error).foregroundStyle(.red).font(.caption)
                    }
                }
            }
            .navigationTitle("Новая операция")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) { Button("Отмена") { dismiss() } }
                ToolbarItem(placement: .confirmationAction) { Button("Добавить") { submit() } }
            }
            .onAppear {
                if categoryId.isEmpty, let first = visibleCats.first {
                    categoryId = first.id
                }
            }
            .onChange(of: type) {
                if let first = visibleCats.first { categoryId = first.id }
            }
        }
    }

    private func submit() {
        guard let amount = Double(amountText.replacingOccurrences(of: ",", with: ".")), amount > 0 else {
            error = "Введите корректную сумму"; return
        }
        guard !description.trimmingCharacters(in: .whitespaces).isEmpty else {
            error = "Введите описание"; return
        }
        vm.addTransaction(Transaction(
            type: type, amount: amount, categoryId: categoryId,
            description: description.trimmingCharacters(in: .whitespaces),
            date: date, note: note.isEmpty ? nil : note
        ))
        dismiss()
    }
}
