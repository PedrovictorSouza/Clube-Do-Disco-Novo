import React, { useMemo, useEffect, useState } from "react";
import styles from "./styles.module.css";
import Title from "./Title";
import RotatingImage from "./RotatingImage/RotatingImage.tsx";
import AboutSection from "./AboutSection/AboutSection";
import ContactSection from "./ContactSection/ContactSection.tsx";
import { EventsSection } from "./EventsSection";
import SectionNav from "../../../../components/Nav/SectionNav.tsx";

import { useHeroProgress } from "../../../../hooks/heroProgress/useHeroProgress.ts";
import { computeHeroProgress, defaultHeroConfig } from "../../../../hooks/heroProgress/math.ts";
import { animateVirtualScrollTo } from "../../../../hooks/scroll/scrollObserver.ts";



const sections = [  
    { id: "home-hero", label: "Home" },
    { id: "events", label: "Eventos" },     
    { id: "about", label: "About" },
    { id: "contact", label: "Contato" },
];

const heroCfg = { ...defaultHeroConfig };

const HomeHeroSection: React.FC = () => {

    const hero = useHeroProgress({ config: heroCfg });

    const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
    
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const anchors = useMemo(() => {
        const r = computeHeroProgress(hero.scrollY, hero.H, heroCfg);
        return {
            "home-hero": 0,
            "events": hero.H * 0.6,    // ponto máximo da opacidade do grid (onde está completamente visível)
            "about": hero.H * 1.0,     // About aparece quando scroll atinge 1.0 * H (otimizado)
            "contact": hero.H * 1.75,  // Contact aparece quando scroll atinge 1.75 * H (otimizado)
        };
    }, [hero.scrollY, hero.H]);

    const FORCE_100VH_STAGE_1 = true;

    const mobileHeights = useMemo(() => {
        if (!isMobile) return { leftPane: '50vh', rightPane: '50vh' };

        if (FORCE_100VH_STAGE_1 && hero.stage >= 1) {
            return {
                leftPane: '100vh',
                rightPane: '5vh'  // Disco bem pequeno, quase invisível
            };
        }

        const progress = Math.min(hero.stage / 4, 1); // 0 a 1 baseado no stage (0-4)

        const minHeight = 50; // 50vh
        const maxHeight = 85; // 85vh (quase toda a tela)

        const minDiskHeight = 50; // 50vh
        const maxDiskHeight = 15; // 15vh (bem pequeno no final)

        const leftPaneHeight = minHeight + (maxHeight - minHeight) * progress;

        const diskProgress = Math.min(progress * 2, 1); // Dobra a velocidade
        const rightPaneHeight = minDiskHeight - (minDiskHeight - maxDiskHeight) * diskProgress;
        
        return {
            leftPane: `${leftPaneHeight}vh`,
            rightPane: `${rightPaneHeight}vh`
        };
    }, [hero.stage, isMobile]);


    const activeId =
        hero.stage === 0 ? "home-hero" :
        hero.stage === 1 ? "events" :
        hero.stage === 2 ? "about" :
        hero.stage === 3 ? "contact" :
        "contact";

    const handleGoto = (id: string) => {
        const y = anchors[id] ?? 0;

        if (id === "about") {

            animateVirtualScrollTo(y, { duration: 0 });
        } else if (id === "contact") {

            const contactY = hero.H * 1.75; // Y=1.75 para stage 3 (otimizado)
            animateVirtualScrollTo(contactY, { duration: 0 });
        } else {

            const duration = id === "events" ? 1000 : 600;
            animateVirtualScrollTo(y, { duration });
        }
    };

    return (
        <main className={styles.main}>
            <section id="home-hero" className={styles.gridContainer}>
                <SectionNav
                    sections={sections}
                    activeId={activeId}
                    onGoto={handleGoto}          // <<< importante no modo virtual

                />

                <div 
                    className={styles.leftPane}
                    style={{
                        '--left-pane-height': mobileHeights.leftPane,
                        '--right-pane-height': mobileHeights.rightPane,
                    } as React.CSSProperties}
                >
                    <div style={{ opacity: hero.titleOpacity }}>
                        <Title />
                    </div>


                    {}
                    {hero.stage === 1 && (
                        <section id="events" style={{ opacity: hero.gridOpacity }}>
                            <EventsSection />
                        </section>
                    )}

                    {hero.stage === 2 && (
                        <section id="about" style={{ opacity: hero.aboutOpacity }}>
                            <AboutSection />
                        </section>
                    )}

                    {hero.stage === 3 && (
                        <section id="contact" style={{ opacity: hero.contactOpacity }}>
                            <ContactSection />
                        </section>
                    )}
                </div>

                <div 
                    className={styles.rightPane}
                    style={{
                        '--left-pane-height': mobileHeights.leftPane,
                        '--right-pane-height': mobileHeights.rightPane,
                    } as React.CSSProperties}
                >
                    <RotatingImage />
                </div>
            </section>
        </main>
    );
};

export default HomeHeroSection;
