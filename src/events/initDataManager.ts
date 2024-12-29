/** 
 * @author: Pihedy
 */

import { dataManager } from "../components/dataManager";

/** 
 * Just a simple test and initialization for DataManager.
 */
document.addEventListener('fooocus-enhancer-ready', () => {
    dataManager().set('current_date', new Date());
});
