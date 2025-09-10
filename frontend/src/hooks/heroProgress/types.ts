
export type Stage = 0 | 1 | 2 | 3 | 4;

export interface HeroProgressState {
    scrollY: number;
    titleOpacity: number;
    gridOpacity: number;
    aboutOpacity: number;
    contactOpacity: number;
    progress: number;
    stage: Stage;
    H: number;
}

export interface ScrollSource {
    subscribe(cb: (y: number) => void, name?: string): void;
    unsubscribe(cb: (y: number) => void): void;
    listSubscribersNames?(): string[];
}

export interface ViewportSource {
    getHeight(): number;
    onResize(cb: () => void): void;
    offResize(cb: () => void): void;
}

export interface Scheduler {
    raf(cb: FrameRequestCallback): number;
    cancel(id: number): void;
}

export interface HeroProgressConfig {
    titleFadeEndFraction: number;
    gridFadeStartFraction: number;
    gridFadeEndFraction: number;
    aboutFadeStartFraction: number;
    aboutFadeEndFraction: number;
    contactFadeStartFraction: number;
    contactFadeEndFraction: number;
    logMilestones?: boolean;
}
