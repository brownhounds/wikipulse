import { signal } from '@neuralfog/elemix/signal';

export type LanguageStat = {
    lang: string;
    count: number;
    pct: number;
};

export const languageStats = signal({
    rows: [] as LanguageStat[],
    total: 0,
    windowSec: 60,
});
