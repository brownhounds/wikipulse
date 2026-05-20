import { Component, html, type Template } from '@neuralfog/elemix';
import { component } from '@neuralfog/elemix/decorators';
import { repeat } from '@neuralfog/elemix/directives';

import { recentChanges, type WikiChange } from '#src/signals/recentChanges';
import { EDIT_DELTA_THRESHOLD } from '#src/config';
import { formatSignedCompact } from '#src/utils/format';
import css from '#src/components/panels/FeedPanel.scss?inline';

import '#src/components/badges/LangPill';
import '#src/components/badges/TypePill';

const isNotable = (delta: number): boolean =>
    Math.abs(delta) >= EDIT_DELTA_THRESHOLD;

const rowClassFor = (ev: WikiChange): string =>
    `row${isNotable(ev.delta) ? ' big' : ''}${ev.bot ? ' bot-row' : ''}`;

const deltaClassFor = (delta: number): string => {
    if (delta > 0) return 'delta pos';
    if (delta < 0) return 'delta neg';
    return 'delta zero';
};

@component({ signals: [recentChanges], styles: [css] })
export class FeedPanel extends Component {
    private get list(): WikiChange[] {
        return recentChanges.value.list;
    }

    private static renderRow(ev: WikiChange): Template {
        const { type, title, titleUrl, user, bot, minor, anon, lang, delta } =
            ev;
        return html`<div class=${rowClassFor(ev)}>
            <lang-pill :lang=${lang}></lang-pill>
            <div class="body">
                <div class="title-line">
                    <a href=${titleUrl} target="_blank" rel="noopener">
                        ${title}
                    </a>
                </div>
                <div class="meta-line">
                    ${bot ? html`<span class="tag bot">bot</span>` : html``}
                    ${minor ? html`<span class="tag minor">minor</span>` : html``}
                    ${anon ? html`<span class="tag anon">anon</span>` : html``}
                    ${user || '—'}
                </div>
            </div>
            <type-pill :type=${type}></type-pill>
            <span class=${deltaClassFor(delta)}>${formatSignedCompact(delta)}</span>
        </div>`;
    }

    template(): Template {
        const { list } = this;
        return html`
            <div class="title">
                <span class="lbl">live feed</span>
                <span class="hint">${list.length} recent</span>
            </div>
            <div class="list">
                ${repeat(list, FeedPanel.renderRow, (ev) => ev.id)}
                ${list.length === 0 ? html`<div class="empty">Waiting for events…</div>` : html``}
            </div>
        `;
    }
}
