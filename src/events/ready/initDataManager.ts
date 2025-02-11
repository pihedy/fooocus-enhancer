/** 
 * @author: Pihedy
 */

import { storageDataManager } from "@/utils/storageDataManager";

/** 
 * Just a simple test and initialization for DataManager.
 */
document.addEventListener('fooocus-enhancer-ready', () => {
    storageDataManager().set('date.current', new Date());
});
