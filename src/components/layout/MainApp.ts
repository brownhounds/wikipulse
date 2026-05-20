import { Component, html, type Template } from '@neuralfog/elemix';
import { component } from '@neuralfog/elemix/decorators';

import { startStream } from '#src/sse/wiki';
import css from '#src/components/layout/MainApp.scss?inline';

import '#src/components/layout/AppHeader';
import '#src/components/panels/FeedPanel';
import '#src/components/panels/LanguagesPanel';
import '#src/components/panels/TypeBreakdown';
import '#src/components/panels/EditsPanel';

@component({ styles: [css] })
export class MainApp extends Component {
    onMount(): void {
        startStream();
    }

    template(): Template {
        return html`
            <app-header></app-header>
            <div class="container">
                <type-breakdown></type-breakdown>
                <div class="grid">
                    <div class="col">
                        <languages-panel></languages-panel>
                    </div>
                    <div class="col">
                        <feed-panel></feed-panel>
                    </div>
                    <div class="col">
                        <edits-panel></edits-panel>
                    </div>
                </div>
            </div>
        `;
    }
}
