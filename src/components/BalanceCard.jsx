import React from "react";
import { useBudget } from "../context/BudgetContext";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";

const BalanceCard = () => {
    const { state, getTotalIncome, getTotalExpenses } = useBudget();

    const totalIncome = getTotalIncome();
    const totalExpenses = getTotalExpenses();

    const formatCurrency = (amount) =>
        new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(amount);

    return (
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 via-zinc-900 to-black p-6 sm:p-8 shadow-2xl">
            {/* Glow Effects */}
            <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />

            <div className="relative z-10 space-y-6">
                {/* Header */}
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10">
                        <Wallet className="h-5 w-5 text-white/80" />
                    </div>
                    <div>
                        <p className="text-xs uppercase tracking-wide text-zinc-400">
                            Total Balance
                        </p>
                        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                            {formatCurrency(state.balance)}
                        </h1>
                    </div>
                </div>

                {/* Income & Expense */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Income */}
                    <div className="rounded-2xl bg-white/5 border border-white/10 p-4 backdrop-blur transition hover:bg-white/10">
                        <div className="flex items-center gap-3 mb-1">
                            <div className="h-9 w-9 rounded-xl bg-emerald-500/15 flex items-center justify-center">
                                <TrendingUp className="h-4 w-4 text-emerald-400" />
                            </div>
                            <span className="text-sm text-zinc-400">
                                Income
                            </span>
                        </div>
                        <p className="text-xl font-semibold text-white">
                            {formatCurrency(totalIncome)}
                        </p>
                    </div>

                    {/* Expense */}
                    <div className="rounded-2xl bg-white/5 border border-white/10 p-4 backdrop-blur transition hover:bg-white/10">
                        <div className="flex items-center gap-3 mb-1">
                            <div className="h-9 w-9 rounded-xl bg-rose-500/15 flex items-center justify-center">
                                <TrendingDown className="h-4 w-4 text-rose-400" />
                            </div>
                            <span className="text-sm text-zinc-400">
                                Expenses
                            </span>
                        </div>
                        <p className="text-xl font-semibold text-white">
                            {formatCurrency(totalExpenses)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BalanceCard;
