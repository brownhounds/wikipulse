import { afterEach, describe, expect, it } from 'vitest';

import {
    langCounts,
    pruneStale,
    pushEvent,
    windowSec,
    windowTotal,
} from '#src/sse/window';

const drain = (): void => {
    pruneStale(Date.now() + windowSec() * 1000 * 2);
};

afterEach(() => {
    drain();
});

describe('window', () => {
    it('starts empty', () => {
        drain();
        expect(windowTotal()).toBe(0);
        expect(langCounts()).toEqual({});
    });

    it('counts pushed events per language', () => {
        drain();
        const now = Date.now();
        pushEvent('en', now);
        pushEvent('en', now);
        pushEvent('de', now);
        expect(windowTotal()).toBe(3);
        expect(langCounts()).toEqual({ en: 2, de: 1 });
    });

    it('prunes events older than the rolling window', () => {
        drain();
        const old = Date.now() - (windowSec() * 1000 + 10);
        const now = Date.now();
        pushEvent('en', old);
        pushEvent('en', now);
        expect(windowTotal()).toBe(1);
        expect(langCounts()).toEqual({ en: 1 });
    });

    it('deletes the bucket when a language drains', () => {
        drain();
        const old = Date.now() - (windowSec() * 1000 + 10);
        pushEvent('rare-lang', old);
        pruneStale(Date.now());
        expect('rare-lang' in langCounts()).toBe(false);
    });

    it('keeps totalCount in sync with bucket sizes', () => {
        drain();
        const now = Date.now();
        for (let i = 0; i < 50; i++) pushEvent('fr', now);
        for (let i = 0; i < 20; i++) pushEvent('es', now);
        const counts = langCounts();
        const sum = Object.values(counts).reduce((a, b) => a + b, 0);
        expect(sum).toBe(windowTotal());
        expect(windowTotal()).toBe(70);
    });
});
