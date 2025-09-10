

type ScrollCallback = (scrollY: number) => void;

type SubscriberMeta = {
    id: number;
    label?: string;
    stack?: string;
    subscribedAt: number;
    lastNotifiedAt?: number;
};

let nextId = 1;
let fakeScrollY = 0;
let isInitialized = false;

const subscribers = new Map<ScrollCallback, SubscriberMeta>();
export function listSubscribersNames() {
    return Array.from(subscribers.entries()).map(([cb, meta]) =>
        meta.label || cb.name || 'anon'
    );
}


function captureStack(): string | undefined {
    try {
        const err = new Error();
        if (!err.stack) return undefined;

        return err.stack
            .split("\n")
            .slice(2, 8)
            .map((s) => s.trim())
            .join(" | ");
    } catch {
        return undefined;
    }
}

function listSubscribers() {
    const now = Date.now();
    return Array.from(subscribers.entries()).map(([cb, meta]) => ({
        id: meta.id,
        label: meta.label || cb.name || `#${meta.id}`,
        origin: meta.label ? "label" : meta.stack || "(no stack)",
        subscribedAt: new Date(meta.subscribedAt).toLocaleTimeString(),
        msSinceSubscribe: now - meta.subscribedAt,
        lastNotifiedAt: meta.lastNotifiedAt
            ? new Date(meta.lastNotifiedAt).toLocaleTimeString()
            : "-",
    }));
}

function notifyAll(scrollY: number) {
    const t = Date.now();
    subscribers.forEach((meta, cb) => {
        meta.lastNotifiedAt = t;
        try {
            cb(scrollY);
        } catch (err) {
            const who = meta.label || cb.name || `#${meta.id}`;
            console.error(`Subscriber error (${who})`, err);
        }
    });
}



function handleWheel(e: WheelEvent) {
    virtualY = Math.max(0, virtualY + e.deltaY);
    notifyAll(virtualY);
}

function handleScroll() {

    requestAnimationFrame(() => notifyAll(virtualY));
}

export function subscribeToScroll(callback: ScrollCallback, label?: string) {
    if (!subscribers.has(callback)) {
        subscribers.set(callback, {
            id: nextId++,
            label: label || captureStack(),
            stack: label ? undefined : captureStack(),
            subscribedAt: Date.now(),
        });
    }
    const meta = subscribers.get(callback)!;
    console.log("✅ Subscribed:", meta.label || callback.name || `#${meta.id}`);
    console.log("👥 Total subscribers:", subscribers.size);
    console.table(listSubscribers());
}

export function unsubscribeFromScroll(callback: ScrollCallback) {
    const meta = subscribers.get(callback);
    subscribers.delete(callback);
    console.log("❌ Unsubscribed:", meta?.label || callback.name || "(anon)");
    console.log("👥 Total subscribers:", subscribers.size);
    console.table(listSubscribers());
}

export function initScrollObserver() {
    if (isInitialized) return;
    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true }); // cobre touch/teclado
    isInitialized = true;

    const debugApi = {
        dump() {
            console.table(listSubscribers());
        },
        size() {
            return subscribers.size;
        },
        list: listSubscribers,
    };

    (window as any).__scrollObs = debugApi;

    console.log("[scrollObserver] initialized");
}

export function destroyScrollObserver() {
    if (!isInitialized) return;
    window.removeEventListener("wheel", handleWheel);
    window.removeEventListener("scroll", handleScroll);
    subscribers.clear();
    isInitialized = false;
    console.log("[scrollObserver] destroyed");
}

let virtualY = 0;

export function getVirtualScrollY() {
    return virtualY;
}
export function setVirtualScrollY(y: number, notify = true) {
    virtualY = Math.max(0, y);
    if (notify) notifyAll(virtualY);
}
export function animateVirtualScrollTo(target: number, opts: { duration?: number } = {}) {
    const duration = opts.duration ?? 500;
    const start = virtualY;
    const delta = target - start;
    if (delta === 0 || duration <= 0) return setVirtualScrollY(target);

    const t0 = performance.now();
    const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / duration);
        const eased = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p; // easeInOutQuad
        setVirtualScrollY(start + delta * eased);
        if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
}
