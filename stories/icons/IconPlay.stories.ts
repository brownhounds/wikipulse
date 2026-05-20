import { html } from '@neuralfog/elemix';
import type { ElemixMeta, ElemixStory } from '@neuralfog/elemix-storybook';

import '#src/components/icons/IconPlay';

const meta: ElemixMeta = { title: 'Icons/IconPlay' };
export default meta;

export const Default: ElemixStory = {
    render: () => html`<icon-play></icon-play>`,
};
