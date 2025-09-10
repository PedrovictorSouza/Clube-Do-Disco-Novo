import { useEffect, useRef, useState } from "react";
import {
    HeroProgressConfig,
    HeroProgressState,
    Scheduler,
    ScrollSource,
    ViewportSource,
} from "./types";
import { computeHeroProgress, defaultHeroConfig } from "./math";
import {
    rafScheduler,
    scrollObserverAdapter,
    windowViewport,
} from "./adapters";    

type Deps = {
    scroll?: ScrollSource;
    viewport?: ViewportSource;
    scheduler?: Scheduler;
    config?: Partial<HeroProgressConfig>;
};

export function useHeroProgress(deps: Deps = {}): HeroProgressState {
    const scroll = deps.scroll ?? scrollObserverAdapter;
    const viewport = deps.viewport ?? windowViewport;
    const scheduler = deps.scheduler ?? rafScheduler;
    const cfg: HeroProgressConfig = { ...defaultHeroConfig, ...(deps.config ?? {}) };

    const [state, setState] = useState<HeroProgressState>(() => {
        const H = viewport.getHeight();
        return {
            scrollY: 0,
            titleOpacity: 1,
            gridOpacity: 0,
            aboutOpacity: 0,
            contactOpacity: 0,
            progress: 0,
            stage: 0,
            H,
        };
    });

    const frame = useRef<number | null>(null);
    const latestY = useRef(0);

    const hit25 = useRef(false);
    const hit100 = useRef(false);

    useEffect(() => {
        const id = Math.random().toString(36).slice(2, 7);
        if (cfg.logMilestones) console.log("[useHeroProgress] MOUNT", id);
        return () => {
            if (cfg.logMilestones) console.log("[useHeroProgress] UNMOUNT", id);
        };
    }, []);


    useEffect(() => {
        const handleScroll = (y: number) => {
            latestY.current = y;
            if (frame.current) return;
            frame.current = scheduler.raf(() => {
                frame.current = null;
                const H = viewport.getHeight();

                const r = computeHeroProgress(latestY.current, H, cfg);

                if (cfg.logMilestones) {
                    if (!hit25.current && latestY.current >= r.titleEndY) {
                        hit25.current = true;
                        console.log(`🚀 Scroll chegou a 25% da viewport (${r.titleEndY}px)`);
                        if (scroll.listSubscribersNames) {
                            console.log("📜 Inscritos:", scroll.listSubscribersNames());
                        }
                    }
                    if (!hit100.current && latestY.current >= r.gridEndY) {
                        hit100.current = true;
                        console.log(`🎯 Scroll chegou a 100% da viewport (${r.gridEndY}px)`);
                    }
                }

                setState({
                    scrollY: latestY.current,
                    titleOpacity: r.titleOpacity,
                    gridOpacity: r.gridOpacity,
                    aboutOpacity: r.aboutOpacity,
                    contactOpacity: r.contactOpacity,
                    progress: r.progress,
                    stage: r.stage,
                    H,
                });
            });
        };

        scroll.subscribe(handleScroll, "useHeroProgress");

        return () => {
            scroll.unsubscribe(handleScroll);
            if (frame.current) {
                scheduler.cancel(frame.current);
                frame.current = null;
            }
        };
    }, [cfg, scheduler, scroll]);

    return state;
    
    
}
    