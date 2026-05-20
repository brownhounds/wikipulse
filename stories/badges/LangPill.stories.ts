import { html } from '@neuralfog/elemix';
import type { ElemixMeta, ElemixStory } from '@neuralfog/elemix-storybook';

import '#src/components/badges/LangPill';

type Args = { lang: string };

const meta: ElemixMeta<Args> = {
    title: 'Badges/LangPill',
    args: { lang: 'en' },
    argTypes: { lang: { control: 'text' } },
};
export default meta;

const render = ({ lang }: Args) => html`<lang-pill :lang=${lang}></lang-pill>`;

export const English: ElemixStory<Args> = { args: { lang: 'en' }, render };
export const German: ElemixStory<Args> = { args: { lang: 'de' }, render };
export const Japanese: ElemixStory<Args> = { args: { lang: 'ja' }, render };
export const Commons: ElemixStory<Args> = { args: { lang: 'commons' }, render };
export const Wikidata: ElemixStory<Args> = {
    args: { lang: 'wikidata' },
    render,
};
export const Wiktionary: ElemixStory<Args> = {
    args: { lang: 'wikt:fr' },
    render,
};

export const All: ElemixStory<Args> = {
    args: { lang: '' },
    render: () => html`
        <div style="display:flex;flex-wrap:wrap;gap:0.5rem;max-width:30rem;">
            <lang-pill :lang=${'en'}></lang-pill>
            <lang-pill :lang=${'de'}></lang-pill>
            <lang-pill :lang=${'fr'}></lang-pill>
            <lang-pill :lang=${'es'}></lang-pill>
            <lang-pill :lang=${'ja'}></lang-pill>
            <lang-pill :lang=${'ru'}></lang-pill>
            <lang-pill :lang=${'pl'}></lang-pill>
            <lang-pill :lang=${'zh'}></lang-pill>
            <lang-pill :lang=${'commons'}></lang-pill>
            <lang-pill :lang=${'wikidata'}></lang-pill>
            <lang-pill :lang=${'meta'}></lang-pill>
            <lang-pill :lang=${'wikt:en'}></lang-pill>
        </div>
    `,
};
