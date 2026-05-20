import { Component, html, type Template } from '@neuralfog/elemix';
import { component } from '@neuralfog/elemix/decorators';

import css from '#src/components/controls/GithubLink.scss?inline';

import '#src/components/icons/IconGithub';

@component({ styles: [css] })
export class GithubLink extends Component {
    template(): Template {
        return html`<a
            class="link"
            href="https://github.com/brownhounds/wikipulse"
            target="_blank"
            rel="noopener"
            aria-label="GitHub"
        ><icon-github></icon-github><span class="text">repository</span></a>`;
    }
}
