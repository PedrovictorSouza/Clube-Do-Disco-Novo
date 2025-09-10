
type Vec2 = { x: number; y: number };

export type TitleAnimatorOptions = {

    reveal?: {
        splitMode?: "chars" | "words"; // como dividir o texto
        duration?: number;             // ms p/ cada item (char/word)
        baseDelay?: number;            // ms antes de começar
        perItemStagger?: number;       // ms entre cada char/word
        blurFrom?: number;             // px
        fromY?: number;                // px
        fromOpacity?: number;          // 0..1
        overshootScale?: number;       // ex: 1.04
        wave?: "center-out" | "left-right" | "right-left";
        trackingIn?: {                 // animação de letter-spacing do container
            from?: number;               // em px (ex: 4)
            to?: number;                 // ex: 0
            duration?: number;           // ms
            ease?: (t: number) => number;
        };
        ease?: (t: number) => number;  // curva da entrada
    };

    scroll?: {
        enabled?: boolean;
        start?: number;
        end?: number;
        fromScale?: number;
        toScale?: number;
        fromTranslate?: Vec2;
        toTranslate?: Vec2;
        fadeOpacity?: boolean;
        transformOrigin?: string;
    };

    detectReducedMotion?: boolean;
};

type Dispose = () => void;

function clamp01(v: number) { return Math.max(0, Math.min(1, v)); }
function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
function lerv(a: Vec2, b: Vec2, t: number): Vec2 { return { x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t) }; }
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeOutQuint  = (t: number) => 1 - Math.pow(1 - t, 5);

function splitElement(el: HTMLElement, mode: "chars" | "words") {

    if (el.querySelector('[data-reveal]')) {
        const items = Array.from(el.querySelectorAll<HTMLElement>('[data-reveal="item"]'));
        return { wrapper: el, items };
    }

    const text = el.textContent ?? "";
    el.textContent = ""; // limpa
    const frag = document.createDocumentFragment();

    const tokens = mode === "words"
        ? text.split(/(\s+)/) // preserva espaços como tokens
        : Array.from(text);   // chars

    const items: HTMLElement[] = [];
    for (const tk of tokens) {
        const span = document.createElement("span");
        span.setAttribute("data-reveal", "item");
        span.style.display = "inline-block";
        span.style.whiteSpace = tk.match(/\s+/) ? "pre" : "normal";
        span.textContent = tk;
        frag.appendChild(span);
        items.push(span);
    }
    el.appendChild(frag);
    el.setAttribute("data-reveal", "wrapper");
    return { wrapper: el, items };
}

function prepareReveal(items: HTMLElement[], opts: Required<NonNullable<TitleAnimatorOptions["reveal"]>>) {
    items.forEach((it) => {
        it.style.opacity = String(opts.fromOpacity);
        it.style.transform = `translateY(${opts.fromY}px) scale(${opts.overshootScale})`;
        it.style.filter = `blur(${opts.blurFrom}px)`;
        it.style.willChange = "transform, opacity, filter";
    });
}

function computeWaveOrder(n: number, mode: NonNullable<TitleAnimatorOptions["reveal"]>["wave"]) {
    const idxs = Array.from({ length: n }, (_, i) => i);
    if (mode === "left-right") return idxs;
    if (mode === "right-left") return idxs.reverse();

    const center = (n - 1) / 2;
    return idxs.sort((a, b) => Math.abs(a - center) - Math.abs(b - center));
}

export function createTitleAnimator(
    regularEl: HTMLElement | null, // subtítulo / hint
    fluidEl: HTMLElement | null,   // título principal
    options: TitleAnimatorOptions = {},
) {
    if (!regularEl || !fluidEl) return { updateScroll: (_?: number) => {}, destroy: () => {} };

    const {
        detectReducedMotion = true,
        reveal = {},
        scroll = {},
    } = options;

    const revealOpts = {
        splitMode: reveal.splitMode ?? "chars",
        duration: reveal.duration ?? 1240,
        baseDelay: reveal.baseDelay ?? 80,
        perItemStagger: reveal.perItemStagger ?? 24,
        blurFrom: reveal.blurFrom ?? 6,
        fromY: reveal.fromY ?? 16,
        fromOpacity: reveal.fromOpacity ?? 0,
        overshootScale: reveal.overshootScale ?? 1.04,
        wave: reveal.wave ?? "left-right",
        trackingIn: {
            from: reveal.trackingIn?.from ?? 4,
            to: reveal.trackingIn?.to ?? 0,
            duration: reveal.trackingIn?.duration ?? 700,
            ease: reveal.trackingIn?.ease ?? easeOutCubic,
        },
        ease: reveal.ease ?? easeOutQuint,
    } as Required<NonNullable<TitleAnimatorOptions["reveal"]>>;

    const scrollOpts = {
        enabled: scroll.enabled ?? true,
        start: scroll.start ?? 0,
        end: scroll.end ?? (0.4 * (typeof window !== "undefined" ? window.innerHeight : 800)),
        fromScale: scroll.fromScale ?? 1,
        toScale: scroll.toScale ?? 0.66,
        fromTranslate: scroll.fromTranslate ?? { x: 0, y: 0 },
        toTranslate: scroll.toTranslate ?? { x: -40, y: -56 },
        fadeOpacity: scroll.fadeOpacity ?? true,
        transformOrigin: scroll.transformOrigin ?? "left top",
    };

    const prefersReduced = detectReducedMotion &&
        typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    const prev = {
        reg: {
            transition: regularEl.style.transition,
            transform: regularEl.style.transform,
            opacity: regularEl.style.opacity,
            filter: regularEl.style.filter,
            willChange: regularEl.style.willChange,
            letterSpacing: regularEl.style.letterSpacing,
            transformOrigin: regularEl.style.transformOrigin,
        },
        flu: {
            transition: fluidEl.style.transition,
            transform: fluidEl.style.transform,
            opacity: fluidEl.style.opacity,
            filter: fluidEl.style.filter,
            willChange: fluidEl.style.willChange,
            letterSpacing: fluidEl.style.letterSpacing,
            transformOrigin: fluidEl.style.transformOrigin,
        },
    };

    regularEl.style.transformOrigin = scrollOpts.transformOrigin;
    fluidEl.style.transformOrigin = scrollOpts.transformOrigin;

    const regSplit = splitElement(regularEl, revealOpts.splitMode);
    const fluSplit = splitElement(fluidEl, revealOpts.splitMode);

    [regSplit.wrapper, fluSplit.wrapper].forEach((w) => {
        w.style.letterSpacing = `${revealOpts.trackingIn.from}px`;
        w.style.willChange = "letter-spacing";
    });

    if (prefersReduced) {

        [...regSplit.items, ...fluSplit.items].forEach((it) => {
            it.style.opacity = "1";
            it.style.transform = "none";
            it.style.filter = "none";
            it.style.willChange = "";
        });
        regSplit.wrapper.style.letterSpacing = `${revealOpts.trackingIn.to}px`;
        fluSplit.wrapper.style.letterSpacing = `${revealOpts.trackingIn.to}px`;
    } else {

        prepareReveal(regSplit.items, revealOpts);
        prepareReveal(fluSplit.items, revealOpts);

        const orders = {
            reg: computeWaveOrder(regSplit.items.length, revealOpts.wave),
            flu: computeWaveOrder(fluSplit.items.length, revealOpts.wave),
        };

        const t0 = performance.now() + revealOpts.baseDelay;
        let rafId: number | null = null;

        const trackStart = t0;
        const trackEnd = trackStart + revealOpts.trackingIn.duration;

        function frame(now: number) {

            const tt = clamp01((now - trackStart) / (revealOpts.trackingIn.duration));
            const te = revealOpts.trackingIn.ease(tt);
            const ls = lerp(revealOpts.trackingIn.from, revealOpts.trackingIn.to, te);
            regSplit.wrapper.style.letterSpacing = `${ls}px`;
            fluSplit.wrapper.style.letterSpacing = `${ls}px`;

            const drive = (items: HTMLElement[], order: number[]) => {
                for (let k = 0; k < items.length; k++) {
                    const idx = order[k];
                    const el = items[idx];
                    const start = t0 + k * revealOpts.perItemStagger;
                    const t = clamp01((now - start) / revealOpts.duration);
                    const e = revealOpts.ease(t);

                    const scale = lerp(revealOpts.overshootScale, 1, e);
                    const y = lerp(revealOpts.fromY, 0, e);
                    const op = lerp(revealOpts.fromOpacity, 1, e);
                    const blur = lerp(revealOpts.blurFrom, 0, e);

                    el.style.opacity = String(op);
                    el.style.transform = `translateY(${y}px) scale(${scale})`;
                    el.style.filter = `blur(${blur}px)`;
                }
            };

            drive(regSplit.items, orders.reg);
            drive(fluSplit.items, orders.flu);

            const totalLen = Math.max(regSplit.items.length, fluSplit.items.length);
            const lastItemEnd = t0 + revealOpts.perItemStagger * (totalLen - 1) + revealOpts.duration;
            if (now < Math.max(lastItemEnd, trackEnd)) {
                rafId = requestAnimationFrame(frame);
            } else {

                [...regSplit.items, ...fluSplit.items].forEach((it) => {
                    it.style.opacity = "1";
                    it.style.transform = "translateY(0) scale(1)";
                    it.style.filter = "none";
                    it.style.willChange = "";
                });
                [regSplit.wrapper, fluSplit.wrapper].forEach((w) => {
                    w.style.letterSpacing = `${revealOpts.trackingIn.to}px`;
                    w.style.willChange = "";
                });
            }
        }
        requestAnimationFrame((n) => frame(n));
    }

    function updateScroll(scrollY?: number, viewportH?: number) {
        if (!scrollOpts.enabled) return;
        const H = viewportH ?? (typeof window !== "undefined" ? window.innerHeight : 800);
        const y = scrollY ?? (typeof window !== "undefined" ? window.scrollY : 0);

        const s = scrollOpts.start;
        const e = Math.max(s + 1, scrollOpts.end);
        const t = clamp01((y - s) / (e - s));

        const sc = lerp(scrollOpts.fromScale, scrollOpts.toScale, t);
        const tr = lerv(scrollOpts.fromTranslate, scrollOpts.toTranslate, t);
        const op = scrollOpts.fadeOpacity ? (1 - t) : 1;

        const transform = `translate(${tr.x}px, ${tr.y}px) scale(${sc})`;
        regularEl.style.transform = transform;
        fluidEl.style.transform = transform;
        regularEl.style.opacity = String(op);
        fluidEl.style.opacity = String(op);
    }

    const destroy: Dispose = () => {

        regularEl.style.transition = prev.reg.transition;
        regularEl.style.transform = prev.reg.transform;
        regularEl.style.opacity = prev.reg.opacity;
        regularEl.style.filter = prev.reg.filter;
        regularEl.style.willChange = prev.reg.willChange;
        regularEl.style.letterSpacing = prev.reg.letterSpacing;
        regularEl.style.transformOrigin = prev.reg.transformOrigin;

        fluidEl.style.transition = prev.flu.transition;
        fluidEl.style.transform = prev.flu.transform;
        fluidEl.style.opacity = prev.flu.opacity;
        fluidEl.style.filter = prev.flu.filter;
        fluidEl.style.willChange = prev.flu.willChange;
        fluidEl.style.letterSpacing = prev.flu.letterSpacing;
        fluidEl.style.transformOrigin = prev.flu.transformOrigin;
    };

    return { updateScroll, destroy };
}
