import { slugify } from "../utils/slugify";

/**
 * The `DataManager` class is responsible for managing and persisting application data.
 * 
 * @author Pihedy
 */
export class DataManager {
    /**
     * The storage key used to persist application data.
     */
    private storageKey: string = 'fooocus-enhancer-data';

    /**
     * The singleton instance of the `DataManager` class.
     */
    private static instance: DataManager;

    /**
     * The internal data store for the `DataManager` class.
     */
    private data: Record<string, any> = {};

    /**
     * Private constructor instance by bootstrapping the internal data store.
     */
    private constructor() {
        this.bootstrap();
    }

    /**
     * Gets the singleton instance of the `DataManager` class.
     * 
     * @returns The singleton instance of the `DataManager` class.
     */
    public static getInstance(): DataManager {
        if (!DataManager.instance) {
            DataManager.instance = new DataManager();
        }
    
        return DataManager.instance;
    }

    /**
     * Gets the value at the specified path in the internal data store.
     * 
     * @param path The path to the value in the data store, using dot notation.
     * @param defaultValue The default value to return if the path does not exist in the data store.
     * 
     * @returns The value at the specified path, or the default value if the path does not exist.
     */
    public get(path: string, defaultValue: any = null): any {
        const keys = path.split('.');

        let result = this.data;

        for (const key of keys) {
            if (result && typeof result === 'object' && key in result) {
                result = result[key];

                continue;
            }

            result = defaultValue;

            break;
        }

        return result;
    }

    /**
     * Sets the value at the specified path in the internal data store.
     * 
     * @param path The path to the value in the data store, using dot notation.
     * @param value The value to set at the specified path.
     * @param turnToSlugify Whether to convert the path keys to slugified versions.
     */
    public set(path: string, value: any, turnToSlugify: boolean = false): void {
        const keys = path.split('.');

        let current = this.data;

        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];

            if (turnToSlugify) {
                key = slugify(key);
            }

            if (i === keys.length - 1) {
                current[key] = value;
            } else {
                if (!(key in current) || typeof current[key] !== 'object') {
                    current[key] = {};
                }

                current = current[key];
            }
        }

        this.saveStorage();
    }

    /**
     * Initializes the internal data store by loading data from the local storage.
     */
    private bootstrap(): void {
        this.data = this.loadData();
    }

    /**
     * Loads the data from the local storage and returns it.
     * 
     * @returns The data stored in the local storage, or an empty object if no data is found.
     */
    private loadData(): any {
        let data = localStorage.getItem(this.storageKey);

        if (data === null) {
            this.initStorage();
        }

        return data ? JSON.parse(data) : {};
    }

    /**
     * Initializes the internal data store by saving an empty object to the local storage.
     */
    private initStorage(): void {
        this.saveStorage({});
    }

    /**
     * Saves the internal data store to the local storage.
     * 
     * @param data - The data to be saved to the local storage.
     */
    private saveStorage(data: any = null): void {
        if (data === null) {
            data = this.data;
        }

        localStorage.setItem(this.storageKey, JSON.stringify(data));
    }
}
