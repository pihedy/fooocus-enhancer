/** 
 * @author: Pihedy
 */

import { CustomElementsPolyfill } from "@/classes/Services/CustomElementsPolyfill";

/**
 * Returns the singleton instance of the `CustomElementsPolyfill` class.
 * 
 * @returns {CustomElementsPolyfill} The singleton instance of `CustomElementsPolyfill`.
 */
export function customElementsPolyfill(): CustomElementsPolyfill {
    return CustomElementsPolyfill.getInstance();
}
