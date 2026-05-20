import { html } from '@neuralfog/elemix';
import type { ElemixMeta, ElemixStory } from '@neuralfog/elemix-storybook';

import { recentChanges, type WikiChange } from '#src/signals/recentChanges';
import '#src/components/panels/FeedPanel';

const LANGS = ['en', 'de', 'fr', 'es', 'ja', 'pl', 'ru', 'commons', 'wikidata'];

const mockChange = (
    i: number,
    overrides: Partial<WikiChange> = {},
): WikiChange => {
    const lang = LANGS[i % LANGS.length];
    return {
        id: `mock-${i}`,
        type: i % 11 === 0 ? 'new' : i % 13 === 0 ? 'log' : 'edit',
        title: `Article number ${i}`,
        titleUrl: `https://${lang}.wikipedia.org/wiki/Article_${i}`,
        user: i % 4 === 0 ? '198.51.100.42' : `Editor_${i}`,
        bot: i % 5 === 0,
        minor: i % 7 === 0,
        anon: i % 4 === 0,
        domain: `${lang}.wikipedia.org`,
        lang,
        delta: (((i * 137) % 4000) - 1500) | 0,
        timestamp: Date.now() - i * 1000,
        comment: 'mock edit',
        ...overrides,
    };
};

type Args = { count: number };

const meta: ElemixMeta<Args> = {
    title: 'Panels/FeedPanel',
    args: { count: 8 },
    argTypes: {
        count: { control: { type: 'number', min: 0, max: 15 } },
    },
    parameters: {
        elemix: {
            beforeRender: (ctx) => {
                recentChanges.value.list = Array.from(
                    { length: ctx.args.count },
                    (_, i) => mockChange(i),
                );
            },
        },
    },
};
export default meta;

const render = () => html`<feed-panel></feed-panel>`;

export const Populated: ElemixStory<Args> = { args: { count: 8 }, render };
export const Full: ElemixStory<Args> = { args: { count: 15 }, render };
export const Empty: ElemixStory<Args> = { args: { count: 0 }, render };
