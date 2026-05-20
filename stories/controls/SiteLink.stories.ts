import { html } from '@neuralfog/elemix';
import type { ElemixMeta, ElemixStory } from '@neuralfog/elemix-storybook';

import '#src/components/controls/SiteLink';

const meta: ElemixMeta = { title: 'Controls/SiteLink' };
export default meta;

export const Default: ElemixStory = {
    render: () => html`<site-link></site-link>`,
};
