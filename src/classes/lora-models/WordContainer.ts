import { gradioApp } from "@components/gradioApp";
import { storageDataManager } from "@components/storageDataManager";

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
     * 
     * TODO: 
     * Ezt kiszerveztni valamibe, mert eléggé kaka így!
     * Ez itt már nagyon elburjánzott! Refactor-t kíván nagyon!
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

        let words = storageDataManager().get(`lora_words.${this.InputElement.getValue(true)}`, []);

        let display = document.createElement('textarea');
        let actionsRow = document.createElement('div');
        let editAndSaveButton = document.createElement('div');
        let insertButton = document.createElement('div');

        display.className = 'fe-display';
        display.textContent = words.join(', ');

        actionsRow.className = 'fe-actions';

        editAndSaveButton.className = 'fe-button';
        editAndSaveButton.textContent = 'Edit';

        insertButton.className = 'fe-button';
        insertButton.textContent = 'Insert';

        this.WordContainer.append(display);
        this.WordContainer.append(actionsRow);

        actionsRow.append(editAndSaveButton);
        actionsRow.append(insertButton);

        editAndSaveButton.addEventListener('click', (Event: Event) => {
            let Target = Event.target as HTMLElement;

            if (display.classList.contains('editable-on')) {
                display.classList.remove('editable-on');

                storageDataManager().set(
                    `lora_words.${this.InputElement.getValue(true)}`, 
                    display.value.replace(/, /g, ',').split(',')
                );

                Target.textContent = 'Edit';

                return;
            }

            display.classList.add('editable-on');
            display.focus();

            Target.textContent = 'Save';
        });

        insertButton.addEventListener('click', () => {
            let PromptArea = gradioApp().find('div#positive_prompt textarea');

            if (!PromptArea || PromptArea.length <= 0) {
                return;
            }

            PromptArea.forEach((Textarea) => {
                let words = storageDataManager().get(`lora_words.${this.InputElement.getValue(true)}`, []);

                if (!(Textarea instanceof HTMLTextAreaElement)) {
                    return;
                }

                words = words.join(', ');

                if (Textarea.value.length > 0) {
                    words = `, ${words}`;
                }

                Textarea.value += words;

                Textarea.dispatchEvent(new Event('input', {bubbles: true}));
            });
        });
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
