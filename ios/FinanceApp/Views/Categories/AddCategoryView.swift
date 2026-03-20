import SwiftUI

struct AddCategoryView: View {
    @Environment(FinanceViewModel.self) private var vm
    @Environment(\.dismiss) private var dismiss

    var editCategory: Category? = nil

    @State private var name = ""
    @State private var icon = "circle"
    @State private var color = "#6C63FF"
    @State private var type: CategoryType = .expense

    let icons = ["cart","car","gamecontroller","creditcard","heart","tshirt","house",
                 "airplane","book","fork.knife","cup.and.saucer","music.note","dumbbell",
                 "laptopcomputer","briefcase","chart.line.uptrend.xyaxis","gift","plus.circle",
                 "ellipsis.circle","bolt","star","globe"]

    let colors = ["#F97316","#EF4444","#3B82F6","#8B5CF6","#06B6D4","#F43F5E",
                  "#A78BFA","#64748B","#0EA5E9","#84CC16","#00D4AA","#F59E0B",
                  "#EC4899","#10B981","#6C63FF","#94A3B8"]

    var body: some View {
        NavigationStack {
            Form {
                Section {
                    HStack {
                        Spacer()
                        ZStack {
                            Circle().fill((Color(hex: color) ?? .purple).opacity(0.2)).frame(width: 60, height: 60)
                            Image(systemName: icon).font(.title2).foregroundStyle(Color(hex: color) ?? .purple)
                        }
                        Spacer()
                    }
                }

                Section("Название") {
                    TextField("Название категории", text: $name)
                }

                Section("Тип") {
                    Picker("Тип", selection: $type) {
                        Text("Расход").tag(CategoryType.expense)
                        Text("Доход").tag(CategoryType.income)
                        Text("Оба").tag(CategoryType.both)
                    }
                    .pickerStyle(.segmented)
                }

                Section("Цвет") {
                    LazyVGrid(columns: Array(repeating: GridItem(.flexible()), count: 8), spacing: 10) {
                        ForEach(colors, id: \.self) { c in
                            Circle()
                                .fill(Color(hex: c) ?? .gray)
                                .frame(width: 30, height: 30)
                                .overlay(Circle().stroke(Color.primary, lineWidth: color == c ? 2 : 0))
                                .onTapGesture { color = c }
                        }
                    }
                }

                Section("Иконка") {
                    LazyVGrid(columns: Array(repeating: GridItem(.flexible()), count: 6), spacing: 10) {
                        ForEach(icons, id: \.self) { ic in
                            ZStack {
                                RoundedRectangle(cornerRadius: 8)
                                    .fill(icon == ic ? (Color(hex: color) ?? .purple).opacity(0.2) : Color(.tertiarySystemFill))
                                    .frame(height: 40)
                                Image(systemName: ic)
                                    .foregroundStyle(icon == ic ? (Color(hex: color) ?? .purple) : .secondary)
                            }
                            .onTapGesture { icon = ic }
                        }
                    }
                }
            }
            .navigationTitle(editCategory == nil ? "Новая категория" : "Редактировать")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) { Button("Отмена") { dismiss() } }
                ToolbarItem(placement: .confirmationAction) {
                    Button(editCategory == nil ? "Создать" : "Сохранить") { submit() }
                        .disabled(name.trimmingCharacters(in: .whitespaces).isEmpty)
                }
            }
            .onAppear {
                if let cat = editCategory {
                    name = cat.name; icon = cat.icon; color = cat.color; type = cat.type
                }
            }
        }
    }

    private func submit() {
        let cat = Category(id: editCategory?.id ?? UUID().uuidString, name: name, icon: icon, color: color, type: type, isCustom: true)
        if editCategory != nil { vm.updateCategory(cat) } else { vm.addCategory(cat) }
        dismiss()
    }
}
