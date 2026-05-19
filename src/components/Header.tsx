import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
const VERSION = "0.0.0";

type HeaderProps = {
    isDark: boolean;
    onToggle: () => void;
};

export function Header({ isDark, onToggle }: HeaderProps) {
    return (
        <header className="sticky top-0 z-50 border-b border-violet-500/10 dark:border-violet-500/15 bg-white/80 dark:bg-[#050510]/85 backdrop-blur-md">
            <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                    <div className="relative flex items-center justify-center w-5 h-5">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-violet-500 opacity-30 animate-ping" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-violet-400" />
                    </div>
                    <span className="text-violet-500 font-mono text-lg font-bold tracking-tight dark:text-white select-none">
                        Ping.me
                    </span>
                </div>

                <div className="flex items-center gap-3">
                    <span className="font-mono text-xs px-2 py-0.5 rounded-md border border-violet-500/25 text-violet-500 dark:text-violet-400 bg-violet-500/5 select-none">
                        v{VERSION}
                    </span>
                    <button
                        onClick={onToggle}
                        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                        className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700/80 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-700 dark:hover:text-slate-200 transition-all duration-200 cursor-pointer"
                    >
                        {isDark ? <MdLightMode /> : <MdDarkMode />}
                    </button>
                </div>
            </div>
        </header>
    );
}
