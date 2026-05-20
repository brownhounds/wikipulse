import { Component, html, type Template } from '@neuralfog/elemix';
import { component } from '@neuralfog/elemix/decorators';

import { resetStream } from '#src/sse/wiki';
import css from '#src/components/controls/ResetButton.scss?inline';

import '#src/components/icons/IconReload';

@component({ styles: [css] })
export class ResetButton extends Component {
    private onClick = (): void => {
        resetStream();
    };

    template(): Template {
        return html`<button class="btn" @click=${this.onClick}>
            <icon-reload></icon-reload>
            <span>reset</span>
        </button>`;
    }
}
