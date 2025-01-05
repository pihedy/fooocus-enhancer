/** 
 * @author: Pihedy
 */

import { DataManager } from "@/classes/StorageDataManager";

/**
 * Returns the singleton instance of the `DataManager` class.
 * 
 * @returns {DataManager} The singleton instance of the `DataManager` class.
 */
export function storageDataManager(): DataManager {
    return DataManager.getInstance();
}
