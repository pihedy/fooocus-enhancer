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
    public static getInstance() {
        if (!GradioApp.instance) {
            GradioApp.instance = new GradioApp();
        }

        return GradioApp.instance;
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

    public getTag(tag: string): Element|null {
        let result = this.Gradio?.getElementsByTagName(tag);

        if (result && result.length <= 0) {
            return null;
        }

        return result ? result[0] : null;
    }

}
