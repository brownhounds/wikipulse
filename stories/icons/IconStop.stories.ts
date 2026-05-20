import { html } from '@neuralfog/elemix';
import type { ElemixMeta, ElemixStory } from '@neuralfog/elemix-storybook';

import '#src/components/icons/IconStop';

const meta: ElemixMeta = { title: 'Icons/IconStop' };
export default meta;

export const Default: ElemixStory = {
    render: () => html`<icon-stop></icon-stop>`,
};
