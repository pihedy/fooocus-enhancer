/** 
 * @author Pihedy
 */

import { LoraInputElement } from "@/classes/Observers/LoraInputElement";
import { gradioApp } from "@/utils/gradioApp";

import { EnhancerElementFactory } from "@/classes/Factories/EnhancerElementFactory";

/**
 * Listens for the 'fooocus-enhancer-ready' event and performs some action when it is triggered.
 */
document.addEventListener('fooocus-enhancer-ready', () => {
    gradioApp().find('div.lora_model')?.forEach((Element: Element) => {
        let Component = Element.closest('div.form')?.parentElement;

        if (typeof Component === null || typeof Component === 'undefined') {
            return;
        }

        let modelId = Component?.getAttribute('id');

        if (modelId === null || modelId === undefined) {
            return;
        }

        Component?.appendChild(
            EnhancerElementFactory.create('lora-word-element', {model_id: modelId})
        );

        let inputs = Element.getElementsByTagName('input');

        if (inputs.length <= 0) {
            return;
        }

        let Input = new LoraInputElement(inputs[0]);

        Input.setObserver();
    });
});
