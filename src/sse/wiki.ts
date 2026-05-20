import {
    EDIT_DELTA_THRESHOLD,
    MAX_EDITS,
    MAX_FEED_ITEMS,
    SSE_URL,
} from '#src/config';
import { recentChanges } from '#src/signals/recentChanges';
import { streamStatus } from '#src/signals/streamStatus';
import { typeCounters } from '#src/signals/typeCounters';
import { edits } from '#src/signals/edits';
import { languageStats } from '#src/signals/languageStats';
import { type RawChange, toWikiChange } from '#src/sse/parse';
import { pushEvent, resetWindow } from '#src/sse/window';
import { startAggregation, stopAggregation } from '#src/sse/aggregator';

const onEvent = (raw: RawChange): void => {
    const now = Date.now();
    const change = toWikiChange(raw, now);

    streamStatus.value.totalEvents += 1;
    if (change.bot) streamStatus.value.botCount += 1;
    else streamStatus.value.humanCount += 1;
    if (change.anon) streamStatus.value.anonCount += 1;

    typeCounters.value[change.type] += 1;

    pushEvent(change.lang, now);

    recentChanges.value.list.unshift(change);
    if (recentChanges.value.list.length > MAX_FEED_ITEMS) {
        recentChanges.value.list.length = MAX_FEED_ITEMS;
    }

    if (Math.abs(change.delta) >= EDIT_DELTA_THRESHOLD) {
        edits.value.list.unshift(change);
        if (edits.value.list.length > MAX_EDITS) {
            edits.value.list.length = MAX_EDITS;
        }
    }
};

let es: EventSource | undefined;

export const startStream = (): void => {
    if (es) return;
    streamStatus.value.streaming = true;
    es = new EventSource(SSE_URL);
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
    startAggregation();
};

export const stopStream = (): void => {
    if (es) {
        es.close();
        es = undefined;
    }
    stopAggregation();
    streamStatus.value.streaming = false;
    streamStatus.value.connected = false;
};

export const toggleStream = (): void => {
    if (streamStatus.value.streaming) stopStream();
    else startStream();
};

const clearAllSignals = (): void => {
    streamStatus.value.totalEvents = 0;
    streamStatus.value.eps = 0;
    streamStatus.value.botCount = 0;
    streamStatus.value.humanCount = 0;
    streamStatus.value.anonCount = 0;

    recentChanges.value.list = [];
    edits.value.list = [];

    languageStats.value.rows = [];
    languageStats.value.total = 0;

    typeCounters.value.edit = 0;
    typeCounters.value.new = 0;
    typeCounters.value.log = 0;
    typeCounters.value.categorize = 0;
    typeCounters.value.other = 0;

    resetWindow();
};

export const resetStream = (): void => {
    stopStream();
    clearAllSignals();
    startStream();
};
