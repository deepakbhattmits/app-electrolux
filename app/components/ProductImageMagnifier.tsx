"use client";

import Image from "next/image";
import { useState } from "react";
import type { MouseEvent } from "react";

interface ProductImageMagnifierProps {
    src: string;
    alt: string;
}

export default function ProductImageMagnifier({ src, alt }: ProductImageMagnifierProps) {
    const [origin, setOrigin] = useState("50% 50%");
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        setOrigin(`${x}% ${y}%`);
    };

    return (
        <div className="rounded-3xl border border-zinc-200/80 bg-white shadow-sm">
            <div
                className="group relative aspect-[4/3] w-full overflow-hidden rounded-3xl"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <Image
                    src={src}
                    alt={alt}
                    fill
                    loading="eager"
                    sizes="(min-width: 1024px) 420px, 100vw"
                    className={`object-cover transition-transform duration-300 ease-out ${isHovered ? "scale-[1.9]" : "scale-100"}`}
                    style={{ transformOrigin: origin }}
                />
                <div className="pointer-events-none absolute inset-0 bg-black/0 transition-opacity duration-300 group-hover:bg-black/5" />
            </div>
        </div>
    );
}
