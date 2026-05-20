import { Component, html, type Template } from '@neuralfog/elemix';
import { component } from '@neuralfog/elemix/decorators';
import { repeat } from '@neuralfog/elemix/directives';

import {
    languageStats,
    type LanguageStat,
} from '#src/signals/languageStats';
import { langColor, langName } from '#src/utils/lang';
import css from '#src/components/panels/LanguageRace.scss?inline';

import '#src/components/metrics/WindowMeta';

@component({ signals: [languageStats], styles: [css] })
export class LanguageRace extends Component {
    private get max(): number {
        return languageStats.value.rows[0]?.count ?? 1;
    }

    private get body(): Template {
        const { rows } = languageStats.value;
        if (rows.length === 0) {
            return html`<div class="empty">collecting…</div>`;
        }
        return html`${repeat(
            rows,
            (r, i) => this.renderRow(r, i),
            (r) => r.lang,
        )}`;
    }

    private renderRow(r: LanguageStat, i: number): Template {
        const { lang, count } = r;
        const color = langColor(lang);
        const width = Math.max(2, (count / this.max) * 100);
        const rowStyle = `order:${i}`;
        const barStyle = `width:${width}%;background:${color};color:${color}`;
        return html`<div class="row" title=${langName(lang)} style=${rowStyle}>
            <span class="lang">${lang}</span>
            <div class="bar-wrap">
                <div class="bar" style=${barStyle}></div>
            </div>
            <span class="count">${count}</span>
        </div>`;
    }

    template(): Template {
        const { total, windowSec } = languageStats.value;
        return html`
            <div class="title">
                <span class="lbl">language race</span>
                <window-meta :windowSec=${windowSec} :count=${total}></window-meta>
            </div>
            <div class="list">${this.body}</div>
        `;
    }
}
