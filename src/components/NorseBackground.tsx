import { useMemo } from "react";

/* ═══════════════════════════════════════════════════════════════
   NORSE BACKGROUND — Floating Norse symbols
   Runic glyphs drifting gently through the scene. Pure text —
   no images — so the symbols stay crisp at any size.
   ═══════════════════════════════════════════════════════════════ */

// Elder Futhark runes + Gar and the runic cross
const SYMBOLS = "ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛝᛞᛟᚸ᛭";

const ANIM_NAMES = ["norseDrift1", "norseDrift2", "norseDrift3", "norseDrift4", "norseDrift5"];

type Piece = {
    id: number;
    glyph: string;
    x: number;
    y: number;
    size: number; // rem
    rotation: number;
    opacity: number;
    animName: string;
    animDuration: number;
    animDelay: number;
};

function generatePieces(count: number): Piece[] {
    const pieces: Piece[] = [];

    // Seeded PRNG for consistent layout across renders
    let seed = 13;
    function rand() {
        seed = (seed * 16807) % 2147483647;
        return (seed - 1) / 2147483646;
    }

    // Distribute across a grid with jitter to avoid overlap
    const cols = 6;
    const rows = Math.ceil(count / cols);
    const cellW = 100 / cols;
    const cellH = 100 / rows;

    for (let i = 0; i < count; i++) {
        const row = Math.floor(i / cols);
        const col = i % cols;

        const x = col * cellW + rand() * cellW * 0.65 + cellW * 0.12;
        const y = row * cellH + rand() * cellH * 0.55 + cellH * 0.18;
        const size = 2.5 + rand() * 5; // 2.5–7.5 rem
        const rotation = rand() * 360 - 180;
        const opacity = 0.1 + rand() * 0.16; // 10%–26%
        const animName = ANIM_NAMES[Math.floor(rand() * ANIM_NAMES.length)];
        const animDuration = 20 + rand() * 28; // 20–48s
        const animDelay = rand() * -30; // negative → starts mid-cycle

        pieces.push({
            id: i,
            glyph: SYMBOLS[Math.floor(rand() * SYMBOLS.length)],
            x,
            y,
            size,
            rotation,
            opacity,
            animName,
            animDuration,
            animDelay,
        });
    }

    return pieces;
}

export function NorseBackground({ count = 30 }: { count?: number }) {
    const pieces = useMemo(() => generatePieces(count), [count]);

    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
            {/* Radial gradient base */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-gold-400/5 via-transparent to-transparent dark:from-gold-400/3" />

            {/* Floating Norse symbols */}
            {pieces.map((piece) => (
                <span
                    key={piece.id}
                    className="norse-bg-piece select-none text-gold-700 dark:text-gold-400"
                    style={{
                        left: `${piece.x}%`,
                        top: `${piece.y}%`,
                        fontSize: `${piece.size}rem`,
                        lineHeight: 1,
                        fontFamily: "var(--font-norse-decorative)",
                        opacity: piece.opacity,
                        textShadow: "0 0 16px rgba(212, 169, 52, 0.4)",
                        ["--start-rot" as string]: `${piece.rotation}deg`,
                        ["--base-opacity" as string]: piece.opacity,
                        animationName: piece.animName,
                        animationDuration: `${piece.animDuration}s`,
                        animationDelay: `${piece.animDelay}s`,
                        animationTimingFunction: "ease-in-out",
                        animationIterationCount: "infinite",
                    }}
                >
                    {piece.glyph}
                </span>
            ))}

            {/* Subtle vignette to keep center clear for content */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--tw-gradient-stops))] to-[#f5f0e6]/35 dark:to-rune-950/45" />
        </div>
    );
}
