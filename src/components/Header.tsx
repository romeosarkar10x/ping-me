import { MdDarkMode, MdLightMode } from "react-icons/md";

const VERSION = "0.0.0";

type HeaderProps = {
    isDark: boolean;
    onToggle: () => void;
};

export function Header({ isDark, onToggle }: HeaderProps) {
    return (
        <header className="sticky top-0 z-50 border-b border-gold-400/15 dark:border-gold-500/10 bg-[#f5f0e6]/85 dark:bg-rune-950/80 backdrop-blur-xl transition-colors duration-500">
            <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* ─── Brand Mark ─── */}
                <div className="flex items-center gap-3">
                    {/* Valknut-inspired triple ping */}
                    <div className="relative flex items-center justify-center w-8 h-8">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-20 animate-ping" />
                        <span
                            className="absolute inline-flex h-5 w-5 rounded-full bg-gold-400 opacity-10 animate-ping"
                            style={{ animationDelay: "0.4s" }}
                        />
                        <span className="relative inline-flex h-3 w-3 rounded-full bg-gradient-to-br from-gold-300 to-gold-600 shadow-[0_0_12px_rgba(212,169,52,0.5)]" />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-[var(--font-norse)] text-lg font-bold tracking-wider text-gold-800 dark:text-gold-300 select-none leading-tight">
                            PING.ME
                        </span>
                        <span className="font-[var(--font-body)] text-[10px] text-gold-600/60 dark:text-gold-400/40 tracking-[0.3em] uppercase leading-none select-none">
                            Hall of Echoes
                        </span>
                    </div>
                </div>

                {/* ─── Controls ─── */}
                <div className="flex items-center gap-3">
                    <span className="font-[var(--font-norse)] text-xs px-2.5 py-1 rounded-md border border-gold-500/20 dark:border-gold-500/15 text-gold-700 dark:text-gold-400 bg-gold-400/5 select-none tracking-wider">
                        v{VERSION}
                    </span>
                    <button
                        onClick={onToggle}
                        aria-label={isDark ? "Summon the dawn" : "Call the night"}
                        title={isDark ? "Summon the Dawn" : "Call the Night"}
                        className="norse-btn norse-btn-ghost w-9 h-9 flex items-center justify-center rounded-lg text-gold-700 dark:text-gold-400"
                    >
                        {isDark ? (
                            <MdLightMode className="w-4.5 h-4.5" />
                        ) : (
                            <MdDarkMode className="w-4.5 h-4.5" />
                        )}
                    </button>
                </div>
            </div>
        </header>
    );
}
