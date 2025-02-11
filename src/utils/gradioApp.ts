/** 
 * @author: Pihedy
 */

import { GradioApp } from "@/classes/Services/GradioApp";

/**
 * Returns the singleton instance of the GradioApp class.
 * 
 * @returns {GradioApp} The singleton instance of the GradioApp class.
 */
export function gradioApp(): GradioApp {
    return GradioApp.getInstance();
}
