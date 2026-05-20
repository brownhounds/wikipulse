import type { WikiChange, WikiChangeType } from '#src/signals/recentChanges';

export type RawChange = {
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

export const toWikiChange = (raw: RawChange, now: number): WikiChange => {
    const user = raw.user || '';
    const domain = raw.meta?.domain || raw.server_name || 'unknown';
    return {
        id: String(raw.id ?? raw.meta?.id ?? now),
        type: classifyType(raw.type),
        title: raw.title ?? '(untitled)',
        titleUrl: raw.title_url ?? '',
        user,
        bot: !!raw.bot,
        minor: !!raw.minor,
        anon: user !== '' && isIpAddress(user),
        domain,
        lang: langFromDomain(domain),
        delta: (raw.length?.new ?? 0) - (raw.length?.old ?? 0),
        timestamp: raw.timestamp ? raw.timestamp * 1000 : now,
        comment: raw.comment ?? raw.parsedcomment ?? '',
    };
};
