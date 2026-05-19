import { useMemo } from "react";

/**
 * Floating runic glyphs that drift upward like embers from Muspelheim.
 * Pure CSS animation — no JS runtime cost after mount.
 */

const ELDER_FUTHARK = "ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛝᛞᛟ";

type Particle = {
    id: number;
    char: string;
    left: number;      // percentage
    size: number;       // rem
    duration: number;   // seconds
    delay: number;      // seconds
};

function generateParticles(count: number): Particle[] {
    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
        particles.push({
            id: i,
            char: ELDER_FUTHARK[Math.floor(Math.random() * ELDER_FUTHARK.length)],
            left: Math.random() * 100,
            size: 0.8 + Math.random() * 1.8,
            duration: 15 + Math.random() * 25,
            delay: Math.random() * 20,
        });
    }
    return particles;
}

export function RuneParticles({ count = 18 }: { count?: number }) {
    const particles = useMemo(() => generateParticles(count), [count]);

    return (
        <>
            {particles.map((p) => (
                <span
                    key={p.id}
                    className="rune-particle"
                    style={{
                        left: `${p.left}%`,
                        fontSize: `${p.size}rem`,
                        animationDuration: `${p.duration}s`,
                        animationDelay: `${p.delay}s`,
                    }}
                    aria-hidden="true"
                >
                    {p.char}
                </span>
            ))}
        </>
    );
}
