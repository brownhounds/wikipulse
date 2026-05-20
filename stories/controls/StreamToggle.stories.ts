import { html } from '@neuralfog/elemix';
import type { ElemixMeta, ElemixStory } from '@neuralfog/elemix-storybook';

import { streamStatus } from '#src/signals/streamStatus';
import '#src/components/controls/StreamToggle';

type Args = { streaming: boolean };

const meta: ElemixMeta<Args> = {
    title: 'Controls/StreamToggle',
    args: { streaming: false },
    argTypes: { streaming: { control: 'boolean' } },
    parameters: {
        elemix: {
            beforeRender: (ctx) => {
                streamStatus.value.streaming = ctx.args.streaming;
            },
        },
    },
};
export default meta;

const render = () => html`<stream-toggle></stream-toggle>`;

export const Paused: ElemixStory<Args> = {
    args: { streaming: false },
    render,
};
export const Streaming: ElemixStory<Args> = {
    args: { streaming: true },
    render,
};
