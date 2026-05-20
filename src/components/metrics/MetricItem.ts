import { Component, html, type Template } from '@neuralfog/elemix';
import { component } from '@neuralfog/elemix/decorators';

import css from '#src/components/metrics/MetricItem.scss?inline';

type Props = {
    label: string;
    value: string | number;
    variant?: 'accent' | 'warn' | 'bot' | 'human' | '';
};

@component({ styles: [css] })
export class MetricItem extends Component<Props> {
    private get valClass(): string {
        return this.props.variant ? `val ${this.props.variant}` : 'val';
    }

    template(): Template {
        const { label, value } = this.props;
        return html`<div class="metric">
            <span class="lbl">${label}</span>
            <span class=${this.valClass}>${value}</span>
        </div>`;
    }
}
