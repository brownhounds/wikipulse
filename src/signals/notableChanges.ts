import { signal } from '@neuralfog/elemix/signal';
import type { WikiChange } from '#src/signals/recentChanges';

export const MAX_NOTABLE_ITEMS = 10;
export const NOTABLE_DELTA_THRESHOLD = 1000;

export const notableChanges = signal({
    list: [] as WikiChange[],
});
