import { html } from '@neuralfog/elemix';
import type { ElemixMeta, ElemixStory } from '@neuralfog/elemix-storybook';

import '#src/components/metrics/MetricItem';

type Args = {
    label: string;
    value: string;
    variant: '' | 'accent' | 'warn' | 'bot' | 'human';
};

const meta: ElemixMeta<Args> = {
    title: 'Metrics/MetricItem',
    args: { label: 'total events', value: '1,234', variant: '' },
    argTypes: {
        label: { control: 'text' },
        value: { control: 'text' },
        variant: {
            control: 'select',
            options: ['', 'accent', 'warn', 'bot', 'human'],
        },
    },
};
export default meta;

const render = ({ label, value, variant }: Args) =>
    html`<metric-item
        :label=${label}
        :value=${value}
        :variant=${variant}
    ></metric-item>`;

export const Default: ElemixStory<Args> = { render };
export const Accent: ElemixStory<Args> = {
    args: { label: 'events / sec', value: '12.4', variant: 'accent' },
    render,
};
export const Human: ElemixStory<Args> = {
    args: { label: 'humans', value: '4.2K', variant: 'human' },
    render,
};
export const Bot: ElemixStory<Args> = {
    args: { label: 'bots', value: '8.1K', variant: 'bot' },
    render,
};
export const Warn: ElemixStory<Args> = {
    args: { label: 'anon', value: '512', variant: 'warn' },
    render,
};
