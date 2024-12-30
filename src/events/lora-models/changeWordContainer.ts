/** 
 * @author: Pihedy
 */

import { InputElement } from "../../classes/lora-models/InputElement";
import { WordContainer } from "../../classes/lora-models/WordContainer";

/**
 * Listens for the 'fooocus-enhancer-lora-input-change' event and handles the corresponding logic.
 */
document.addEventListener('fooocus-enhancer-lora-input-change', (Event: Event) => {
    if (!(Event instanceof CustomEvent)) {
        return;
    }

    if (!(Event.detail instanceof InputElement)) {
        return;
    }

    const Container = new WordContainer(Event.detail);

    Container.toggleWordContainer();
});
