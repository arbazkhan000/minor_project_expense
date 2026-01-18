import React, { useState } from "react";
import { useBudget } from "../context/BudgetContext";
import  Button  from "./ui/Button";
import Input  from "../components/ui/Input";
import { Plus, Minus } from "lucide-react";

/* -------------------- Categories -------------------- */

const EXPENSE_CATEGORIES = [
    "🍔 Food & Dining",
    "🚗 Transportation",
    "🏠 Housing",
    "🎬 Entertainment",
    "🛍️ Shopping",
    "💊 Healthcare",
    "📚 Education",
    "✈️ Travel",
    "💡 Utilities",
    "📱 Subscriptions",
];

const INCOME_CATEGORIES = [
    "💼 Salary",
    "💰 Freelance",
    "📈 Investments",
    "🎁 Gifts",
    "💵 Other Income",
];

/* -------------------- Component -------------------- */

const AddTransaction = () => {
    const { addTransaction } = useBudget();

    const [type, setType] = useState("expense");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [isExpanded, setIsExpanded] = useState(false);

    const categories =
        type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!amount || !category) return;

        addTransaction({
            type,
            amount: parseFloat(amount),
            category,
            description,
        });

        setAmount("");
        setCategory("");
        setDescription("");
        setIsExpanded(false);
    };

    return (
        <div className="card-surface rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-foreground">
                    Add Transaction
                </h2>

                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground transition-transform hover:scale-105 active:scale-95"
                >
                    <Plus
                        className={`w-5 h-5 transition-transform ${
                            isExpanded ? "rotate-45" : ""
                        }`}
                    />
                </button>
            </div>

            {isExpanded && (
                <form
                    onSubmit={handleSubmit}
                    className="space-y-5 animate-in fade-in slide-in-from-top-2 duration-300"
                >
                    {/* Type Toggle */}
                    <div className="flex gap-2 p-1 bg-muted rounded-xl">
                        <button
                            type="button"
                            onClick={() => {
                                setType("expense");
                                setCategory("");
                            }}
                            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                                type === "expense"
                                    ? "bg-rose-500 text-white shadow-lg"
                                    : "text-muted-foreground hover:text-foreground"
                            }`}
                        >
                            <Minus className="w-4 h-4" />
                            Expense
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                setType("income");
                                setCategory("");
                            }}
                            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                                type === "income"
                                    ? "bg-emerald-500 text-white shadow-lg"
                                    : "text-muted-foreground hover:text-foreground"
                            }`}
                        >
                            <Plus className="w-4 h-4" />
                            Income
                        </button>
                    </div>

                    {/* Amount */}
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-semibold text-muted-foreground">
                            $
                        </span>
                        <Input
                            type="number"
                            placeholder="0.00"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="pl-10 text-2xl font-semibold h-16 rounded-xl border-2 border-border focus:border-primary"
                            step="0.01"
                            min="0"
                            required
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="text-sm font-medium text-muted-foreground mb-3 block">
                            Category
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    type="button"
                                    onClick={() => setCategory(cat)}
                                    className={`px-4 py-2 rounded-full border-white text-sm font-medium transition-all ${
                                        category === cat
                                            ? "bg-primary text-primary-foreground shadow-md"
                                            : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Description */}
                    <Input
                        placeholder="Add a note (optional)"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="h-12 rounded-xl"
                    />

                    {/* Submit */}
                    <Button
                        type="submit"
                        className="w-full h-14 rounded-xl text-lg font-semibold"
                        disabled={!amount || !category}
                    >
                        Add {type === "income" ? "Income" : "Expense"}
                    </Button>
                </form>
            )}
        </div>
    );
};

export default AddTransaction;
