import { useState } from "react";

type Level = "critical" | "high" | "intermediate" | "casual" | "minimal";

const LEVELS: { id: Level; label: string; dot: string; pill: string; activePill: string }[] = [
    {
        id: "critical",
        label: "Critical",
        dot: "bg-rose-500",
        pill: "border-rose-500/20 text-rose-400 dark:text-rose-400 hover:border-rose-500/50 hover:bg-rose-500/8",
        activePill: "border-rose-500/60 bg-rose-500/12 text-rose-400 dark:text-rose-300",
    },
    {
        id: "high",
        label: "High",
        dot: "bg-orange-400",
        pill: "border-orange-500/20 text-orange-400 hover:border-orange-500/50 hover:bg-orange-500/8",
        activePill: "border-orange-500/60 bg-orange-500/12 text-orange-400 dark:text-orange-300",
    },
    {
        id: "intermediate",
        label: "Intermediate",
        dot: "bg-amber-400",
        pill: "border-amber-500/20 text-amber-500 dark:text-amber-400 hover:border-amber-500/50 hover:bg-amber-500/8",
        activePill: "border-amber-500/60 bg-amber-500/12 text-amber-500 dark:text-amber-300",
    },
    {
        id: "casual",
        label: "Casual",
        dot: "bg-emerald-400",
        pill: "border-emerald-500/20 text-emerald-500 dark:text-emerald-400 hover:border-emerald-500/50 hover:bg-emerald-500/8",
        activePill: "border-emerald-500/60 bg-emerald-500/12 text-emerald-500 dark:text-emerald-300",
    },
    {
        id: "minimal",
        label: "Minimal",
        dot: "bg-sky-400",
        pill: "border-sky-500/20 text-sky-500 dark:text-sky-400 hover:border-sky-500/50 hover:bg-sky-500/8",
        activePill: "border-sky-500/60 bg-sky-500/12 text-sky-500 dark:text-sky-300",
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

    if (sent) {
        return (
            <div className="w-full max-w-xl">
                <div className="relative rounded-2xl border border-violet-500/20 dark:border-violet-500/15 bg-white dark:bg-[#0c0c1e] shadow-xl dark:shadow-violet-950/40 p-10 text-center overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-violet-500/5 via-transparent to-transparent" />
                    <div className="relative z-10 flex flex-col items-center gap-5">
                        <div className="relative flex items-center justify-center w-16 h-16">
                            <span className="absolute inline-flex h-full w-full rounded-full bg-violet-500 opacity-20 animate-ping" />
                            <span
                                className="absolute inline-flex h-10 w-10 rounded-full bg-violet-500 opacity-10 animate-ping"
                                style={{ animationDelay: "0.3s" }}
                            />
                            <span className="relative inline-flex h-6 w-6 rounded-full bg-violet-500" />
                        </div>
                        <div>
                            <p className="font-mono text-xl font-bold text-slate-900 dark:text-white mb-1">
                                Ping sent!
                            </p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                <span className="font-medium text-slate-700 dark:text-slate-300">{form.name}</span>'s{" "}
                                <span
                                    className={`inline-flex items-center gap-1 font-mono text-xs px-1.5 py-0.5 rounded border ${selectedLevel.activePill}`}
                                >
                                    <span className={`inline-block w-1.5 h-1.5 rounded-full ${selectedLevel.dot}`} />
                                    {selectedLevel.label}
                                </span>{" "}
                                message is on its way.
                            </p>
                        </div>
                        <button
                            onClick={handleReset}
                            className="mt-2 font-mono text-sm px-5 py-2 rounded-lg border border-violet-500/30 text-violet-500 dark:text-violet-400 hover:bg-violet-500/8 transition-all duration-200 cursor-pointer"
                        >
                            send another ping
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-xl">
            <div className="relative rounded-2xl border border-slate-200 dark:border-violet-500/15 bg-white dark:bg-[#0c0c1e] shadow-xl dark:shadow-violet-950/30 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,var(--tw-gradient-stops))] from-violet-500/5 via-transparent to-transparent pointer-events-none" />

                <div className="relative z-10 p-8">
                    <div className="mb-7">
                        <h1 className="font-mono text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                            Ping me
                        </h1>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-500">
                            Drop a message. I'll hear it loud and clear.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <div className="flex flex-col gap-1.5">
                            <label className="font-mono text-xs font-medium text-slate-500 dark:text-slate-500 uppercase tracking-wider">
                                your name
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. Alex"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                required
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700/60 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 text-sm focus:outline-none focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/15 transition-all duration-200"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="font-mono text-xs font-medium text-slate-500 dark:text-slate-500 uppercase tracking-wider">
                                signal level
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {LEVELS.map((level) => (
                                    <button
                                        key={level.id}
                                        type="button"
                                        onClick={() => setForm({ ...form, level: level.id })}
                                        className={`inline-flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 rounded-lg border transition-all duration-150 cursor-pointer ${
                                            form.level === level.id ? level.activePill : level.pill
                                        }`}
                                    >
                                        <span className={`inline-block w-1.5 h-1.5 rounded-full ${level.dot}`} />
                                        {level.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="font-mono text-xs font-medium text-slate-500 dark:text-slate-500 uppercase tracking-wider">
                                message
                            </label>
                            <textarea
                                placeholder="What's on your mind?"
                                value={form.message}
                                onChange={(e) => setForm({ ...form, message: e.target.value })}
                                required
                                rows={4}
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700/60 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 text-sm focus:outline-none focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/15 resize-none transition-all duration-200"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={sending}
                            className="relative mt-1 w-full py-3 rounded-xl font-mono text-sm font-semibold text-white bg-violet-600 hover:bg-violet-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30 active:scale-[0.98] cursor-pointer overflow-hidden"
                        >
                            {sending ? (
                                <span className="flex items-center justify-center gap-2">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-60" />
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                                    </span>
                                    pinging...
                                </span>
                            ) : (
                                "send ping →"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
