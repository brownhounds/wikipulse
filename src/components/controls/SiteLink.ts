import { Component, html, type Template } from '@neuralfog/elemix';
import { component } from '@neuralfog/elemix/decorators';

import css from '#src/components/controls/SiteLink.scss?inline';

@component({ styles: [css] })
export class SiteLink extends Component {
    template(): Template {
        return html`<a
            class="link"
            href="https://gitgood.sh"
            target="_blank"
            rel="noopener"
        ><span class="tilde">~</span>/gitgood.sh</a>`;
    }
}
