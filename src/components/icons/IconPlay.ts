import { Component, html, type Template } from '@neuralfog/elemix';
import { component } from '@neuralfog/elemix/decorators';

import css from '#src/components/icons/IconPlay.scss?inline';

@component({ styles: [css] })
export class IconPlay extends Component {
    template(): Template {
        return html`<svg
            viewBox="0 0 16 16"
            width="12"
            height="12"
            aria-hidden="true"
        >
            <path
                d="M3.5 2.5v11a.5.5 0 0 0 .77.42l8.5-5.5a.5.5 0 0 0 0-.84l-8.5-5.5a.5.5 0 0 0-.77.42z"
                fill="currentColor"
            />
        </svg>`;
    }
}
