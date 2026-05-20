import { html } from '@neuralfog/elemix';
import type { ElemixMeta, ElemixStory } from '@neuralfog/elemix-storybook';

import { languageStats } from '#src/signals/languageStats';
import '#src/components/panels/LanguagesPanel';

const SAMPLE = [
    { lang: 'commons', count: 412 },
    { lang: 'wikidata', count: 318 },
    { lang: 'en', count: 207 },
    { lang: 'de', count: 96 },
    { lang: 'fr', count: 71 },
    { lang: 'es', count: 52 },
    { lang: 'ja', count: 40 },
    { lang: 'ru', count: 35 },
    { lang: 'pl', count: 22 },
    { lang: 'it', count: 18 },
    { lang: 'zh', count: 14 },
    { lang: 'pt', count: 11 },
];

type Args = { rows: number; scale: number };

const meta: ElemixMeta<Args> = {
    title: 'Panels/LanguagesPanel',
    args: { rows: 8, scale: 1 },
    argTypes: {
        rows: { control: { type: 'number', min: 0, max: 12 } },
        scale: { control: { type: 'number', min: 0.1, max: 5, step: 0.1 } },
    },
    parameters: {
        elemix: {
            beforeRender: (ctx) => {
                const slice = SAMPLE.slice(0, ctx.args.rows).map((r) => ({
                    lang: r.lang,
                    count: Math.round(r.count * ctx.args.scale),
                    pct: 0,
                }));
                const total = slice.reduce((s, r) => s + r.count, 0);
                languageStats.value.rows = slice.map((r) => ({
                    ...r,
                    pct: total ? (r.count / total) * 100 : 0,
                }));
                languageStats.value.total = total;
                languageStats.value.windowSec = 60;
            },
        },
    },
};
export default meta;

const render = () => html`<languages-panel></languages-panel>`;

export const Default: ElemixStory<Args> = {
    args: { rows: 8, scale: 1 },
    render,
};
export const Full: ElemixStory<Args> = { args: { rows: 12, scale: 1 }, render };
export const HighVolume: ElemixStory<Args> = {
    args: { rows: 12, scale: 4 },
    render,
};
export const Empty: ElemixStory<Args> = { args: { rows: 0, scale: 1 }, render };
