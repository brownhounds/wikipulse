import { Component, html, type Template } from '@neuralfog/elemix';
import { component, state } from '@neuralfog/elemix/decorators';
import { repeat } from '@neuralfog/elemix/directives';

import { notableChanges } from '#src/signals/notableChanges';
import type { WikiChange } from '#src/signals/recentChanges';
import { langColor, langColorSoft } from '#src/utils/lang';
import { formatSignedCompact, formatAgo } from '#src/utils/format';
import css from '#src/components/panels/BigEdits.scss?inline';

const deltaClassFor = (delta: number): string =>
    `delta ${delta >= 0 ? 'pos' : 'neg'}`;

const langStyleFor = (lang: string): string =>
    `color:${langColor(lang)};background:${langColorSoft(lang)}`;

@component({ signals: [notableChanges], styles: [css] })
export class BigEdits extends Component {
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
        return notableChanges.value.list;
    }

    private get body(): Template {
        if (this.list.length === 0) {
            return html`<div class="empty">no big edits yet…</div>`;
        }
        return html`${repeat(this.list, BigEdits.renderRow, (ev) => ev.id)}`;
    }

    private static renderRow(ev: WikiChange): Template {
        const { lang, delta, title, titleUrl, user, timestamp } = ev;
        return html`<div class="row">
            <div class="head">
                <span class="lang" style=${langStyleFor(lang)}>${lang}</span>
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
        return html`
            <div class="title">
                <span class="lbl">latest edits</span>
            </div>
            <div class="list">${this.body}</div>
        `;
    }
}
