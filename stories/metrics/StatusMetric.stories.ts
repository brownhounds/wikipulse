import { html } from '@neuralfog/elemix';
import type { ElemixMeta, ElemixStory } from '@neuralfog/elemix-storybook';

import { streamStatus } from '#src/signals/streamStatus';
import '#src/components/metrics/StatusMetric';

type Args = {
    streaming: boolean;
    connected: boolean;
};

const meta: ElemixMeta<Args> = {
    title: 'Metrics/StatusMetric',
    args: { streaming: true, connected: true },
    argTypes: {
        streaming: { control: 'boolean' },
        connected: { control: 'boolean' },
    },
    parameters: {
        elemix: {
            beforeRender: (ctx) => {
                streamStatus.value.streaming = ctx.args.streaming;
                streamStatus.value.connected = ctx.args.connected;
            },
        },
    },
};
export default meta;

const render = () => html`<status-metric></status-metric>`;

export const Streaming: ElemixStory<Args> = {
    args: { streaming: true, connected: true },
    render,
};
export const Connecting: ElemixStory<Args> = {
    args: { streaming: true, connected: false },
    render,
};
export const Paused: ElemixStory<Args> = {
    args: { streaming: false, connected: false },
    render,
};
