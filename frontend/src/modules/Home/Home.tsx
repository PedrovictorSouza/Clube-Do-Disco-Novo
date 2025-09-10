
import React, { useCallback, useEffect, useRef, useState } from "react";
import HomeHeroSection from "./components/HomeHeroSection";
import AboutSection from "../About/AboutSection";
import styles from "./Home.module.css";

const TRANSITION_LOCK_MS = 900;

const Home: React.FC = () => {
    const [stage, setStage] = useState<number>(0); // 0=Hero, 1=Programação, 2=About
    const lockRef = useRef(false);
    const touchStartY = useRef<number | null>(null);

    const clampStage = (n: number) => Math.max(0, Math.min(2, n));
    const lock = () => { lockRef.current = true; setTimeout(() => { lockRef.current = false; }, TRANSITION_LOCK_MS); };

    const goNext = useCallback(() => {
        if (lockRef.current) return;
        setStage(prev => { const next = clampStage(prev + 1); if (next !== prev) lock(); return next; });
    }, []);
    const goPrev = useCallback(() => {
        if (lockRef.current) return;
        setStage(prev => { const next = clampStage(prev - 1); if (next !== prev) lock(); return next; });
    }, []);

    useEffect(() => {
        const onWheel = (e: WheelEvent) => { if (Math.abs(e.deltaY) < 8) return; e.deltaY > 0 ? goNext() : goPrev(); };
        const onKeyDown = (e: KeyboardEvent) => {
            const nextKeys = [" ", "Spacebar", "PageDown", "ArrowDown", "Enter"];
            const prevKeys = ["PageUp", "ArrowUp", "Backspace"];
            if (nextKeys.includes(e.key)) { e.preventDefault(); goNext(); }
            else if (prevKeys.includes(e.key)) { e.preventDefault(); goPrev(); }
        };
        const onTouchStart = (e: TouchEvent) => { touchStartY.current = e.touches[0].clientY; };
        const onTouchEnd = (e: TouchEvent) => {
            if (touchStartY.current == null) return;
            const delta = touchStartY.current - e.changedTouches[0].clientY;
            const threshold = 30;
            if (delta > threshold) goNext(); else if (delta < -threshold) goPrev();
            touchStartY.current = null;
        };

        window.addEventListener("wheel", onWheel, { passive: true });
        window.addEventListener("keydown", onKeyDown);
        window.addEventListener("touchstart", onTouchStart, { passive: true });
        window.addEventListener("touchend", onTouchEnd, { passive: true });

        return () => {
            window.removeEventListener("wheel", onWheel);
            window.removeEventListener("keydown", onKeyDown);
            window.removeEventListener("touchstart", onTouchStart as any);
            window.removeEventListener("touchend", onTouchEnd as any);
        };
    }, [goNext, goPrev]);

    return (
        <div className={styles.homeContainer}>
            {}
            <HomeHeroSection />

        </div>
    );
};

export default Home;
