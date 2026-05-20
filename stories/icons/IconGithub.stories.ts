import { html } from '@neuralfog/elemix';
import type { ElemixMeta, ElemixStory } from '@neuralfog/elemix-storybook';

import '#src/components/icons/IconGithub';

const meta: ElemixMeta = { title: 'Icons/IconGithub' };
export default meta;

export const Default: ElemixStory = {
    render: () => html`<icon-github></icon-github>`,
};
