/** 
 * @author Pihedy
 */

import { App, createApp } from 'vue'

/**
 * Wraps a Vue.js application in a custom HTML element.
 * 
 * @param RootApp - The root Vue.js application instance.
 * @param Module - The Vue.js component module to be wrapped.
 * 
 * @returns A custom HTML element that encapsulates the Vue.js application.
 */
export function vueWrapper(RootApp: App<Element>, Module: any): any {
    /**
     * A custom HTML element that wraps a Vue.js application.
     */
    return class VueWrapper extends HTMLElement {
        /**
         * The Vue.js application instance associated with this custom HTML element.
         */
        private VueApp: any;

        /**
         * The `connectedCallback` method is called when the custom HTML element is inserted into the DOM tree.
         */
        public connectedCallback() {
            const Container = document.createElement('div');

            Container.style.display = 'contents';

            this.appendChild(Container);

            const props: { [key: string]: string } = {};

            for (let Attribute of this.attributes) {
                props[Attribute.name] = Attribute.value;
            }

            this.VueApp = createApp(Module.default, props);

            Object.assign(this.VueApp._context, RootApp._context);

            this.VueApp.mount(Container);
        }

        /**
         * The `disconnectedCallback` method is called when the custom HTML element is removed from the DOM tree.
         */
        public disconnectedCallback() {
            if (!this.VueApp) {
                return;
            }

            this.VueApp.unmount();
        }
    };
}
