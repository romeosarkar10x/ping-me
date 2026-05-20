import { useMemo } from "react";

/* ═══════════════════════════════════════════════════════════════
   NORSE BACKGROUND — Animated floating relic images
   Uses transparent PNGs from /relics/ drifting through the scene
   ═══════════════════════════════════════════════════════════════ */

const RELICS = [
    { src: "relics/mjolnir.png", alt: "Mjolnir" },
    { src: "relics/viking_axe.png", alt: "Viking Axe" },
    { src: "relics/viking_shield.png", alt: "Viking Shield" },
    { src: "relics/valknut.png", alt: "Valknut" },
    { src: "relics/rune_stone.png", alt: "Rune Stone" },
    { src: "relics/sword.png", alt: "Sword" },
    { src: "relics/helm.png", alt: "Helm" },

    { src: "relics/spear.png", alt: "Spear" },
];

const ANIM_NAMES = ["norseDrift1", "norseDrift2", "norseDrift3", "norseDrift4", "norseDrift5"];

type Piece = {
    id: number;
    relicIndex: number;
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
        seed = (seed * 16807 + 0) % 2147483647;
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
        const size = 7 + rand() * 9; // 7–16 rem
        const rotation = rand() * 360 - 180;
        const opacity = 0.18 + rand() * 0.17; // 18%–35%
        const animName = ANIM_NAMES[Math.floor(rand() * ANIM_NAMES.length)];
        const animDuration = 20 + rand() * 28; // 20–48s
        const animDelay = rand() * -30; // negative → starts mid-cycle

        pieces.push({
            id: i,
            relicIndex: Math.floor(rand() * RELICS.length),
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

            {/* Floating relic images */}
            {pieces.map((piece) => {
                const relic = RELICS[piece.relicIndex];
                return (
                    <div
                        key={piece.id}
                        className="norse-bg-piece"
                        style={{
                            left: `${piece.x}%`,
                            top: `${piece.y}%`,
                            width: `${piece.size}rem`,
                            height: `${piece.size}rem`,
                            opacity: piece.opacity,
                            ["--start-rot" as string]: `${piece.rotation}deg`,
                            ["--base-opacity" as string]: piece.opacity,
                            animationName: piece.animName,
                            animationDuration: `${piece.animDuration}s`,
                            animationDelay: `${piece.animDelay}s`,
                            animationTimingFunction: "ease-in-out",
                            animationIterationCount: "infinite",
                        }}
                    >
                        <img
                            src={`${relic.src}`}
                            alt=""
                            className="w-full h-full object-contain dark:brightness-75 dark:sepia dark:hue-rotate-15 transition-[filter] duration-500"
                            loading="lazy"
                            draggable={false}
                        />
                    </div>
                );
            })}

            {/* Subtle vignette to keep center clear for content */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--tw-gradient-stops))] to-[#f5f0e6]/60 dark:to-rune-950/70" />
        </div>
    );
}
