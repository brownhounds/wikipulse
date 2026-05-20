import { signal } from '@neuralfog/elemix/signal';

export type WikiChangeType = 'edit' | 'new' | 'log' | 'categorize' | 'other';

export type WikiChange = {
    id: string;
    type: WikiChangeType;
    title: string;
    titleUrl: string;
    user: string;
    bot: boolean;
    minor: boolean;
    anon: boolean;
    domain: string;
    lang: string;
    delta: number;
    timestamp: number;
    comment: string;
};

export const recentChanges = signal({
    list: [] as WikiChange[],
});
