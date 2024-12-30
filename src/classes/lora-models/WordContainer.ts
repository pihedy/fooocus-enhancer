import { InputElement } from "./InputElement";

/**
 * Represents a container for displaying words related to an input element.
 * 
 * @author Pihedy
 */
export class WordContainer {

    /**
     * Holds a reference to the HTML div element that represents the word container.
     */
    private WordContainer: HTMLDivElement|null = null;

    /**
     * Constructs a new instance of the `WordContainer` class.
     * 
     * @param InputElement - The `InputElement` instance associated with this `WordContainer`.
     */
    public constructor(protected InputElement: InputElement) {
        /* Do nothing. */
    }

    /**
     * Creates a new word container element and appends it to the parent element of the associated input element.
     */
    public createWordContainer(): void {
        this.removeWordContainer();

        if (this.InputElement.getValue(true) == 'none') {
            return;
        }

        let Parent = this.InputElement.getRow();

        if (Parent === null) {
            return;
        }

        this.WordContainer = document.createElement('div');

        this.WordContainer.className = 'fe-lora-word-container'

        Parent?.append(this.WordContainer);

        let textarea = document.createElement('textarea');

        textarea.textContent = 'test';

        this.WordContainer.append(textarea);
    }

    /**
     * Removes the word container element associated with the input element.
     */
    public removeWordContainer(): void {
        this.InputElement.getRow()?.querySelector('.fe-lora-word-container')?.remove();
    }

    /**
     * Toggles the visibility of the word container associated with the input element.
     */
    public toggleWordContainer(): void {
        this.removeWordContainer();
        this.createWordContainer();
    }
}
