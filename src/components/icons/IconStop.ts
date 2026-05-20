import { Component, html, type Template } from '@neuralfog/elemix';
import { component } from '@neuralfog/elemix/decorators';

import css from '#src/components/icons/IconStop.scss?inline';

@component({ styles: [css] })
export class IconStop extends Component {
    template(): Template {
        return html`<svg
            viewBox="0 0 16 16"
            width="12"
            height="12"
            aria-hidden="true"
        >
            <rect
                x="3"
                y="3"
                width="10"
                height="10"
                rx="1.5"
                fill="currentColor"
            />
        </svg>`;
    }
}
