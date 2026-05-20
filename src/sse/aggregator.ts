import { AGGREGATE_TICK_MS, TOP_LANGUAGES } from '#src/config';
import { languageStats, type LanguageStat } from '#src/signals/languageStats';
import { streamStatus } from '#src/signals/streamStatus';
import {
    langCounts,
    oldestTimestamp,
    pruneStale,
    windowSec,
    windowTotal,
} from '#src/sse/window';

let raf: number | undefined;
let lastTick = 0;

const recompute = (): void => {
    const now = Date.now();
    pruneStale(now);
    const total = windowTotal();
    const oldest = oldestTimestamp();
    const spanMs = oldest === undefined ? 0 : now - oldest;
    const spanSec = Math.min(windowSec(), Math.max(1, spanMs / 1000));
    streamStatus.value.eps = Math.round((total / spanSec) * 10) / 10;

    const counts = langCounts();
    const denom = total || 1;
    const rows: LanguageStat[] = Object.entries(counts)
        .map(([lang, count]) => ({
            lang,
            count,
            pct: (count / denom) * 100,
        }))
        .filter((r) => r.count > 0)
        .sort((a, b) => b.count - a.count)
        .slice(0, TOP_LANGUAGES);
    languageStats.value.rows = rows;
    languageStats.value.total = total;
};

const loop = (now: number): void => {
    if (now - lastTick >= AGGREGATE_TICK_MS) {
        recompute();
        lastTick = now;
    }
    raf = requestAnimationFrame(loop);
};

export const startAggregation = (): void => {
    if (raf !== undefined) return;
    lastTick = performance.now();
    raf = requestAnimationFrame(loop);
};

export const stopAggregation = (): void => {
    if (raf === undefined) return;
    cancelAnimationFrame(raf);
    raf = undefined;
};
