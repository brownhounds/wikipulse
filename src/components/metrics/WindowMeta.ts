import { Component, html, type Template } from '@neuralfog/elemix';
import { component } from '@neuralfog/elemix/decorators';

import css from '#src/components/metrics/WindowMeta.scss?inline';

type Props = {
    windowSec: number;
    count: number;
};

@component({ styles: [css] })
export class WindowMeta extends Component<Props> {
    template(): Template {
        const { windowSec, count } = this.props;
        return html`<span class="meta">
            last ${windowSec}s
            <span class="dot">·</span>
            ${count} events
        </span>`;
    }
}
