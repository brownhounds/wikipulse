import { Component, html, type Template } from '@neuralfog/elemix';
import { component } from '@neuralfog/elemix/decorators';

import { streamStatus } from '#src/signals/streamStatus';
import { formatCompact, formatNumber } from '#src/utils/format';
import css from '#src/components/layout/AppHeader.scss?inline';

import '#src/components/controls/StreamToggle';
import '#src/components/metrics/StatusMetric';
import '#src/components/metrics/MetricItem';

@component({ signals: [streamStatus], styles: [css] })
export class AppHeader extends Component {
    template(): Template {
        const { totalEvents, eps, botCount, humanCount, anonCount } =
            streamStatus.value;

        return html`
            <header>
                <div class="brand">
                    <div class="logo">wikipulse</div>
                    <stream-toggle />
                </div>
                <div class="metrics">
                    <status-metric></status-metric>
                    <metric-item :label=${'total events'} :value=${formatNumber(totalEvents)}></metric-item>
                    <metric-item :label=${'events / sec'} :value=${eps.toFixed(1)} :variant=${'accent'}></metric-item>
                    <metric-item :label=${'humans'} :value=${formatCompact(humanCount)} :variant=${'human'}></metric-item>
                    <metric-item :label=${'bots'} :value=${formatCompact(botCount)} :variant=${'bot'}></metric-item>
                    <metric-item :label=${'anon'} :value=${formatCompact(anonCount)} :variant=${'warn'}></metric-item>
                </div>
            </header>
        `;
    }
}
