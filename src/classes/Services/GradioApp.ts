import { EnhancerElementFactory } from "@/classes/Factories/EnhancerElementFactory";

/**
 * The GradioApp class is a singleton that manages the Gradio element in the application.
 * 
 * @author Pihedy
 */
export class GradioApp { 
    /**
     * The singleton instance of the GradioApp class.
     */
    private static instance: GradioApp;

    /**
     * The Gradio element managed by the GradioApp singleton.
     */
    private Gradio: Element|null = null;

    /**
     * Private constructor that does nothing.
     */
    private constructor() {
        /* Do Nothin. */
    }

    /**
     * Returns the singleton instance of the `GradioApp` class.
     * 
     * @returns {GradioApp} The singleton instance of the `GradioApp` class.
     */
    public static getInstance(): GradioApp {
        if (!GradioApp.instance) {
            GradioApp.instance = new GradioApp();
        }

        return GradioApp.instance;
    }

    /**
     * Retrieves the first element with the specified tag name.
     *
     * @param tag - The tag name of the element to retrieve.
     * 
     * @returns The first element with the specified tag name, or `null` if no such element is found.
     */
    public getTag(tag: string): Element|null {
        let result = this.getTags(tag);

        if (result && result.length <= 0) {
            return null;
        }

        return result ? result[0] : null;
    }

    /**
     * Retrieves a collection of elements with the specified tag name.
     *
     * @param tag - The tag name of the elements to retrieve.
     * 
     * @returns The collection of elements with the specified tag name, or `undefined` if the Gradio element is not set.
     */
    public getTags(tag: string): HTMLCollectionOf<Element>|undefined {
        return this.Gradio?.getElementsByTagName(tag);
    }

    /**
     * Retrieves a NodeList of elements that match the specified CSS selector query.
     *
     * @param query - The CSS selector query to match elements against.
     * 
     * @returns A NodeList of elements that match the specified query, or `undefined` if the Gradio element is not set.
     */
    public find(query: string): NodeListOf<Element>|undefined {
        return this.Gradio?.querySelectorAll(query);
    }

    public findEnhancers(): NodeListOf<Element>|undefined {
        return this.find(`[data-${EnhancerElementFactory.elementPrefix}-element]`);
    }

    /**
     * Sets the Gradio element managed by the GradioApp singleton.
     * 
     * @param Element The Gradio element to be managed by the GradioApp singleton.
     */
    public setElement(Element: Element): void {
        if (this.Gradio !== null) {
            /** 
             * TODO: Itt létrehozni egy exceptions.
             */
            return;
        }

        this.Gradio = Element;
    }
}
