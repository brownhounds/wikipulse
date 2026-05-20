import { MAX_EVENTS_PER_LANG, ROLLING_WINDOW_MS } from '#src/config';

const buckets: Record<string, number[]> = {};
let totalCount = 0;

const pruneOne = (arr: number[], cutoff: number): number => {
    let head = 0;
    while (head < arr.length && arr[head] < cutoff) head++;
    if (head > 0) arr.splice(0, head);
    return head;
};

export const pushEvent = (lang: string, now: number): void => {
    if (!buckets[lang]) buckets[lang] = [];
    buckets[lang].push(now);
    totalCount += 1;
    pruneStale(now);
};

export const pruneStale = (now: number): void => {
    const cutoff = now - ROLLING_WINDOW_MS;
    let removed = 0;
    for (const lang of Object.keys(buckets)) {
        const arr = buckets[lang];
        removed += pruneOne(arr, cutoff);
        if (arr.length === 0) delete buckets[lang];
    }
    totalCount -= removed;
    if (totalCount < 0) totalCount = 0;
    for (const lang of Object.keys(buckets)) {
        const arr = buckets[lang];
        if (arr.length > MAX_EVENTS_PER_LANG) {
            const excess = arr.length - MAX_EVENTS_PER_LANG;
            arr.splice(0, excess);
            totalCount -= excess;
        }
    }
};

export const windowTotal = (): number => totalCount;
export const windowSec = (): number => ROLLING_WINDOW_MS / 1000;

export const oldestTimestamp = (): number | undefined => {
    let min: number | undefined;
    for (const lang of Object.keys(buckets)) {
        const arr = buckets[lang];
        const head = arr[0];
        if (head !== undefined && (min === undefined || head < min)) {
            min = head;
        }
    }
    return min;
};

export const langCounts = (): Record<string, number> => {
    const out: Record<string, number> = {};
    for (const lang of Object.keys(buckets)) {
        out[lang] = buckets[lang].length;
    }
    return out;
};

export const resetWindow = (): void => {
    for (const lang of Object.keys(buckets)) delete buckets[lang];
    totalCount = 0;
};
