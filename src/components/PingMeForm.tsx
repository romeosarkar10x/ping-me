import { useState } from "react";
import { NorseSeparator } from "./NorseSeparator";

type Level = "critical" | "high" | "intermediate" | "casual" | "minimal";

const LEVELS: {
    id: Level;
    label: string;
    norseName: string;
    dot: string;
    pill: string;
    activePill: string;
}[] = [
    {
        id: "critical",
        label: "Critical",
        norseName: "Ragnarök",
        dot: "bg-[#dc3545]",
        pill: "border-[#dc3545]/20 text-[#dc3545] dark:text-[#ff6b7a] hover:border-[#dc3545]/50 hover:bg-[#dc3545]/8",
        activePill:
            "border-[#dc3545]/60 bg-[#dc3545]/15 text-[#dc3545] dark:text-[#ff8a95] shadow-[inset_0_1px_0_rgba(220,53,69,0.2),0_2px_8px_rgba(220,53,69,0.15)]",
    },
    {
        id: "high",
        label: "High",
        norseName: "Berserker",
        dot: "bg-[#e07020]",
        pill: "border-[#e07020]/20 text-[#e07020] dark:text-[#f0a060] hover:border-[#e07020]/50 hover:bg-[#e07020]/8",
        activePill:
            "border-[#e07020]/60 bg-[#e07020]/15 text-[#e07020] dark:text-[#f0b080] shadow-[inset_0_1px_0_rgba(224,112,32,0.2),0_2px_8px_rgba(224,112,32,0.15)]",
    },
    {
        id: "intermediate",
        label: "Intermediate",
        norseName: "Einherjar",
        dot: "bg-gold-400",
        pill: "border-gold-500/20 text-gold-600 dark:text-gold-400 hover:border-gold-500/50 hover:bg-gold-500/8",
        activePill:
            "border-gold-500/60 bg-gold-500/15 text-gold-600 dark:text-gold-300 shadow-[inset_0_1px_0_rgba(212,169,52,0.2),0_2px_8px_rgba(212,169,52,0.15)]",
    },
    {
        id: "casual",
        label: "Casual",
        norseName: "Skáld",
        dot: "bg-[#4a9e6a]",
        pill: "border-[#4a9e6a]/20 text-[#4a9e6a] dark:text-[#6abf8a] hover:border-[#4a9e6a]/50 hover:bg-[#4a9e6a]/8",
        activePill:
            "border-[#4a9e6a]/60 bg-[#4a9e6a]/15 text-[#4a9e6a] dark:text-[#8ad0a0] shadow-[inset_0_1px_0_rgba(74,158,106,0.2),0_2px_8px_rgba(74,158,106,0.15)]",
    },
    {
        id: "minimal",
        label: "Minimal",
        norseName: "Whisper",
        dot: "bg-frost-500",
        pill: "border-frost-500/20 text-frost-500 dark:text-frost-400 hover:border-frost-500/50 hover:bg-frost-500/8",
        activePill:
            "border-frost-500/60 bg-frost-500/15 text-frost-500 dark:text-frost-300 shadow-[inset_0_1px_0_rgba(88,137,187,0.2),0_2px_8px_rgba(88,137,187,0.15)]",
    },
];

type FormState = { name: string; level: Level; message: string };

const EMPTY: FormState = { name: "", level: "casual", message: "" };

export function PingMeForm() {
    const [form, setForm] = useState<FormState>(EMPTY);
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);

    const selectedLevel = LEVELS.find((l) => l.id === form.level)!;

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!form.name.trim() || !form.message.trim()) return;
        setSending(true);
        setTimeout(() => {
            setSending(false);
            setSent(true);
        }, 1200);
    }

    function handleReset() {
        setForm(EMPTY);
        setSent(false);
    }

    /* ═══════════════════════════════════════════════════════════
       SUCCESS STATE — Ping Sent
       ═══════════════════════════════════════════════════════════ */
    if (sent) {
        return (
            <div className="w-full max-w-xl rune-reveal">
                <div className="card-glow relative rounded-2xl border border-gold-500/20 dark:border-gold-500/10 bg-[#f9f5ec]/90 dark:bg-rune-950/80 backdrop-blur-xl shadow-2xl dark:shadow-gold-900/20 p-10 text-center overflow-hidden">
                    {/* Background glow */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-gold-400/8 via-transparent to-transparent" />

                    <div className="relative z-10 flex flex-col items-center gap-5">
                        {/* Shield emblem */}
                        <div className="relative flex items-center justify-center w-20 h-20">
                            <span className="absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-15 shield-pulse" />
                            <span
                                className="absolute inline-flex h-14 w-14 rounded-full bg-gold-400 opacity-10 shield-pulse"
                                style={{ animationDelay: "0.5s" }}
                            />
                            <div className="relative w-10 h-10 rounded-full bg-linear-to-br from-gold-300 via-gold-500 to-gold-700 flex items-center justify-center shadow-[0_0_20px_rgba(212,169,52,0.4)]">
                                <span className="text-rune-950 text-lg font-bold">ᚦ</span>
                            </div>
                        </div>

                        <div>
                            <p className="font-(--font-norse) text-2xl text-gold-800 dark:text-gold-300 mb-2 tracking-wider">
                                Ping Dispatched!
                            </p>
                            <p className="font-(--font-body) text-sm text-gold-700/70 dark:text-gold-400/60 leading-relaxed">
                                <span className="font-semibold text-gold-800 dark:text-gold-300">{form.name}</span>
                                {"'s "}
                                <span
                                    className={`norse-pill norse-pill--active inline-flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-md border ${selectedLevel.activePill}`}
                                >
                                    <span
                                        className={`norse-pill__dot inline-block w-1.5 h-1.5 rounded-full ${selectedLevel.dot}`}
                                    />
                                    {selectedLevel.norseName}
                                </span>{" "}
                                raven carries the message across the realms.
                            </p>
                        </div>

                        <NorseSeparator />

                        <button
                            onClick={handleReset}
                            className="norse-btn norse-btn-ghost rounded-xl px-6 py-2.5 text-sm text-gold-700 dark:text-gold-400 tracking-wider"
                        >
                            Send Another Raven
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    /* ═══════════════════════════════════════════════════════════
       FORM STATE
       ═══════════════════════════════════════════════════════════ */
    return (
        <div className="w-full max-w-xl">
            <div className="card-glow relative rounded-2xl border border-gold-500/15 dark:border-gold-500/10 bg-[#f9f5ec]/90 dark:bg-rune-950/80 backdrop-blur-xl shadow-2xl dark:shadow-gold-900/20 overflow-hidden">
                {/* Top glow */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,var(--tw-gradient-stops))] from-gold-400/8 via-transparent to-transparent pointer-events-none" />

                {/* Decorative corner runes */}
                <div
                    className="absolute top-3 left-4 font-(--font-norse-decorative) text-gold-400/10 dark:text-gold-400/8 text-2xl select-none pointer-events-none"
                    aria-hidden="true"
                >
                    ᛟ
                </div>
                <div
                    className="absolute top-3 right-4 font-(--font-norse-decorative) text-gold-400/10 dark:text-gold-400/8 text-2xl select-none pointer-events-none"
                    aria-hidden="true"
                >
                    ᚠ
                </div>

                <div className="relative z-10 p-8 pt-10">
                    {/* Title */}
                    <div className="mb-2 text-center">
                        <h1 className="font-(--font-norse-decorative) text-3xl text-gold-800 dark:text-gold-300 tracking-wider">
                            Ping Me
                        </h1>
                        <p className="mt-2 font-(--font-body) text-sm text-gold-700/60 dark:text-gold-400/50 italic">
                            Whisper into the void — your message shall echo through the sacred halls.
                        </p>
                    </div>

                    <div className="my-6">
                        <NorseSeparator />
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        {/* ─── Name Field ─── */}
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-semibold text-gold-700/80 dark:text-gold-400/60 uppercase tracking-[0.2em]">
                                Your Name
                            </label>
                            <input
                                id="field-name"
                                type="text"
                                placeholder="e.g. Ragnar"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                required
                                className="norse-input w-full px-4 py-3 rounded-xl border border-gold-400/20 dark:border-gold-500/10 bg-[#f5f0e6]/60 dark:bg-rune-900/40 text-gold-900 dark:text-gold-100 placeholder-gold-400/40 dark:placeholder-gold-500/25 text-sm focus:outline-none focus:border-gold-500/50 transition-all duration-300"
                            />
                        </div>

                        {/* ─── Signal Level ─── */}
                        <div className="flex flex-col gap-2.5">
                            <label className="text-xs font-semibold text-gold-700/80 dark:text-gold-400/60 uppercase tracking-[0.2em]">
                                Signal Level
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {LEVELS.map((level) => (
                                    <button
                                        key={level.id}
                                        type="button"
                                        onClick={() => setForm({ ...form, level: level.id })}
                                        className={`norse-pill inline-flex items-center gap-1.5 text-xs px-3.5 py-2 rounded-lg border transition-all duration-250 cursor-pointer tracking-wide ${
                                            form.level === level.id
                                                ? `norse-pill--active ${level.activePill}`
                                                : level.pill
                                        }`}
                                    >
                                        <span
                                            className={`norse-pill__dot inline-block w-2 h-2 rounded-full transition-shadow duration-300 ${level.dot}`}
                                        />
                                        {level.norseName}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* ─── Message ─── */}
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-semibold text-gold-700/80 dark:text-gold-400/60 uppercase tracking-[0.2em]">
                                Message
                            </label>
                            <textarea
                                id="field-message"
                                placeholder="Speak, warrior. What words do you carry?"
                                value={form.message}
                                onChange={(e) => setForm({ ...form, message: e.target.value })}
                                required
                                rows={4}
                                className="norse-input w-full px-4 py-3 rounded-xl border border-gold-400/20 dark:border-gold-500/10 bg-[#f5f0e6]/60 dark:bg-rune-900/40 text-gold-900 dark:text-gold-100 placeholder-gold-400/40 dark:placeholder-gold-500/25 text-sm focus:outline-none focus:border-gold-500/50 resize-none transition-all duration-300"
                            />
                        </div>

                        <div className="my-1">
                            <NorseSeparator />
                        </div>

                        {/* ─── Submit ─── */}
                        <button
                            id="btn-send"
                            type="submit"
                            disabled={sending}
                            className="norse-btn norse-btn-primary send-btn-glow w-full py-3.5 rounded-xl text-sm font-bold tracking-[0.15em] uppercase disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98]"
                        >
                            {sending ? (
                                <span className="flex items-center justify-center gap-2.5">
                                    <span className="relative flex h-2.5 w-2.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rune-950 opacity-50" />
                                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rune-950" />
                                    </span>
                                    Sending Raven...
                                </span>
                            ) : (
                                "⟡ Send Ping ⟡"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
