/** 
 * @author: Pihedy
 */

import { gradioApp } from "./components/gradioApp";

require('./events/initDataManager');
require('./events/addFooterFlag');

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
}
