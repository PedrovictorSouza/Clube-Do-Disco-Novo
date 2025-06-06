import React from "react";
import TitleAnimation from "../../components/TitleAnimation";
import ScrollRevealOverlay from "./ScrollRevealOverlay";
import styles from "./Home.module.css";

interface HomeHeroSectionProps {
    onStartCourse: () => void;
    hideButton: boolean;
    startTransition: boolean;
}

const HomeHeroSection: React.FC<HomeHeroSectionProps> = ({
    onStartCourse,
    hideButton,
    startTransition,
}) => {
    const circles = Array.from({ length: 5 }, (_, i) => (
        <div
            key={i}
            className={styles.circle}
            style={{ animationDelay: `${i * 4}s` }}
        />
    ));

    return (
        <main className={styles.main}>
            <ScrollRevealOverlay />
            <div className={styles.background}>
                {circles}
            </div>
            <div className={styles.container}>
                <div className={styles['animate-fadeIn']}>
                    <TitleAnimation text="Polimat[ia]" delay={100} className={styles.title} />
                </div>
                <div className={styles['animate-fadeIn']} style={{ animationDelay: '300ms' }}>
                    {!hideButton && (
                        <button onClick={onStartCourse} className={styles.button + ' ' + (hideButton ? styles.fadeOut : '')}>
                            <span>T A L K</span>
                        </button>
                    )}
                </div>
            </div>
            {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} style={{ height: '200px' }} />
            ))}
            <div className={`${styles.transitionCircle} ${startTransition ? styles.active : ''}`} />
        </main>
    );
}

export default HomeHeroSection;