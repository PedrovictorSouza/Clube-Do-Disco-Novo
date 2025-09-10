
import { useEffect, useMemo, useState } from "react";
import {
    initScrollObserver,
    destroyScrollObserver,
    subscribeToScroll,
    unsubscribeFromScroll,
} from "../../hooks/scroll/scrollObserver.ts";

type Section = { id: string; label: string };

export function useActiveSection(
    sections: Section[],
    opts: { activationLine?: number; scrollOffset?: number } = {}
) {
    const { activationLine = 0.4, scrollOffset = 0 } = opts;
    const [activeId, setActiveId] = useState<string | null>(sections[0]?.id ?? null);

    const sectionEls = useMemo(
        () => sections.map(s => ({ ...s, el: typeof document !== "undefined" ? document.getElementById(s.id) : null })),
        [sections]
    );

    useEffect(() => {
        initScrollObserver();

        const onScroll = () => {
            const vh = window.innerHeight || 1;
            const activationY = activationLine * vh;

            let current: string | null = null;
            let bestDist = Infinity;

            for (const { id, el } of sectionEls) {
                if (!el) continue;
                const rect = el.getBoundingClientRect();
                const topWithOffset = rect.top - scrollOffset;
                const dist = Math.abs(topWithOffset - activationY);
                if (topWithOffset <= activationY && dist < bestDist) {
                    bestDist = dist;
                    current = id;
                }
            }

            if (!current && sectionEls[0]?.el) current = sectionEls[0].id;
            setActiveId(prev => (prev === current ? prev : current));
        };

        subscribeToScroll(onScroll, "useActiveSection");
        onScroll(); // cálculo inicial

        return () => {
            unsubscribeFromScroll(onScroll);
            destroyScrollObserver();
        };
    }, [activationLine, scrollOffset, sectionEls]);

    return { activeId, setActiveId };
}
