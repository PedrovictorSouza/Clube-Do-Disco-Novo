import { HeroProgressConfig, Stage } from "./types";

export const defaultHeroConfig: HeroProgressConfig = {
    titleFadeEndFraction: 0.25,
    gridFadeStartFraction: 0.25,
    gridFadeEndFraction: 1.0,      // Reduzido de 1.8 para 1.0
    aboutFadeStartFraction: 1.0,   // Reduzido de 1.8 para 1.0
    aboutFadeEndFraction: 1.75,    // Reduzido de 2.55 para 1.75
    contactFadeStartFraction: 1.75, // Reduzido de 2.55 para 1.75
    contactFadeEndFraction: 2.5,   // Reduzido de 3.3 para 2.5
    logMilestones: true,
};

export function clamp01(v: number) {
    return Math.max(0, Math.min(1, v));
}

function getDefaultProgressState() {
    return {
        titleOpacity: 1,
        gridOpacity: 0,
        aboutOpacity: 0,
        contactOpacity: 0,
        progress: 0,
        stage: 0 as Stage,
        titleEndY: 0,
        gridEndY: 0,
        aboutEndY: 0,
        contactEndY: 0
    };
}

export function computeHeroProgress(
    y: number,
    H: number,
    cfg: HeroProgressConfig
) {
    if (H <= 0) {
        console.warn('Viewport height is zero or negative:', H);
        return getDefaultProgressState();
    }
    
    if (!isFinite(y)) {
        console.warn('Scroll Y is not finite:', y);
        return getDefaultProgressState();
    }
    
    if (!isFinite(H)) {
        console.warn('Viewport height is not finite:', H);
        return getDefaultProgressState();
    }

    const titleEndY = H * cfg.titleFadeEndFraction;
    const gridStartY = H * cfg.gridFadeStartFraction;
    const gridPeakY = H * 0.6;
    const gridFadeOutEndY = H * cfg.gridFadeEndFraction;
    const aboutStartY = H * cfg.aboutFadeStartFraction;
    const contactStartY = H * cfg.contactFadeStartFraction;
    
    const aboutEndY = contactStartY;
    const contactEndY = contactStartY + H * 0.75;

    const titleOpacity = y <= 0 ? 1 : clamp01(1 - y / Math.max(1, titleEndY));
    const progress = clamp01(y / Math.max(1, titleEndY));

    let gridOpacity = 0;
    if (y > gridStartY && y <= gridPeakY) {
        const t = (y - gridStartY) / Math.max(1, gridPeakY - gridStartY);
        gridOpacity = clamp01(t);
    } else if (y > gridPeakY && y < aboutStartY) {
        gridOpacity = 1;
    } else {
        gridOpacity = 0;
    }

    let aboutOpacity = 0;
    if (y >= aboutStartY && y < contactEndY) {
        const aboutRange = contactEndY - aboutStartY;
        const aboutProgress = (y - aboutStartY) / Math.max(1, aboutRange);
        
        if (aboutProgress <= 0.25) {
            aboutOpacity = aboutProgress === 0 ? 1.0 : clamp01(aboutProgress * 4);
        } else {
            aboutOpacity = 1;
        }
    }

    let contactOpacity = 0;
    if (y >= contactStartY) {
        contactOpacity = 1;
    }

    let stage: Stage = 0;
    if (y < titleEndY) stage = 0;
    else if (y < aboutStartY) stage = 1;
    else if (y < aboutEndY) stage = 2;
    else if (y < contactEndY) stage = 3;
    else stage = 3;

    return {
        titleOpacity,
        gridOpacity,
        aboutOpacity,
        contactOpacity,
        progress,
        stage,
        titleEndY,
        gridEndY: gridFadeOutEndY,
        aboutEndY,
        contactEndY
    };
}

