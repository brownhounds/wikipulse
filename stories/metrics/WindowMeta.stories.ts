import { html } from '@neuralfog/elemix';
import type { ElemixMeta, ElemixStory } from '@neuralfog/elemix-storybook';

import '#src/components/metrics/WindowMeta';

type Args = { windowSec: number; count: number };

const meta: ElemixMeta<Args> = {
    title: 'Metrics/WindowMeta',
    args: { windowSec: 60, count: 1234 },
    argTypes: {
        windowSec: { control: { type: 'number', min: 1, max: 600 } },
        count: { control: { type: 'number', min: 0 } },
    },
};
export default meta;

export const Default: ElemixStory<Args> = {
    render: ({ windowSec, count }) =>
        html`<window-meta
            :windowSec=${windowSec}
            :count=${count}
        ></window-meta>`,
};
