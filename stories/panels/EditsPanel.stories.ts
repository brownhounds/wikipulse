import { html } from '@neuralfog/elemix';
import type { ElemixMeta, ElemixStory } from '@neuralfog/elemix-storybook';

import { edits } from '#src/signals/edits';
import type { WikiChange } from '#src/signals/recentChanges';
import '#src/components/panels/EditsPanel';

const LANGS = ['en', 'de', 'fr', 'es', 'ja', 'commons', 'wikidata'];

const mockNotable = (i: number): WikiChange => {
    const lang = LANGS[i % LANGS.length];
    return {
        id: `big-${i}`,
        type: 'edit',
        title: `Big edit ${i}`,
        titleUrl: `https://${lang}.wikipedia.org/wiki/Big_${i}`,
        user: i % 3 === 0 ? '203.0.113.5' : `Contributor_${i}`,
        bot: i % 6 === 0,
        minor: false,
        anon: i % 3 === 0,
        domain: `${lang}.wikipedia.org`,
        lang,
        delta: (((i * 1789) % 8000) - 4000) | 0,
        timestamp: Date.now() - i * 12000,
        comment: 'sizeable change',
    };
};

type Args = { count: number };

const meta: ElemixMeta<Args> = {
    title: 'Panels/EditsPanel',
    args: { count: 6 },
    argTypes: {
        count: { control: { type: 'number', min: 0, max: 10 } },
    },
    parameters: {
        elemix: {
            beforeRender: (ctx) => {
                edits.value.list = Array.from(
                    { length: ctx.args.count },
                    (_, i) => mockNotable(i),
                );
            },
        },
    },
};
export default meta;

const render = () => html`<edits-panel></edits-panel>`;

export const Populated: ElemixStory<Args> = { args: { count: 6 }, render };
export const Full: ElemixStory<Args> = { args: { count: 10 }, render };
export const Empty: ElemixStory<Args> = { args: { count: 0 }, render };
