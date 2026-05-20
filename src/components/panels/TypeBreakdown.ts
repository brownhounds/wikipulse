import { Component, html, type Template } from '@neuralfog/elemix';
import { component } from '@neuralfog/elemix/decorators';

import { typeCounters } from '#src/signals/typeCounters';
import { formatCompact } from '#src/utils/format';
import css from '#src/components/panels/TypeBreakdown.scss?inline';

type TypeKey = 'edit' | 'new' | 'log' | 'categorize' | 'other';

const COLORS: Record<TypeKey, string> = {
    edit: 'var(--accent)',
    new: 'var(--green)',
    log: 'var(--purple)',
    categorize: 'var(--amber)',
    other: 'var(--slate)',
};

@component({ signals: [typeCounters], styles: [css] })
export class TypeBreakdown extends Component {
    private get total(): number {
        const {
            edit,
            new: editNew,
            log,
            categorize,
            other,
        } = typeCounters.value;
        return edit + editNew + log + categorize + other;
    }

    private segment(key: TypeKey): Template {
        const value = typeCounters.value[key];
        const denom = this.total || 1;
        const style = `width:${(value / denom) * 100}%;background:${COLORS[key]}`;
        return html`<div class="segment" style=${style}></div>`;
    }

    private legendItem(key: TypeKey, label: string): Template {
        const value = typeCounters.value[key];
        const swatchStyle = `background:${COLORS[key]}`;
        return html`<div class="item">
            <span class="swatch" style=${swatchStyle}></span>
            <span class="lbl">${label}</span>
            <span class="cnt">${formatCompact(value)}</span>
        </div>`;
    }

    template(): Template {
        const empty = this.total === 0;
        return html`
            <div class="title">
                <span class="lbl">event types</span>
            </div>
            <div class="stack">
                ${
                    empty
                        ? html`<div class="empty">Waiting for events…</div>`
                        : html`<div class="segmented">
                            ${this.segment('edit')}
                            ${this.segment('new')}
                            ${this.segment('log')}
                            ${this.segment('categorize')}
                            ${this.segment('other')}
                        </div>
                        <div class="legend">
                            ${this.legendItem('edit', 'edit')}
                            ${this.legendItem('new', 'new')}
                            ${this.legendItem('log', 'log')}
                            ${this.legendItem('categorize', 'cat')}
                            ${this.legendItem('other', 'other')}
                        </div>`
                }
            </div>
        `;
    }
}
