/** 
 * @author: Pihedy 
 */

import { gradioApp } from "@/utils/gradioApp";

import { EnhancerElementFactory } from "@/classes/Factories/EnhancerElementFactory";

/**
 * It adds a tiny flag about the app.
 */
document.addEventListener('fooocus-enhancer-ready', () => {
    gradioApp().getTag('footer')?.appendChild(
        EnhancerElementFactory.create('footer-contact')
    );
});