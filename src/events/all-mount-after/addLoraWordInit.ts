/** 
 * @author: Pihedy
 */

import { gradioApp } from "@/utils/gradioApp";
import { LoraInputElement } from "@/classes/Observers/LoraInputElement";

document.addEventListener('fooocus-enhancer-all-mount-after', () => {
    gradioApp().find('div.lora_model')?.forEach((Element: Element) => {
        let Component = Element.closest('div.form')?.parentElement;
        
        if (Component === null || typeof Component === 'undefined') {
            return;
        }

        let modelId = Component?.getAttribute('id');

        if (modelId === null || modelId === undefined) {
            return;
        }

        let inputs = Element.getElementsByTagName('input');

        if (inputs.length <= 0) {
            return;
        }

        let Input = new LoraInputElement(inputs[0]);

        Input.forcedUpdate();
    });
});
