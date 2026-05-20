import './silence-lit';

import type { Preview } from '@storybook/web-components-vite';
import { elemixDecorator } from '@neuralfog/elemix-storybook';

import '../src/styles/global.scss';

const preview: Preview = {
    decorators: [elemixDecorator],
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        onboarding: false,
    },
};

export default preview;
