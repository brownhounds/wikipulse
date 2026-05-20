import { describe, expect, it } from 'vitest';

import { toWikiChange, type RawChange } from '#src/sse/parse';

const NOW = 1_700_000_000_000;

const base: RawChange = {
    id: 42,
    type: 'edit',
    title: 'Test',
    title_url: 'https://en.wikipedia.org/wiki/Test',
    user: 'Alice',
    bot: false,
    minor: false,
    timestamp: 1_700_000_000,
    length: { old: 100, new: 250 },
    comment: 'tweak',
    meta: { domain: 'en.wikipedia.org' },
};

describe('toWikiChange', () => {
    it('maps a basic edit correctly', () => {
        const change = toWikiChange(base, NOW);
        expect(change.id).toBe('42');
        expect(change.type).toBe('edit');
        expect(change.title).toBe('Test');
        expect(change.user).toBe('Alice');
        expect(change.lang).toBe('en');
        expect(change.delta).toBe(150);
        expect(change.timestamp).toBe(1_700_000_000_000);
        expect(change.anon).toBe(false);
        expect(change.bot).toBe(false);
    });

    it('falls back to now when timestamp missing', () => {
        const { timestamp: _ignore, ...rest } = base;
        const change = toWikiChange(rest, NOW);
        expect(change.timestamp).toBe(NOW);
    });

    it('falls back to "other" for unknown types', () => {
        const change = toWikiChange({ ...base, type: 'flagged' }, NOW);
        expect(change.type).toBe('other');
    });

    it('flags IPv4 user as anon', () => {
        const change = toWikiChange({ ...base, user: '192.168.1.1' }, NOW);
        expect(change.anon).toBe(true);
    });

    it('flags IPv6 user as anon', () => {
        const change = toWikiChange({ ...base, user: '2001:db8::1' }, NOW);
        expect(change.anon).toBe(true);
    });

    it('does not flag empty user as anon', () => {
        const change = toWikiChange({ ...base, user: '' }, NOW);
        expect(change.anon).toBe(false);
    });

    it('extracts wikipedia language code', () => {
        const change = toWikiChange(
            { ...base, meta: { domain: 'de.wikipedia.org' } },
            NOW,
        );
        expect(change.lang).toBe('de');
    });

    it('recognises commons / meta / wikidata', () => {
        expect(
            toWikiChange(
                { ...base, meta: { domain: 'commons.wikimedia.org' } },
                NOW,
            ).lang,
        ).toBe('commons');
        expect(
            toWikiChange(
                { ...base, meta: { domain: 'meta.wikimedia.org' } },
                NOW,
            ).lang,
        ).toBe('meta');
        expect(
            toWikiChange({ ...base, meta: { domain: 'www.wikidata.org' } }, NOW)
                .lang,
        ).toBe('wikidata');
    });

    it('prefixes wiktionary languages', () => {
        const change = toWikiChange(
            { ...base, meta: { domain: 'fr.wiktionary.org' } },
            NOW,
        );
        expect(change.lang).toBe('wikt:fr');
    });

    it('computes negative delta for deletions', () => {
        const change = toWikiChange(
            { ...base, length: { old: 500, new: 200 } },
            NOW,
        );
        expect(change.delta).toBe(-300);
    });

    it('handles missing length object', () => {
        const change = toWikiChange({ ...base, length: undefined }, NOW);
        expect(change.delta).toBe(0);
    });

    it('uses meta.id when raw.id is missing', () => {
        const change = toWikiChange(
            { ...base, id: undefined, meta: { ...base.meta, id: 'abc' } },
            NOW,
        );
        expect(change.id).toBe('abc');
    });
});
