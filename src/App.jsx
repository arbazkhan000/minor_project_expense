import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./components/Index";
import TransactionList from "./components/TransactionItem";
import Header from "./components/Header";
import { BudgetProvider } from "./context/BudgetContext";

function App() {
    // const transactionRef = useRef(null);

    // const scrollToTransactions = () => {
    //     transactionRef.current?.scrollIntoView({ behavior: "smooth" });
    // };

    return (
        // <div className="min-h-screen bg-black text-white">
        //     {/* Header */}
        //     <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/60 border-b border-white/10">
        //         <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
        //             {/* Logo */}
        //             <div className="flex items-center gap-3">
        //                 <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center">
        //                     <Stars className="w-5 h-5 text-white" />
        //                 </div>
        //                 <div>
        //                     <h1 className="text-lg font-bold tracking-tight">
        //                         BudgetBuddy
        //                     </h1>
        //                     <p className="text-xs text-zinc-400">
        //                         Smart expense tracking
        //                     </p>
        //                 </div>
        //             </div>

        //             {/* Transaction Button */}
        //             <button
        //                 onClick={scrollToTransactions}
        //                 className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm font-medium hover:bg-white/20 transition"
        //             >
        //                 <List className="w-4 h-4" />
        //                 Transactions
        //             </button>
        //         </div>
        //     </header>

        //     {/* Main */}
        //     <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        //         <BalanceCard />
        //         <AddTransaction />
        //         <SpendingChart />

        //         {/* Transaction Section */}
        //         <section ref={transactionRef} className="pt-6">
        //             <Link to="/transactions">
        //                 <TransactionList />
        //             </Link>
        //         </section>
        //     </main>
        // </div>

        <BrowserRouter>
            <BudgetProvider>
                <div className=" bg-black text-white h-full">
                    <Header />
                    <Routes>
                        <Route path="/" element={<Index />} />
                        <Route
                            path="/transactions"
                            element={<TransactionList />}
                        />
                    </Routes>
                </div>
            </BudgetProvider>
        </BrowserRouter>
    );
}

export default App;
