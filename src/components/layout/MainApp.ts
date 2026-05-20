import { Component, html, type Template } from '@neuralfog/elemix';
import { component } from '@neuralfog/elemix/decorators';

import { startStream } from '#src/sse/wiki';
import css from '#src/components/layout/MainApp.scss?inline';

import '#src/components/layout/AppHeader';
import '#src/components/panels/EditFeed';
import '#src/components/panels/LanguageRace';
import '#src/components/panels/TypeBreakdown';
import '#src/components/panels/BigEdits';

@component({ styles: [css] })
export class MainApp extends Component {
    onMount(): void {
        startStream();
    }

    template(): Template {
        return html`
            <app-header />
            <div class="container">
                <div class="grid">
                    <div class="col">
                        <language-race />
                        <type-breakdown />
                    </div>
                    <div class="col">
                        <edit-feed />
                    </div>
                    <div class="col">
                        <big-edits />
                    </div>
                </div>
            </div>
        `;
    }
}
