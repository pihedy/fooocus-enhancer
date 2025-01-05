/** 
 * @author: Pihedy
 */

import { gradioApp } from "@/utils/gradioApp";

require('@events/initDataManager');
require('@events/addFooterFlag');

require('@events/lora-models/initLoraInputChange');
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
    let Elements = document.querySelectorAll('[data-fc-element]');

    if (Elements.length <= 0) {
        return;
    }

    Elements.forEach((Value: Element) => {
        let tag = Value.tagName.toLowerCase();

        if (!tag.startsWith('fc-')) {
            return;
        }

        let camel = tag.slice('fc-'.length)
            .replace(/-./g, (match) => match[1].toUpperCase())
            .replace(/^./, (match) => match.toUpperCase());

        import(`@elements/${camel}.vue`).then(() => {

        }).catch(() => {
            
        });
    });
}
