import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { PingMeForm } from "./components/PingMeForm";
import { RuneParticles } from "./components/RuneParticles";
import { NorseBackground } from "./components/NorseBackground";
import Footer from "./components/Footer";

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
        <div className="w-full h-full relative transition-colors duration-500">
            {/* ─── Base color ─── */}
            <div className="fixed inset-0 -z-10 bg-[#f5f0e6] dark:bg-rune-950 transition-colors duration-500" />

            {/* ─── SVG Norse background pieces ─── */}
            <NorseBackground />

            {/* ─── Floating rune particles ─── */}
            <RuneParticles count={40} />

            {/* ─── Content ─── */}
            <div className="h-full w-full relative z-10 flex flex-col justify-between">
                <Header isDark={isDark} onToggle={() => setIsDark((d) => !d)} />
                <main className="flex items-center justify-center">
                    <PingMeForm />
                </main>
                <Footer />
            </div>
        </div>
    );
}

export default App;
