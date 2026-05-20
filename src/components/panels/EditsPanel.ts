import { Component, html, type Template } from '@neuralfog/elemix';
import { component, state } from '@neuralfog/elemix/decorators';
import { repeat } from '@neuralfog/elemix/directives';

import { edits } from '#src/signals/edits';

import type { WikiChange } from '#src/signals/recentChanges';
import { formatSignedCompact, formatAgo } from '#src/utils/format';
import css from '#src/components/panels/EditsPanel.scss?inline';

import '#src/components/badges/LangPill';

const deltaClassFor = (delta: number): string =>
    `delta ${delta >= 0 ? 'pos' : 'neg'}`;

@component({ signals: [edits], styles: [css] })
export class EditsPanel extends Component {
    @state()
    state = { now: Date.now() };

    private raf = 0;
    private lastTick = 0;

    private loop = (now: number): void => {
        if (now - this.lastTick >= 1000) {
            this.state.now = Date.now();
            this.lastTick = now;
        }
        this.raf = requestAnimationFrame(this.loop);
    };

    private get list(): WikiChange[] {
        return edits.value.list;
    }

    private static renderRow(ev: WikiChange): Template {
        const { lang, delta, title, titleUrl, user, timestamp } = ev;
        return html`<div class="row">
            <div class="head">
                <lang-pill :lang=${lang}></lang-pill>
                <span class=${deltaClassFor(delta)}>${formatSignedCompact(delta)}</span>
            </div>
            <div class="title-line">
                <a href=${titleUrl} target="_blank" rel="noopener">
                    ${title}
                </a>
            </div>
            <div class="foot">
                <span>${user || '—'}</span>
                <span>${formatAgo(timestamp)} ago</span>
            </div>
        </div>`;
    }

    onMount(): void {
        this.lastTick = performance.now();
        this.raf = requestAnimationFrame(this.loop);
    }

    onDispose(): void {
        if (this.raf) cancelAnimationFrame(this.raf);
    }

    template(): Template {
        const { list } = this;
        return html`
            <div class="title">
                <span class="lbl">latest edits</span>
            </div>
            <div class="list">
                ${repeat(list, EditsPanel.renderRow, (ev) => ev.id)}
                ${list.length === 0 ? html`<div class="empty">Waiting for events…</div>` : html``}
            </div>
        `;
    }
}
