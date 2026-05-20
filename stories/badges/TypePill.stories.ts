import { html } from '@neuralfog/elemix';
import type { ElemixMeta, ElemixStory } from '@neuralfog/elemix-storybook';

import type { WikiChangeType } from '#src/signals/recentChanges';
import '#src/components/badges/TypePill';

type Args = { type: WikiChangeType };

const meta: ElemixMeta<Args> = {
    title: 'Badges/TypePill',
    args: { type: 'edit' },
    argTypes: {
        type: {
            control: 'select',
            options: ['edit', 'new', 'log', 'categorize', 'other'],
        },
    },
};
export default meta;

const render = ({ type }: Args) => html`<type-pill :type=${type}></type-pill>`;

export const Edit: ElemixStory<Args> = { args: { type: 'edit' }, render };
export const New: ElemixStory<Args> = { args: { type: 'new' }, render };
export const Log: ElemixStory<Args> = { args: { type: 'log' }, render };
export const Categorize: ElemixStory<Args> = {
    args: { type: 'categorize' },
    render,
};
export const Other: ElemixStory<Args> = { args: { type: 'other' }, render };

export const All: ElemixStory<Args> = {
    args: { type: 'edit' },
    render: () => html`
        <div style="display:flex;flex-wrap:wrap;gap:0.5rem;">
            <type-pill :type=${'edit'}></type-pill>
            <type-pill :type=${'new'}></type-pill>
            <type-pill :type=${'log'}></type-pill>
            <type-pill :type=${'categorize'}></type-pill>
            <type-pill :type=${'other'}></type-pill>
        </div>
    `,
};
