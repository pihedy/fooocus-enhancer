/** 
 * @author Pihedy
 */

import { InputElement } from "@classes/lora-models/InputElement";
import { gradioApp } from "@/utils/gradioApp";

import { EnhancerElementFactory } from "@/classes/Factories/EnhancerElementFactory";

/**
 * Listens for the 'fooocus-enhancer-ready' event and performs some action when it is triggered.
 */
document.addEventListener('fooocus-enhancer-ready', () => {
    gradioApp().find('div.lora_model')?.forEach((Element: Element) => {
        Element.closest('div.form')?.parentElement?.appendChild(
            EnhancerElementFactory.create('lora-word-element', {'valami': 'kecske'})
        );

        /* let Input = new InputElement(Element);

        Input.setObserver(); */
    });
});
