/** 
 * @author: Pihedy
 */

export class DataManager {

    private static instance: DataManager;

    private data: Record<string, any> = {};

    private constructor() {

    }

    public static getInstance(): DataManager {
        if (!DataManager.instance) {
            DataManager.instance = new DataManager();
        }

        return DataManager.instance;
    }

}
