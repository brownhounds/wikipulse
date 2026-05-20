import { Component, html, type Template } from '@neuralfog/elemix';
import { component } from '@neuralfog/elemix/decorators';

import { streamStatus } from '#src/signals/streamStatus';
import { toggleStream } from '#src/sse/wiki';
import css from '#src/components/controls/StreamToggle.scss?inline';

import '#src/components/icons/IconPlay';
import '#src/components/icons/IconStop';

@component({ signals: [streamStatus], styles: [css] })
export class StreamToggle extends Component {
    private onClick = (): void => {
        toggleStream();
    };

    private get isStreaming(): boolean {
        return streamStatus.value.streaming;
    }

    private get btnClass(): string {
        return this.isStreaming ? 'btn stop' : 'btn start';
    }

    private get label(): string {
        return this.isStreaming ? 'stop' : 'start';
    }

    private get icon(): Template {
        return this.isStreaming
            ? html`<icon-stop></icon-stop>`
            : html`<icon-play></icon-play>`;
    }

    template(): Template {
        return html`<button class=${this.btnClass} @click=${this.onClick}>
            ${this.icon}
            <span>${this.label}</span>
        </button>`;
    }
}
