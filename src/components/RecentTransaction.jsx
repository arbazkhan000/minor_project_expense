import React from "react";
import { useBudget } from "../context/BudgetContext";
import { Trash2 } from "lucide-react";
import { format, parseISO } from "date-fns";

const RecentTransactions = () => {
    const { state, deleteTransaction } = useBudget();

    // Get latest 5 transactions
    const recentTransactions = [...state.transactions]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(amount);
    };

    if (recentTransactions.length === 0) {
        return (
            <div className="bg-black/60 border border-white/10 rounded-2xl p-6 text-center">
                <span className="text-3xl">💸</span>
                <p className="text-sm text-zinc-400 mt-2">
                    No recent transactions
                </p>
            </div>
        );
    }

    return (
        <div className="bg-black/60 border border-white/10 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-white/10">
                <h2 className="text-sm font-semibold text-white tracking-wide">
                    Recent Transactions
                </h2>
            </div>

            <div className="divide-y divide-white/10">
                {recentTransactions.map((tx) => (
                    <div
                        key={tx.id}
                        className="group flex items-center gap-4 px-6 py-4 hover:bg-white/5 transition"
                    >
                        {/* Emoji */}
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-lg">
                            {tx.category.split(" ")[0]}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">
                                {tx.category.split(" ").slice(1).join(" ")}
                            </p>
                            <p className="text-xs text-zinc-400">
                                {format(parseISO(tx.date), "MMM d")}
                            </p>
                        </div>

                        {/* Amount */}
                        <p
                            className={`text-sm font-semibold ${
                                tx.type === "income"
                                    ? "text-emerald-400"
                                    : "text-rose-400"
                            }`}
                        >
                            {tx.type === "income" ? "+" : "-"}
                            {formatCurrency(tx.amount)}
                        </p>

                        {/* Delete */}
                        <button
                            onClick={() => deleteTransaction(tx.id)}
                            className="opacity-0 group-hover:opacity-100 transition p-2 rounded-lg hover:bg-red-500/10 text-zinc-400 hover:text-red-400"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentTransactions;
