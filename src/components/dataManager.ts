/** 
 * @author: Pihedy
 */

import { DataManager } from "../classes/DataManager";

/**
 * Returns the singleton instance of the `DataManager` class.
 * 
 * @returns {DataManager} The singleton instance of the `DataManager` class.
 */
export function dataManager(): DataManager {
    return DataManager.getInstance();
}
