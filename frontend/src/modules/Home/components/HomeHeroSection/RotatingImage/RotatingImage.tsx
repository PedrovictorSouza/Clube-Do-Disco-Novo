import { useRef, useEffect, useCallback, useState } from "react";
import { subscribeToScroll, unsubscribeFromScroll } from "../../../../../hooks/scroll/scrollObserver";
import { useHeroProgress } from "../../../../../hooks/heroProgress/useHeroProgress";
import rotatingImage from "../../../../../../imgs/rotating.png";
import styles from "./RotatingImage.module.css";

const RotatingImage = () => {
    const imgRef = useRef<HTMLImageElement>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);

    const hero = useHeroProgress();

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setHasAnimated(true);
        }, 100);
        
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (hasAnimated) {
            const timer = setTimeout(() => {
                setHasAnimated(false);
            }, 1500);
            
            return () => clearTimeout(timer);
        }
    }, [hasAnimated]);

    const handleScroll = useCallback((scrollY: number) => {
        const rotation = scrollY * 0.2;
        if (imgRef.current) {

            let scale = 1;
            
            if (isMobile) {


                
                if (scrollY > 0) {

                    const stage2StartY = hero.H * 1.8; // Início do stage 2 (about)
                    
                    if (scrollY <= stage2StartY) {

                        const progress = scrollY / stage2StartY;

                        scale = 1 - (progress * 1.0); // De 1 para 0
                    } else {

                        scale = 0;
                    }
                } else {

                    scale = 1;
                }
            }
            
            imgRef.current.style.transform = `rotate(${rotation}deg) scale(${scale})`;
        }
    }, [isMobile, hero.H]);

    useEffect(() => {
        subscribeToScroll(handleScroll, "RotatingImage");
        return () => unsubscribeFromScroll(handleScroll);
    }, [handleScroll]);

    const getAnimationClass = () => {
        if (!hasAnimated) return '';
        return isMobile ? styles.rotatingImageMobileEntering : styles.rotatingImageEntering;
    };

    const getMobileClass = () => {
        if (!isMobile) return styles.rotatingImageDesktop;

        if (hero.stage >= 1) {
            return styles.rotatingImageMobileStage1;
        }
        
        return styles.rotatingImageMobile;
    };

    return (
        <img
            ref={imgRef}
            src={rotatingImage}
            alt="Imagem giratória"
            className={`${styles.rotatingImage} ${getMobileClass()} ${getAnimationClass()}`}
        />
    );
};

export default RotatingImage;
