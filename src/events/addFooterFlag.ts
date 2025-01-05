/** 
 * @author: Pihedy 
 */

import { gradioApp } from "@/utils/gradioApp";

/**
 * It adds a tiny flag about the app.
 */
document.addEventListener('fooocus-enhancer-ready', () => {
    /** 
     * TODO: Ebből a element létrehozából egy külön osztályt és utilt készíteni!
     */
    let element = document.createElement('fc-footer-contact');

    element.setAttribute('data-fc-element', '');

    gradioApp().getTag('footer')?.appendChild(element);
});