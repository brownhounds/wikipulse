import { Component, html, type Template } from '@neuralfog/elemix';
import { component } from '@neuralfog/elemix/decorators';

import css from '#src/components/icons/IconReload.scss?inline';

@component({ styles: [css] })
export class IconReload extends Component {
    template(): Template {
        return html`<svg
            viewBox="0 0 16 16"
            width="12"
            height="12"
            aria-hidden="true"
        >
            <path
                d="M8 1.5a6.5 6.5 0 1 0 6.493 6.84.75.75 0 0 0-1.498-.08A5 5 0 1 1 8 3a4.97 4.97 0 0 1 3.464 1.404L9.5 6h5V1l-1.97 1.97A6.47 6.47 0 0 0 8 1.5z"
                fill="currentColor"
            />
        </svg>`;
    }
}
