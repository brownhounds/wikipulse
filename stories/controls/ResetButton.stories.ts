import { html } from '@neuralfog/elemix';
import type { ElemixMeta, ElemixStory } from '@neuralfog/elemix-storybook';

import '#src/components/controls/ResetButton';

const meta: ElemixMeta = { title: 'Controls/ResetButton' };
export default meta;

export const Default: ElemixStory = {
    render: () => html`<reset-button></reset-button>`,
};
