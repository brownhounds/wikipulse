import {
    recentChanges,
    MAX_FEED_ITEMS,
    type WikiChange,
    type WikiChangeType,
} from '#src/signals/recentChanges';
import { streamStatus } from '#src/signals/streamStatus';
import { languageStats, type LanguageStat } from '#src/signals/languageStats';
import { typeCounters } from '#src/signals/typeCounters';
import {
    notableChanges,
    MAX_NOTABLE_ITEMS,
    NOTABLE_DELTA_THRESHOLD,
} from '#src/signals/notableChanges';

const URL = 'https://stream.wikimedia.org/v2/stream/recentchange';
const ROLLING_WINDOW_MS = 60_000;
const MAX_RING = 5000;

type RawChange = {
    meta?: { id?: string; dt?: string; domain?: string };
    id?: number;
    type?: string;
    title?: string;
    title_url?: string;
    user?: string;
    bot?: boolean;
    minor?: boolean;
    timestamp?: number;
    length?: { old?: number; new?: number };
    comment?: string;
    parsedcomment?: string;
    server_name?: string;
};

// per-language arrays of event timestamps; each entry is independently aged out
const langWindows: Record<string, number[]> = {};
let totalEventsInWindow = 0;

const pruneLang = (arr: number[], cutoff: number): number => {
    let head = 0;
    while (head < arr.length && arr[head] < cutoff) head++;
    if (head > 0) arr.splice(0, head);
    return head;
};

const pruneAll = (now: number): void => {
    const cutoff = now - ROLLING_WINDOW_MS;
    let removed = 0;
    for (const lang of Object.keys(langWindows)) {
        const arr = langWindows[lang];
        removed += pruneLang(arr, cutoff);
        if (arr.length === 0) delete langWindows[lang];
    }
    totalEventsInWindow -= removed;
    if (totalEventsInWindow < 0) totalEventsInWindow = 0;
    // hard safety cap per language
    for (const lang of Object.keys(langWindows)) {
        const arr = langWindows[lang];
        if (arr.length > MAX_RING) {
            const excess = arr.length - MAX_RING;
            arr.splice(0, excess);
            totalEventsInWindow -= excess;
        }
    }
};

const isIpAddress = (s: string): boolean =>
    /^\d{1,3}(\.\d{1,3}){3}$/.test(s) || /^[0-9a-fA-F:]{3,}$/.test(s);

const langFromDomain = (domain: string): string => {
    if (!domain) return 'unknown';
    const parts = domain.split('.');
    if (parts.length >= 3 && parts[1] === 'wikipedia') return parts[0];
    if (parts[0] === 'commons') return 'commons';
    if (parts[0] === 'meta') return 'meta';
    if (parts.length >= 2 && parts[1] === 'wikidata') return 'wikidata';
    if (parts.length >= 3 && parts[1] === 'wiktionary')
        return `wikt:${parts[0]}`;
    return parts[0] ?? 'unknown';
};

const classifyType = (t: string | undefined): WikiChangeType => {
    if (t === 'edit' || t === 'new' || t === 'log' || t === 'categorize')
        return t;
    return 'other';
};

const onEvent = (raw: RawChange): void => {
    const now = Date.now();
    const user = raw.user || '';
    const anon = user !== '' && isIpAddress(user);
    const domain = raw.meta?.domain || raw.server_name || 'unknown';
    const lang = langFromDomain(domain);
    const delta = (raw.length?.new ?? 0) - (raw.length?.old ?? 0);
    const type = classifyType(raw.type);

    const change: WikiChange = {
        id: String(raw.id ?? raw.meta?.id ?? now),
        type,
        title: raw.title ?? '(untitled)',
        titleUrl: raw.title_url ?? '',
        user,
        bot: !!raw.bot,
        minor: !!raw.minor,
        anon,
        domain,
        lang,
        delta,
        timestamp: raw.timestamp ? raw.timestamp * 1000 : now,
        comment: raw.comment ?? raw.parsedcomment ?? '',
    };

    streamStatus.value.totalEvents += 1;
    if (change.bot) streamStatus.value.botCount += 1;
    else streamStatus.value.humanCount += 1;
    if (change.anon) streamStatus.value.anonCount += 1;

    typeCounters.value[type] += 1;

    if (!langWindows[lang]) langWindows[lang] = [];
    langWindows[lang].push(now);
    totalEventsInWindow += 1;
    pruneAll(now);

    recentChanges.value.list.unshift(change);
    if (recentChanges.value.list.length > MAX_FEED_ITEMS) {
        recentChanges.value.list.length = MAX_FEED_ITEMS;
    }

    if (Math.abs(delta) >= NOTABLE_DELTA_THRESHOLD) {
        notableChanges.value.list.unshift(change);
        if (notableChanges.value.list.length > MAX_NOTABLE_ITEMS) {
            notableChanges.value.list.length = MAX_NOTABLE_ITEMS;
        }
    }
};

const recomputeAggregates = (): void => {
    pruneAll(Date.now());
    const windowSec = ROLLING_WINDOW_MS / 1000;
    streamStatus.value.eps =
        Math.round((totalEventsInWindow / windowSec) * 10) / 10;

    const total = totalEventsInWindow || 1;
    const rows: LanguageStat[] = Object.entries(langWindows)
        .map(([lang, arr]) => ({
            lang,
            count: arr.length,
            pct: (arr.length / total) * 100,
        }))
        .filter((r) => r.count > 0)
        .sort((a, b) => b.count - a.count)
        .slice(0, 12);
    languageStats.value.rows = rows;
    languageStats.value.total = totalEventsInWindow;
};

let es: EventSource | undefined;
let aggRaf: number | undefined;
let aggLastRun = 0;
const AGG_INTERVAL_MS = 1000;

const aggLoop = (now: number): void => {
    if (now - aggLastRun >= AGG_INTERVAL_MS) {
        recomputeAggregates();
        aggLastRun = now;
    }
    aggRaf = requestAnimationFrame(aggLoop);
};

export const startStream = (): void => {
    if (es) return;
    streamStatus.value.streaming = true;
    es = new EventSource(URL);
    es.onopen = (): void => {
        streamStatus.value.connected = true;
    };
    es.onerror = (): void => {
        streamStatus.value.connected = false;
    };
    es.onmessage = (msg: MessageEvent<string>): void => {
        try {
            const raw = JSON.parse(msg.data) as RawChange;
            onEvent(raw);
        } catch (err) {
            console.warn('wiki SSE: failed to parse message', err);
        }
    };
    if (aggRaf === undefined) {
        aggLastRun = performance.now();
        aggRaf = requestAnimationFrame(aggLoop);
    }
};

export const stopStream = (): void => {
    if (es) {
        es.close();
        es = undefined;
    }
    if (aggRaf !== undefined) {
        cancelAnimationFrame(aggRaf);
        aggRaf = undefined;
    }
    streamStatus.value.streaming = false;
    streamStatus.value.connected = false;
};

export const toggleStream = (): void => {
    if (streamStatus.value.streaming) stopStream();
    else startStream();
};
