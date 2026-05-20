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

const ORDER: { key: TypeKey; label: string }[] = [
    { key: 'edit', label: 'edit' },
    { key: 'new', label: 'new' },
    { key: 'log', label: 'log' },
    { key: 'categorize', label: 'cat' },
    { key: 'other', label: 'other' },
];

@component({ signals: [typeCounters], styles: [css] })
export class TypeBreakdown extends Component {
    private get total(): number {
        const { edit, new: editNew, log, categorize, other } = typeCounters.value;
        return edit + editNew + log + categorize + other || 1;
    }

    private get segments(): Template[] {
        return ORDER.map(({ key }) => {
            const value = typeCounters.value[key];
            const style = `width:${(value / this.total) * 100}%;background:${COLORS[key]}`;
            return html`<div class="segment" style=${style}></div>`;
        });
    }

    private get legend(): Template[] {
        return ORDER.map(({ key, label }) => {
            const value = typeCounters.value[key];
            const swatchStyle = `background:${COLORS[key]}`;
            return html`<div class="item">
                <span class="swatch" style=${swatchStyle}></span>
                <span class="lbl">${label}</span>
                <span class="cnt">${formatCompact(value)}</span>
            </div>`;
        });
    }

    template(): Template {
        return html`
            <div class="title">
                <span class="lbl">event types</span>
            </div>
            <div class="stack">
                <div class="segmented">${this.segments}</div>
                <div class="legend">${this.legend}</div>
            </div>
        `;
    }
}
