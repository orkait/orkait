"use client";

import { useMemo } from "react";
import { toSvg } from "jdenticon";

interface ProjectAvatarProps {
    name: string;
    size?: number;
    className?: string;
}

export function ProjectAvatar({ name, size = 80, className }: ProjectAvatarProps) {
    const svg = useMemo(() => toSvg(name, size), [name, size]);

    return (
        <div
            className={`grayscale ${className ?? ""}`}
            style={{ width: size, height: size }}
            dangerouslySetInnerHTML={{ __html: svg }}
        />
    );
}
