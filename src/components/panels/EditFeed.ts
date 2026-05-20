import { Component, html, type Template } from '@neuralfog/elemix';
import { component } from '@neuralfog/elemix/decorators';
import { repeat } from '@neuralfog/elemix/directives';

import { recentChanges, type WikiChange } from '#src/signals/recentChanges';
import { NOTABLE_DELTA_THRESHOLD } from '#src/signals/notableChanges';
import { langColor, langColorSoft } from '#src/utils/lang';
import { formatSignedCompact } from '#src/utils/format';
import css from '#src/components/panels/EditFeed.scss?inline';

const isNotable = (delta: number): boolean =>
    Math.abs(delta) >= NOTABLE_DELTA_THRESHOLD;

const rowClassFor = (ev: WikiChange): string =>
    `row${isNotable(ev.delta) ? ' big' : ''}${ev.bot ? ' bot-row' : ''}`;

const deltaClassFor = (delta: number): string => {
    if (delta > 0) return 'delta pos';
    if (delta < 0) return 'delta neg';
    return 'delta zero';
};

const langStyleFor = (lang: string): string =>
    `color:${langColor(lang)};background:${langColorSoft(lang)}`;

const typeClassFor = (type: string): string => `type ${type}`;

@component({ signals: [recentChanges], styles: [css] })
export class EditFeed extends Component {
    private get list(): WikiChange[] {
        return recentChanges.value.list;
    }

    private get body(): Template {
        if (this.list.length === 0) {
            return html`<div class="empty">waiting for events…</div>`;
        }
        return html`${repeat(this.list, EditFeed.renderRow, (ev) => ev.id)}`;
    }

    private static renderRow(ev: WikiChange): Template {
        const { type, title, titleUrl, user, bot, minor, anon, lang, delta } = ev;
        return html`<div class=${rowClassFor(ev)}>
            <span class="lang" style=${langStyleFor(lang)}>${lang}</span>
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
            <span class=${typeClassFor(type)}>${type}</span>
            <span class=${deltaClassFor(delta)}>${formatSignedCompact(delta)}</span>
        </div>`;
    }

    template(): Template {
        return html`
            <div class="title">
                <span class="lbl">live feed</span>
                <span class="hint">${this.list.length} recent</span>
            </div>
            <div class="list">${this.body}</div>
        `;
    }
}
