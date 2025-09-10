
import {
    Scheduler,
    ScrollSource,
    ViewportSource,
} from "./types";
import {
    subscribeToScroll as _subscribe,
    unsubscribeFromScroll as _unsubscribe,
    listSubscribersNames as _listNames,
} from "../../hooks/scroll/scrollObserver.ts";

export const windowViewport: ViewportSource = {
    getHeight: () => (typeof window !== "undefined" ? window.innerHeight : 1),
    onResize: (cb) => {
        if (typeof window === "undefined") return;
        window.addEventListener("resize", cb, { passive: true });
    },
    offResize: (cb) => {
        if (typeof window === "undefined") return;
        window.removeEventListener("resize", cb);
    },
};

export const rafScheduler: Scheduler = {
    raf: (cb) =>
        typeof requestAnimationFrame !== "undefined"
            ? requestAnimationFrame(cb)
            : (setTimeout(() => cb(performance.now() as unknown as number), 16) as unknown as number),
    cancel: (id) => {
        if (typeof cancelAnimationFrame !== "undefined") cancelAnimationFrame(id);
        else clearTimeout(id as unknown as number);
    },
};

export const scrollObserverAdapter: ScrollSource = {
    subscribe: (cb, name) => _subscribe(cb, name ?? "useHeroProgress"),
    unsubscribe: (cb) => _unsubscribe(cb),
    listSubscribersNames: () => (_listNames ? _listNames() : []),
};
