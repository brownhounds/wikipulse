import { signal } from '@neuralfog/elemix/signal';

export const typeCounters = signal({
    edit: 0,
    new: 0,
    log: 0,
    categorize: 0,
    other: 0,
});
