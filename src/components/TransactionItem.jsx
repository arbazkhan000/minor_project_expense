import { format, isToday, isYesterday, parseISO } from "date-fns";
import { Trash2 } from "lucide-react";
import { useBudget } from "../context/BudgetContext";

/* -------------------- Transaction Item -------------------- */
// (No changes needed here, keeping it compact for you)
const TransactionItem = ({ transaction, onDelete }) => {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(amount);
    };

    return (
        <div className="group bg-black border border-yellow-800 text-white flex items-center gap-4 p-4 rounded-xl hover:bg-accent/50 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/10 to-accent flex items-center justify-center text-xl">
                {transaction.category.split(" ")[0]}
            </div>

            <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">
                    {transaction.category.split(" ").slice(1).join(" ")}
                </p>
                <p className="text-sm text-muted-foreground truncate">
                    {transaction.description || "No description"}
                </p>
            </div>

            <div className="text-right">
                <p
                    className={`font-semibold ${transaction.type === "income" ? "text-emerald-500" : "text-rose-500"}`}
                >
                    {transaction.type === "income" ? "+" : "-"}
                    {formatCurrency(transaction.amount)}
                </p>
            </div>

            <button
                onClick={onDelete}
                className="opacity-0 group-hover:opacity-100 p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all"
            >
                <Trash2 className="w-4 h-4" />
            </button>
        </div>
    );
};

/* -------------------- Transaction List -------------------- */

const TransactionList = () => {
    const { state, deleteTransaction } = useBudget();

    const groupTransactionsByDate = () => {
        const groups = {};
        state.transactions.forEach((transaction) => {
            const date = parseISO(transaction.date);
            let label;
            if (isToday(date)) {
                label = "Today";
            } else if (isYesterday(date)) {
                label = "Yesterday";
            } else {
                label = format(date, "MMM d, yyyy");
            }
            if (!groups[label]) {
                groups[label] = [];
            }
            groups[label].push(transaction);
        });
        return groups;
    };

    const groupedTransactions = groupTransactionsByDate();

    // 1. EMPTY STATE
    if (state.transactions.length === 0) {
        return (
            // Changed min-h-screen to h-full to fit the parent container exactly
            <div className="card-surface rounded-2xl border border-blue-800 h-full flex flex-col items-center justify-center p-8 text-center">
                <div className="w-16 h-16 mb-4 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-3xl">💸</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                    No transactions yet
                </h3>
                <p className="text-sm text-muted-foreground">
                    Start tracking your expenses by adding your first
                    transaction above.
                </p>
            </div>
        );
    }

    // 2. MAIN LIST STATE
    return (
        // Added h-full, flex, and flex-col to manage height properly
        <div className="max-w-2xl mx-auto h-screen border border-red-800 flex flex-col card-surface rounded-2xl overflow-hidden">
            {/* Header: Fixed at top (shrink-0 prevents it from getting squashed) */}
            <div className="p-6 pb-4 shrink-0 border-b border-border/50">
                <h2 className="text-lg font-semibold text-foreground">
                    Recent Transactions
                </h2>
            </div>

            {/* List Area: flex-1 takes remaining height, overflow-y-auto enables internal scrolling */}
            <div className="px-4 py-4 flex-1 overflow-y-auto space-y-6">
                {Object.entries(groupedTransactions).map(
                    ([date, transactions]) => (
                        <div key={date}>
                            <p className="px-2 pb-2 text-xs font-medium text-muted-foreground uppercase tracking-wider sticky top-0 bg-card-surface/95 backdrop-blur-sm py-2 z-10">
                                {date}
                            </p>

                            <div className="space-y-3">
                                {transactions.map((transaction) => (
                                    <TransactionItem
                                        key={transaction.id}
                                        transaction={transaction}
                                        onDelete={() =>
                                            deleteTransaction(transaction.id)
                                        }
                                    />
                                ))}
                            </div>
                        </div>
                    ),
                )}
            </div>
        </div>
    );
};

export default TransactionList;
