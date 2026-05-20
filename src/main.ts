import { initApp } from '@neuralfog/elemix/app';
import { makeCssStylesheet } from '@neuralfog/elemix/utilities';

import reset from '#src/styles/reset.scss?inline';

initApp({
    baseStyles: [makeCssStylesheet(reset)],
    entryPoint: () => import('#src/components/layout/MainApp'),
});
