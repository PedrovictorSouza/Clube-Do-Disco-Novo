import React, { useEffect, useRef } from "react";
import styles from "../styles.module.css";
import bg from "../../../../../assets/Title-Bg.png";

import { createTitleAnimator } from "../Title/titleAnimation.ts";
import { subscribeToScroll, unsubscribeFromScroll } from "../../../../../hooks/scroll/scrollObserver";

const Title: React.FC = () => {
    const regularRef = useRef<HTMLParagraphElement>(null); // "Gire o disco"
    const fluidRef = useRef<HTMLHeadingElement>(null);     // "Clube do disco"

    useEffect(() => {
        const animator = createTitleAnimator(regularRef.current, fluidRef.current, {
            mountDuration: 900,
            mountStagger: 140,
            mountFromTranslate: { x: 0, y: 28 },
            mountFromScale: 0.97,
            scroll: {
                enabled: true,
                start: 0,                                // começa a reagir já do topo
                end: window.innerHeight * 0.4,          // termina aos ~40% da viewport
                fromScale: 1.0,
                toScale: 0.66,
                fromTranslate: { x: 0, y: 0 },
                toTranslate: { x: -40, y: -56 },        // move levemente para canto sup-esq
                fadeOpacity: true,
                transformOrigin: "left top",
            },
        });

        const onScroll = (y: number) => animator.updateScroll(y, window.innerHeight);
        subscribeToScroll(onScroll);

        animator.updateScroll(window.scrollY, window.innerHeight);

        return () => {
            unsubscribeFromScroll(onScroll);
            animator.destroy();
        };
    }, []);

    return (
        <div
            className={styles.titleBlock}
            style={{
                backgroundImage: `url(${bg})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
            }}
            data-testid="hero-title"
        >
            <h1
                ref={fluidRef}
                className={`${styles.titleFluid} ${styles.titleTextOverlay}`}
                style={{
                    color: "black",
                }}
            >
                Clube do disco
            </h1>

            <p
                ref={regularRef}
                className={`${styles.titleRegular} ${styles.titleTextOverlay}`}
                data-testid="hint-text"
                style={{
                    color: "black",
                    fontSize: "2rem",
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    letterSpacing: 5,
                    marginTop: 8,
                }}
            >
                Gire o disco
            </p>
        </div>
    );
};

export default Title;
