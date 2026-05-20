import { html } from '@neuralfog/elemix';
import type { ElemixMeta, ElemixStory } from '@neuralfog/elemix-storybook';

import '#src/components/controls/GithubLink';

const meta: ElemixMeta = { title: 'Controls/GithubLink' };
export default meta;

export const Default: ElemixStory = {
    render: () => html`<github-link></github-link>`,
};
