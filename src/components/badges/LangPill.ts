import { Component, html, type Template } from '@neuralfog/elemix';
import { component } from '@neuralfog/elemix/decorators';

import { langColor, langColorSoft, langName } from '#src/utils/lang';
import css from '#src/components/badges/LangPill.scss?inline';

type Props = { lang: string };

@component({ styles: [css] })
export class LangPill extends Component<Props> {
    template(): Template {
        const lang = this.props.lang ?? '';
        const style = `color:${langColor(lang)};background:${langColorSoft(lang)}`;
        return html`<span
            class="pill"
            style=${style}
            title=${langName(lang)}
        >${lang}</span>`;
    }
}
