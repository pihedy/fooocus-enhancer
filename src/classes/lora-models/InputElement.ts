import { slugify } from "@utils/slugify";

/**
 * Represents an input element and provides methods to interact with it.
 * 
 * @author Pihedy
 */
export class InputElement {

    /**
     * Creates a new `InputElement` instance from the provided `HTMLInputElement`.
     * 
     * @param Input The HTML input element to wrap.
     * 
     * @returns A new `InputElement` instance.
     */
    public static init(Input: HTMLInputElement): InputElement {
        return new InputElement(Input);
    }

    /**
     * Constructs a new `InputElement` instance.
     *
     * @param Input The HTML input element to wrap.
     */
    public constructor(protected Input: HTMLInputElement) {
        /* Do Nothing. */
    }

    /**
     * Sets up a mutation observer on the closest `div.wrap-inner` element to the input element.
     */
    public setObserver(): void {
        const Observer = new MutationObserver((records: MutationRecord[]) => {
            if (records.length === 0) {
                return;
            }

            const Target = records[0]?.target as Element;

            if (Target?.classList?.contains('showOptions')) {
                return;
            }

            document.dispatchEvent(
                new CustomEvent('fooocus-enhancer-lora-input-change', {detail: this})
            );
        });

        const Closest = this.Input.closest('div.wrap-inner');

        if (!Closest) {
            return;
        }

        Observer.observe(Closest, {
            attributes: true,
            attributeFilter: ['class']
        });
    }

    /**
     * Gets the value of the input element, optionally slugifying it.
     *
     * @param turnToSlugify - Whether to slugify the input value.
     * 
     * @returns The input value, optionally slugified.
     */
    public getValue(turnToSlugify: boolean = false): string {
        return turnToSlugify ? slugify(this.Input.value) : this.Input.value;
    }

    /**
     * Gets the HTML input element that this `InputElement` instance wraps.
     * 
     * @returns The HTML input element.
     */
    public getInput(): HTMLInputElement {
        return this.Input;
    }

    /**
     * Gets the closest HTML element that represents the row of the input element.
     * 
     * @returns The closest HTML element that represents the row of the input element, or `null` if not found.
     */
    public getRow(): HTMLElement|null {
        return this.Input.closest('div.form')?.parentElement ?? null;
    }
}
