/** 
 * @author: Pihedy
 */

/**
 * Defines the interface for a model data store, which is responsible for managing the storage and retrieval of model data.
 */
export interface ModelDataStoreInterface {
    loras: Record<string, string>;
}
