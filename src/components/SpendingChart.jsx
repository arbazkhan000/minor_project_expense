import React from "react";
import { useBudget } from "../context/BudgetContext";

/* -------------------- Category Colors -------------------- */

const CATEGORY_COLORS = {
    "🍔 Food & Dining": "hsl(14, 89%, 55%)",
    "🚗 Transportation": "hsl(199, 89%, 48%)",
    "🏠 Housing": "hsl(262, 83%, 58%)",
    "🎬 Entertainment": "hsl(330, 81%, 60%)",
    "🛍️ Shopping": "hsl(35, 92%, 50%)",
    "💊 Healthcare": "hsl(142, 76%, 45%)",
    "📚 Education": "hsl(221, 83%, 53%)",
    "✈️ Travel": "hsl(174, 72%, 45%)",
    "💡 Utilities": "hsl(47, 95%, 50%)",
    "📱 Subscriptions": "hsl(280, 67%, 55%)",
};

/* -------------------- Component -------------------- */

const SpendingChart = () => {
    const { getExpensesByCategory, getTotalExpenses } = useBudget();

    const expenses = getExpensesByCategory();
    const total = getTotalExpenses();

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(amount);
    };

    if (expenses.length === 0) {
        return null;
    }

    /* --------- Calculate cumulative offsets --------- */
    let cumulativeOffset = 0;
    const segments = expenses.map((expense) => {
        const segment = {
            ...expense,
            offset: cumulativeOffset,
            color: CATEGORY_COLORS[expense.category] || "hsl(var(--muted))",
        };
        cumulativeOffset += expense.percentage;
        return segment;
    });

    return (
        <div className="card-surface rounded-2xl p-6 bg-black text-white">
            <h2 className="text-lg font-semibold text-foreground mb-6">
                Spending Breakdown
            </h2>

            <div className="flex flex-col lg:flex-row items-center gap-8">
                {/* Ring Chart */}
                <div className="relative w-48 h-48 flex-shrink-0">
                    <svg
                        className="w-full h-full transform -rotate-90"
                        viewBox="0 0 100 100"
                    >
                        {segments.map((segment, index) => {
                            const circumference = 2 * Math.PI * 40;
                            const strokeDasharray = `${
                                (segment.percentage / 100) * circumference
                            } ${circumference}`;
                            const strokeDashoffset =
                                -(segment.offset / 100) * circumference;

                            return (
                                <circle
                                    key={index}
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    fill="none"
                                    stroke={segment.color}
                                    strokeWidth="12"
                                    strokeDasharray={strokeDasharray}
                                    strokeDashoffset={strokeDashoffset}
                                    strokeLinecap="round"
                                    className="transition-all duration-500"
                                />
                            );
                        })}
                    </svg>

                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-2xl font-bold text-foreground">
                            {formatCurrency(total)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                            Total Spent
                        </span>
                    </div>
                </div>

                {/* Legend */}
                <div className="flex-1 space-y-3 w-full">
                    {segments.map((segment, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <div
                                className="w-3 h-3 rounded-full flex-shrink-0"
                                style={{ backgroundColor: segment.color }}
                            />

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between ">
                                    <span className="text-sm font-medium text-foreground truncate">
                                        {segment.category}
                                    </span>
                                    <span className="text-sm font-semibold text-foreground ml-2">
                                        {formatCurrency(segment.amount)}
                                    </span>
                                </div>

                                <div className="mt-1 h-2 bg-muted rounded-full overflow-hidden">
                                    <div
                                        className="h-full rounded-full transition-all duration-500"
                                        style={{
                                            width: `${segment.percentage}%`,
                                            backgroundColor: segment.color,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SpendingChart;
