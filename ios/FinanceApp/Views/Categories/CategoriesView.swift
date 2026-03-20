import SwiftUI

struct CategoriesView: View {
    @Environment(FinanceViewModel.self) private var vm
    @State private var showAdd = false
    @State private var filterType: CategoryType? = nil
    @State private var editCategory: Category? = nil

    var filtered: [Category] {
        vm.categories.filter { filterType == nil || $0.type == filterType || $0.type == .both }
    }

    var body: some View {
        NavigationStack {
            List {
                Section {
                    Picker("Тип", selection: $filterType) {
                        Text("Все").tag(Optional<CategoryType>.none)
                        Text("Расходы").tag(Optional(CategoryType.expense))
                        Text("Доходы").tag(Optional(CategoryType.income))
                    }
                    .pickerStyle(.segmented)
                }

                ForEach(filtered) { cat in
                    HStack(spacing: 12) {
                        ZStack {
                            Circle().fill(cat.swiftUIColor.opacity(0.15)).frame(width: 40, height: 40)
                            Image(systemName: cat.icon).foregroundStyle(cat.swiftUIColor)
                        }
                        VStack(alignment: .leading, spacing: 2) {
                            Text(cat.name).font(.subheadline).fontWeight(.semibold)
                            let count = vm.transactions.filter { $0.categoryId == cat.id }.count
                            Text("\(count) транзакций · \(cat.type.rawValue == "both" ? "Доход/Расход" : cat.type.rawValue == "income" ? "Доход" : "Расход")")
                                .font(.caption).foregroundStyle(.secondary)
                        }
                        Spacer()
                        if cat.isCustom {
                            Button { editCategory = cat } label: {
                                Image(systemName: "pencil").foregroundStyle(.secondary)
                            }
                            .buttonStyle(.plain)
                        }
                    }
                    .padding(.vertical, 4)
                    .swipeActions(edge: .trailing) {
                        if cat.isCustom {
                            Button(role: .destructive) { vm.deleteCategory(id: cat.id) } label: {
                                Label("Удалить", systemImage: "trash")
                            }
                        }
                    }
                }
            }
            .navigationTitle("Категории")
            .toolbar {
                ToolbarItem(placement: .primaryAction) {
                    Button { showAdd = true } label: {
                        Image(systemName: "plus.circle.fill").font(.title2).foregroundStyle(.purple)
                    }
                }
            }
            .sheet(isPresented: $showAdd) { AddCategoryView() }
            .sheet(item: $editCategory) { cat in AddCategoryView(editCategory: cat) }
        }
    }
}
