// import { BudgetProvider } from "./contexts/BudgetContext";

import { List, Stars } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    return (
        <div className=" bg-background">
            <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/60 border-b border-white/10">
                <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
                    {/* Logo */}

                    <Link to="/">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center">
                                <Stars className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold tracking-tight">
                                    BudgetBuddy
                                </h1>
                                <p className="text-xs text-zinc-400">
                                    Smart expense tracking
                                </p>
                            </div>
                        </div>
                    </Link>

                    {/* Transaction Button */}
                    <button
                        onClick={() => navigate("/transactions")}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm font-medium hover:bg-white/20 transition"
                    >
                        {/* <Link to="/transactions"> */}
                        <List className="w-4 h-4" />
                        {/* </Link> */}
                        Transactions
                    </button>
                </div>
            </header>
        </div>
    );
};

export default Header;
