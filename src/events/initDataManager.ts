/** 
 * @author: Pihedy
 */

import { storageDataManager } from "../components/storageDataManager";

/** 
 * Just a simple test and initialization for DataManager.
 */
document.addEventListener('fooocus-enhancer-ready', () => {
    storageDataManager().set('date.current', new Date());
});
