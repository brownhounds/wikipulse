import { Component, html, type Template } from '@neuralfog/elemix';
import { component } from '@neuralfog/elemix/decorators';

import { streamStatus } from '#src/signals/streamStatus';
import css from '#src/components/metrics/MetricItem.scss?inline';

@component({ signals: [streamStatus], styles: [css] })
export class StatusMetric extends Component {
    private get dotClass(): string {
        const { streaming, connected } = streamStatus.value;
        if (connected) return 'dot live';
        if (streaming) return 'dot connecting';
        return 'dot';
    }

    private get label(): string {
        const { streaming, connected } = streamStatus.value;
        if (!streaming) return 'paused';
        if (connected) return 'streaming';
        return 'connecting…';
    }

    template(): Template {
        return html`<div class="metric">
            <span class="lbl">status</span>
            <span class="val">
                <span class=${this.dotClass}></span>
                ${this.label}
            </span>
        </div>`;
    }
}
