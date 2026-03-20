import SwiftUI

@main
struct FinanceAppApp: App {
    @State private var viewModel = FinanceViewModel()

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environment(viewModel)
        }
    }
}
