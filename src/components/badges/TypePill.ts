import { Component, html, type Template } from '@neuralfog/elemix';
import { component } from '@neuralfog/elemix/decorators';

import type { WikiChangeType } from '#src/signals/recentChanges';
import css from '#src/components/badges/TypePill.scss?inline';

type Props = { type: WikiChangeType };

const COLORS: Record<WikiChangeType, { fg: string; bg: string }> = {
    edit: { fg: 'var(--accent)', bg: 'var(--accent-soft)' },
    new: { fg: 'var(--green)', bg: 'var(--green-soft)' },
    log: { fg: 'var(--purple)', bg: 'var(--purple-soft)' },
    categorize: { fg: 'var(--amber)', bg: 'var(--amber-soft)' },
    other: { fg: 'var(--slate)', bg: 'var(--slate-soft)' },
};

@component({ styles: [css] })
export class TypePill extends Component<Props> {
    private get type(): WikiChangeType {
        return this.props.type ?? 'other';
    }

    private get pillStyle(): string {
        const { fg, bg } = COLORS[this.type];
        return `color:${fg};background:${bg}`;
    }

    template(): Template {
        return html`<span class="pill" style=${this.pillStyle}>${this.type}</span>`;
    }
}
