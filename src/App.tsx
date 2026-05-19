import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { PingMeForm } from "./components/PingMeForm";
import { RuneParticles } from "./components/RuneParticles";
import { NorseBackground } from "./components/NorseBackground";

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
        <div className="min-h-screen relative transition-colors duration-500">
            {/* ─── Base color ─── */}
            <div className="fixed inset-0 -z-10 bg-[#f5f0e6] dark:bg-rune-950 transition-colors duration-500" />

            {/* ─── SVG Norse background pieces ─── */}
            <NorseBackground />

            {/* ─── Floating rune particles ─── */}
            <RuneParticles count={40} />

            {/* ─── Content ─── */}
            <div className="relative z-10">
                <Header isDark={isDark} onToggle={() => setIsDark((d) => !d)} />
                <main className="flex items-center justify-center px-4 py-16 min-h-[calc(100vh-4rem)]">
                    <PingMeForm />
                </main>

                {/* Footer flavor text */}
                <footer className="relative z-10 text-center pb-6">
                    <p className="font-[var(--font-body)] text-xs text-gold-700/30 dark:text-gold-400/20 italic tracking-wide">
                        Forged in the fires of Muspelheim · Carried by Odin's ravens
                    </p>
                </footer>
            </div>
        </div>
    );
}

export default App;
