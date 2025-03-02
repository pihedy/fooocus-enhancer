/** 
 * @author: Pihedy
 */

import { createApp } from 'vue';

import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

import PopupElement from "@elements/PopupElement.vue";

const App = createApp(PopupElement);

App.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: false,
        },
    },
});

App.mount('#fe-app');
