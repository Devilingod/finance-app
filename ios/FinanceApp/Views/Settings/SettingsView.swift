import SwiftUI

struct SettingsView: View {
    @Environment(FinanceViewModel.self) private var vm
    @State private var showPinSetup = false
    @State private var showExport = false

    var body: some View {
        NavigationStack {
            Form {
                Section("Тема") {
                    Picker("Тема", selection: Binding(
                        get: { vm.settings.theme },
                        set: { vm.updateSettings(AppSettings(theme: $0, currency: vm.settings.currency, pinEnabled: vm.settings.pinEnabled, pinHash: vm.settings.pinHash)) }
                    )) {
                        ForEach(AppTheme.allCases, id: \.self) { theme in
                            Text(theme.displayName).tag(theme)
                        }
                    }
                    .pickerStyle(.menu)
                }

                Section("Валюта") {
                    Picker("Валюта", selection: Binding(
                        get: { vm.settings.currency },
                        set: { vm.updateSettings(AppSettings(theme: vm.settings.theme, currency: $0, pinEnabled: vm.settings.pinEnabled, pinHash: vm.settings.pinHash)) }
                    )) {
                        ForEach(AppCurrency.allCases, id: \.self) { c in
                            Text("\(c.symbol) \(c.rawValue)").tag(c)
                        }
                    }
                    .pickerStyle(.menu)
                }

                Section("Безопасность") {
                    Toggle("PIN-код", isOn: Binding(
                        get: { vm.settings.pinEnabled },
                        set: { enabled in
                            var s = vm.settings
                            if enabled { showPinSetup = true }
                            else { s.pinEnabled = false; s.pinHash = nil; vm.updateSettings(s) }
                        }
                    ))

                    if AuthService.shared.isBiometricsAvailable() {
                        Toggle("Face ID / Touch ID", isOn: Binding(
                            get: { vm.settings.useFaceID },
                            set: { v in var s = vm.settings; s.useFaceID = v; vm.updateSettings(s) }
                        ))
                    }
                }

                Section("Данные") {
                    Button { exportJSON() } label: {
                        Label("Экспорт JSON", systemImage: "square.and.arrow.up")
                    }
                    Label("\(vm.transactions.count) транзакций · \(vm.categories.count) категорий", systemImage: "externaldrive")
                        .foregroundStyle(.secondary)
                        .font(.caption)
                }

                Section {
                    VStack(spacing: 4) {
                        Text("Finance App").font(.headline)
                        Text("Версия 1.0.0 · Данные хранятся локально").font(.caption).foregroundStyle(.secondary)
                    }
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 4)
                }
            }
            .navigationTitle("Настройки")
        }
    }

    private func exportJSON() {
        guard let data = DataService().exportJSON(transactions: vm.transactions, categories: vm.categories) else { return }
        let url = FileManager.default.temporaryDirectory.appendingPathComponent("finance-export.json")
        try? data.write(to: url)
        let av = UIActivityViewController(activityItems: [url], applicationActivities: nil)
        if let scene = UIApplication.shared.connectedScenes.first as? UIWindowScene,
           let vc = scene.windows.first?.rootViewController {
            vc.present(av, animated: true)
        }
    }
}
