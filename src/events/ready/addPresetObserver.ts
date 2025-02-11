/** 
 * @author: Pihedy
 */

import { gradioApp } from "@/utils/gradioApp";

document.addEventListener('fooocus-enhancer-ready', () => {
    gradioApp().find('div#component-216')?.forEach((Element: Element) => {
        let inputs = Element.getElementsByTagName('input');
        
        if (inputs.length <= 0) {
            return;
        }

        const Observer = new MutationObserver((records: MutationRecord[]) => {
            if (records.length === 0) {
                return;
            }

            const Target = records[0]?.target as Element;

            if (Target?.classList?.contains('showOptions')) {
                return;
            }

            document.dispatchEvent(new CustomEvent('fooocus-enhancer-lora-words-reload'));
        });

        const Closest = inputs[0].closest('div.wrap-inner');

        if (!Closest) {
            return;
        }

        Observer.observe(Closest, {
            attributes: true,
            attributeFilter: ['class']
        });
    });
});
