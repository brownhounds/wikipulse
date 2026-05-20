import { signal } from '@neuralfog/elemix/signal';
import type { WikiChange } from '#src/signals/recentChanges';

export const edits = signal({
    list: [] as WikiChange[],
});
