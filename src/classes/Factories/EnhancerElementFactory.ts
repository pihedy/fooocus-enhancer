/**
 * Provides a factory for creating enhanced HTML elements.
 * 
 * @author Pihedy
 */
export class EnhancerElementFactory {
    /**
     * The prefix used for enhanced HTML elements created by this factory.
     */
    static readonly elementPrefix: string = 'fe';

    /**
     * Creates a new HTML element with the specified name and attributes.
     * 
     * @param elementName The name of the HTML element to create.
     * @param attributes An optional object containing attribute key-value pairs to set on the created element.
     * 
     * @returns The newly created HTML element.
     */
    public static create(elementName: string, attributes: Record<string, string> = {}): Element {
        let element = document.createElement(`${this.elementPrefix}-${elementName}`);

        attributes[`data-${this.elementPrefix}-element`] = '';

        for (let [key, value] of Object.entries(attributes)) {
            element.setAttribute(key, value);
        }

        return element;
    }
}
