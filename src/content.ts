/** 
 * @author: Pihedy
 */

import { createApp } from 'vue';

import { gradioApp } from "@/utils/gradioApp";
import { vueWrapper } from '@/utils/vueWrapper';

import { customElementsPolyfill } from './utils/customElementsPolyfill';

require('@events/ready/initDataManager');
require('@events/ready/addFooterFlagElement');
require('@events/ready/addtLoraWordElement');

require('@events/lora-models/changeWordContainer');

const initInterval = setInterval(() => {
    if (document.readyState !== 'complete') {
        return;
    }

    init();

    clearInterval(initInterval);
}, 250);

/**
 * Initializes the Gradio application by finding the first 'gradio-app' element on the page and setting it as the active element.
 * Dispatches a 'fooocus-enhancer-ready' event to signal that the initialization is complete.
 */
function init(): void {
    let Collection = document.getElementsByTagName('gradio-app');

    if (Collection.length <= 0) {
        return;
    }

    gradioApp().setElement(Collection[0]);

    document.dispatchEvent(new CustomEvent('fooocus-enhancer-ready'));

    /** 
     * TODO: Ez ki lehet majd szervezni!
     */
    let Elements = gradioApp().findEnhancers();

    if (typeof Elements === 'undefined' || Elements.length <= 0) {
        return;
    }

    (require as any).context('@elements', false, /\.vue$/);

    const rootApp = createApp({});

    Elements.forEach((Value: Element) => {
        let tag = Value.tagName.toLowerCase();

        if (!tag.startsWith('fe-')) {
            return;
        }

        let camel = tag.slice('fe-'.length)
            .replace(/-./g, (match) => match[1].toUpperCase())
            .replace(/^./, (match) => match.toUpperCase());

        Value.removeAttribute('data-fe-element');

        import(`@elements/${camel}.vue`).then((Module) => {
            if (!Module.default) {
                throw new Error(`Module for ${camel} does not have a default export.`);
            }

            if (customElementsPolyfill().get(tag) !== null) {
                return;
            }

            customElementsPolyfill().define(tag, vueWrapper(rootApp, Module));
        }).catch((err) => {            
            console.error(`Failed to load component`, err);
        });
    });
}
