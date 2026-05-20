import { signal } from '@neuralfog/elemix/signal';

export const streamStatus = signal({
    streaming: false,
    connected: false,
    totalEvents: 0,
    eps: 0,
    botCount: 0,
    humanCount: 0,
    anonCount: 0,
});
