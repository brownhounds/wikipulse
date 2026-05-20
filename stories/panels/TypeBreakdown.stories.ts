import { html } from '@neuralfog/elemix';
import type { ElemixMeta, ElemixStory } from '@neuralfog/elemix-storybook';

import { typeCounters } from '#src/signals/typeCounters';
import '#src/components/panels/TypeBreakdown';

type Args = {
    edit: number;
    new: number;
    log: number;
    categorize: number;
    other: number;
};

const meta: ElemixMeta<Args> = {
    title: 'Panels/TypeBreakdown',
    args: { edit: 1240, new: 92, log: 311, categorize: 47, other: 18 },
    argTypes: {
        edit: { control: { type: 'number', min: 0 } },
        new: { control: { type: 'number', min: 0 } },
        log: { control: { type: 'number', min: 0 } },
        categorize: { control: { type: 'number', min: 0 } },
        other: { control: { type: 'number', min: 0 } },
    },
    parameters: {
        elemix: {
            beforeRender: (ctx) => {
                typeCounters.value.edit = ctx.args.edit;
                typeCounters.value.new = ctx.args.new;
                typeCounters.value.log = ctx.args.log;
                typeCounters.value.categorize = ctx.args.categorize;
                typeCounters.value.other = ctx.args.other;
            },
        },
    },
};
export default meta;

const render = () => html`<type-breakdown></type-breakdown>`;

export const Realistic: ElemixStory<Args> = { render };
export const EditsHeavy: ElemixStory<Args> = {
    args: { edit: 5000, new: 50, log: 100, categorize: 10, other: 0 },
    render,
};
export const Balanced: ElemixStory<Args> = {
    args: { edit: 100, new: 100, log: 100, categorize: 100, other: 100 },
    render,
};
export const Empty: ElemixStory<Args> = {
    args: { edit: 0, new: 0, log: 0, categorize: 0, other: 0 },
    render,
};
