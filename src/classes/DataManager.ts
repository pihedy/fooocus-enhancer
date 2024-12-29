/** 
 * @author: Pihedy
 */

import { slugify } from "../utils/slugify";

export class DataManager {

    private storageKey: string = 'fooocus-enhancer-data';

    private static instance: DataManager;

    private data: Record<string, any> = {};

    private constructor() {
        this.bootstrap();
    }

    public static getInstance(): DataManager {
        if (!DataManager.instance) {
            DataManager.instance = new DataManager();
        }

        return DataManager.instance;
    }

    public set(key: string, data: any, turnToSlugify: boolean = true): void {
        if (turnToSlugify) {
            key = slugify(key);
        }

        this.data[key] = data;

        this.saveStorage();
    }

    private bootstrap(): void {
        this.data = this.loadData();
    }

    private loadData(): any {
        let data = localStorage.getItem(this.storageKey);

        if (data === null) {
            this.initStorage();
        }

        return data ? JSON.parse(data) : {};
    }

    private initStorage(): void {
        this.saveStorage({});
    }

    private saveStorage(data: any = null): void {
        if (data === null) {
            data = this.data;
        }

        localStorage.setItem(this.storageKey, JSON.stringify(data));
    }
}
