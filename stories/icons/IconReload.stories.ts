import { html } from '@neuralfog/elemix';
import type { ElemixMeta, ElemixStory } from '@neuralfog/elemix-storybook';

import '#src/components/icons/IconReload';

const meta: ElemixMeta = { title: 'Icons/IconReload' };
export default meta;

export const Default: ElemixStory = {
    render: () => html`<icon-reload></icon-reload>`,
};
