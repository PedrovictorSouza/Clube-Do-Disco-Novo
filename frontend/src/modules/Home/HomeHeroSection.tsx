import React from "react";
import TitleAnimation from "../../components/TitleAnimation";
import ScrollRevealOverlay from "./ScrollRevealOverlay";
import { useVisibility } from "../../contexts/VisibilityContext";
import styles from "./Home.module.css";

interface HomeHeroSectionProps {
    startTransition: boolean;
}

const HomeHeroSection: React.FC<HomeHeroSectionProps> = ({ startTransition }) => {
    const { isTitleVisible } = useVisibility();
    
    const circles = Array.from({ length: 5 }, (_, i) => (
        <div
            key={i}
            className={styles.circle}
            style={{ animationDelay: `${i * 4}s` }}
        />
    ));

    return (
        <main className={styles.main}>
            <div className={styles.baseBg} />
            <div className={styles.background}>
                {circles}
                <div className={`${styles['animate-fadeIn']} ${!isTitleVisible ? styles.hidden : ''}`}>
                    <div className={styles.titleBlock}>
                        <h1 className={styles.liquidoRegular + ' ' + styles.titleRegular}>
                            CLUBE DO
                        </h1>
                        <h2 className={styles.liquidoFluid + ' ' + styles.titleFluid}>
                            DISCO
                        </h2>
                    </div>
                </div>
            </div>
            <ScrollRevealOverlay />
        </main>
    );
};

export default HomeHeroSection;
