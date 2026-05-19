import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { PingMeForm } from "./components/PingMeForm";

function App() {
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [isDark]);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#050510] transition-colors duration-300">
            <Header isDark={isDark} onToggle={() => setIsDark((d) => !d)} />
            <main className="flex items-center justify-center px-4 py-16">
                <PingMeForm />
            </main>
        </div>
    );
}

export default App;
