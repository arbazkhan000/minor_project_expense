import React, { createContext, useContext, useReducer, useEffect } from "react";

const STORAGE_KEY = "budgetbuddy_transactions";
const BudgetContext = createContext(); // You forgot to define this in your snippet!

const initialState = {
    transactions: [],
    history: [],
    balance: 0,
};

// --- Helper Function ---
const calculateBalance = (transactions) => {
    return transactions.reduce((acc, curr) => {
        return curr.type === "income" ? acc + curr.amount : acc - curr.amount;
    }, 0);
};

const budgetReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TRANSACTION": {
            const newTransactions = [action.payload, ...state.transactions];
            return {
                ...state,
                transactions: newTransactions,
                balance: calculateBalance(newTransactions),
            };
        }
        case "DELETE_TRANSACTION": {
            const txToDelete = state.transactions.find(
                (t) => t.id === action.payload,
            );
            const newTransactions = state.transactions.filter(
                (t) => t.id !== action.payload,
            );

            // Only add to history if the transaction actually existed
            const newHistory = txToDelete
                ? [txToDelete, ...state.history]
                : state.history;

            return {
                ...state,
                transactions: newTransactions,
                history: newHistory,
                balance: calculateBalance(newTransactions),
            };
        }
        case "LOAD_TRANSACTIONS": {
            return {
                ...state,
                transactions: action.payload.transactions || [],
                history: action.payload.history || [],
                balance: calculateBalance(action.payload.transactions || []),
                isLoaded: true, // Mark as loaded so we don't save empty state
            };
        }
        default:
            return state;
    }
};

export const BudgetProvider = ({ children }) => {
    // We add an 'isLoaded' flag to prevent overwriting localStorage on first render
    const [state, dispatch] = useReducer(budgetReducer, {
        ...initialState,
        isLoaded: false,
    });

    // 1. Load from localStorage ONLY ONCE on mount
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                dispatch({ type: "LOAD_TRANSACTIONS", payload: parsed });
            } catch (err) {
                console.error("Failed to parse stored transactions", err);
                // Even on error, we should mark as loaded so the app works
                dispatch({ type: "LOAD_TRANSACTIONS", payload: initialState });
            }
        } else {
            // No data found? Just mark as loaded.
            dispatch({ type: "LOAD_TRANSACTIONS", payload: initialState });
        }
    }, []);

    // 2. Save to localStorage ONLY after data has loaded
    useEffect(() => {
        if (state.isLoaded) {
            // We strip 'isLoaded' before saving to keep JSON clean
            const { isLoaded, ...dataToSave } = state;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
        }
    }, [state]);

    const addTransaction = ({ type, amount, category, description }) => {
        const newTx = {
            id: crypto.randomUUID(),
            type, // Expecting 'income' or 'expense'
            amount: Number(amount),
            category,
            description,
            date: new Date().toISOString(),
        };
        dispatch({ type: "ADD_TRANSACTION", payload: newTx });
    };

    const deleteTransaction = (id) => {
        dispatch({ type: "DELETE_TRANSACTION", payload: id });
    };
    const getTotalIncome = () => {
        return state.transactions
            .filter((t) => t.type === "income")
            .reduce((acc, t) => acc + t.amount, 0);
    };

    const getTotalExpenses = () => {
        return state.transactions
            .filter((t) => t.type === "expense")
            .reduce((acc, t) => acc + t.amount, 0);
    };
    const getExpensesByCategory = () => {
        // 1. Filter only expenses
        const expenses = state.transactions.filter((t) => t.type === "expense");

        // 2. Group by category and sum amounts
        const categoryMap = expenses.reduce((acc, t) => {
            const currentTotal = acc[t.category] || 0;
            acc[t.category] = currentTotal + t.amount;
            return acc;
        }, {});

        // 3. Convert to an array for easy mapping in the UI
        // Returns: [{ category: "Food", amount: 500 }, { category: "Rent", amount: 1000 }]
        return Object.entries(categoryMap).map(([category, amount]) => ({
            category,
            amount,
        }));
    };

    return (
        <BudgetContext.Provider
            value={{
                state,
                addTransaction,
                deleteTransaction,
                getTotalIncome,
                getTotalExpenses,
                getExpensesByCategory,
            }}
        >
            {children}
        </BudgetContext.Provider>
    );
};

export const useBudget = () => useContext(BudgetContext);
