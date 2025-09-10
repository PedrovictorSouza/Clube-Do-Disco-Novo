import React, { useState, useEffect } from "react";
import styles from "./SectionNav.module.css";

type Section = { id: string; label: string };

type Props = {
    sections: Section[];
    activeId: string | null;
    scrollOffset?: number;
    onGoto?: (id: string) => void;
    onActiveChange?: (id: string) => void;
};

const SectionNav: React.FC<Props> = ({
                                         sections,
                                         activeId,
                                         scrollOffset = 0,
                                         onGoto,
                                         onActiveChange,
                                     }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);
    function getScrollParent(el: HTMLElement | null): HTMLElement | Window {
        let node: HTMLElement | null = el;
        while (node && node !== document.body) {
            const style = window.getComputedStyle(node);
            const overflowY = style.overflowY;
            const canScroll = (overflowY === "auto" || overflowY === "scroll");
            if (canScroll && node.scrollHeight > node.clientHeight) return node;
            node = node.parentElement;
        }
        return window; // fallback: a página
    }

    const handleClick = (id: string) => {
        if (isMobile) {
            setIsMobileMenuOpen(false);
        }

        if (onGoto) {
            onGoto(id);
            onActiveChange?.(id);
            return;
        }
        const el = document.getElementById(id);
        if (!el) return;

        const scroller = getScrollParent(el);

        const doScroll = (containerTop: number, currentScroll: number) => {
            const target = containerTop + currentScroll - (scrollOffset ?? 0);
            if (typeof (scroller as Window).scrollTo === "function") {
                (scroller as Window).scrollTo({ top: target, behavior: "smooth" });
            } else {
                (scroller as HTMLElement).scrollTo({ top: target, behavior: "smooth" as ScrollBehavior });
            }
        };

        if (scroller === window) {
            const top = el.getBoundingClientRect().top + window.scrollY - (scrollOffset ?? 0);
            window.scrollTo({ top, behavior: "smooth" });
        } else {
            const container = scroller as HTMLElement;
            const rect = el.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            const topRelativeToContainer = rect.top - containerRect.top;
            doScroll(topRelativeToContainer, container.scrollTop);
        }

        onActiveChange?.(id);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <>
            <nav className={styles.nav}>
                {isMobile ? (
                    <button
                        className={styles.hamburger}
                        onClick={toggleMobileMenu}
                        aria-label="Toggle menu"
                    >
                        <span className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.hamburgerOpen : ''}`}></span>
                        <span className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.hamburgerOpen : ''}`}></span>
                        <span className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.hamburgerOpen : ''}`}></span>
                    </button>
                ) : (
                    <ul className={styles.list}>
                        {sections.map((s) => (
                            <li key={s.id} className={styles.item}>
                                <button
                                    type="button"
                                    className={`${styles.button} ${
                                        activeId === s.id ? styles.active : ""
                                    }`}
                                    aria-current={activeId === s.id ? "true" : undefined}
                                    onClick={() => handleClick(s.id)}
                                >
                                    {s.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </nav>
            
            {isMobile && (
                <>
                    <div 
                        className={`${styles.overlay} ${isMobileMenuOpen ? styles.overlayOpen : ''}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                    <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
                        <ul className={styles.mobileList}>
                            {sections.map((s) => (
                                <li key={s.id} className={styles.mobileItem}>
                                    <button
                                        type="button"
                                        className={`${styles.mobileButton} ${
                                            activeId === s.id ? styles.mobileActive : ""
                                        }`}
                                        onClick={() => handleClick(s.id)}
                                    >
                                        {s.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            )}
        </>
    );
};

export default SectionNav;