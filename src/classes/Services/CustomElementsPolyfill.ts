import { gradioApp } from "@/utils/gradioApp";

/**
 * Provides a polyfill for the Custom Elements API.
 * 
 * @author Pihedy
 */
export class CustomElementsPolyfill {

    public registry: Record<string, CustomElementConstructor> = {};

    private static instance: CustomElementsPolyfill;

    public static getInstance(): CustomElementsPolyfill {
        if (!CustomElementsPolyfill.instance) {
            CustomElementsPolyfill.instance = new CustomElementsPolyfill();
        }
    
        return CustomElementsPolyfill.instance;
    }

    public get(tagName: string): CustomElementConstructor|null {
        return this.registry[tagName] ?? null;
    }

    public define(tagName: string, CustomElemen: CustomElementConstructor): void {
        if (this.registry[tagName]) {
            throw new Error(`Custom element "${tagName}" is already defined.`);
        }

        this.registry[tagName] = CustomElemen;

        document.querySelectorAll(tagName).forEach((Element) => {
            this.upgrade(Element as HTMLElement);
        });
    }
    
    protected upgrade(Element: HTMLElement): void {
        let CustomElemen = this.registry[Element.tagName.toLowerCase()];

        if (!CustomElemen) {
            return;
        }

        // Set prototype and ensure Vue internals are preserved
        const proto = CustomElemen.prototype;
        Object.setPrototypeOf(Element, proto);

        // Initialize Vue component with microtask timing
        queueMicrotask(() => {
            if (typeof (Element as any).connectedCallback === 'function') {
                (Element as any).connectedCallback();
            }
        });
    }

}
