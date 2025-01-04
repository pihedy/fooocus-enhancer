/** 
 * @author Pihedy
 */

import { InputElement } from "@classes/lora-models/InputElement";
import { gradioApp } from "@components/gradioApp";

/**
 * Listens for the 'fooocus-enhancer-ready' event and performs some action when it is triggered.
 */
document.addEventListener('fooocus-enhancer-ready', () => {
    gradioApp().find('div.lora_model input')?.forEach((Element: Element) => {
        if (!(Element instanceof HTMLInputElement)) {
            return;
        }

        let Input = new InputElement(Element);

        Input.setObserver();
    });
});
