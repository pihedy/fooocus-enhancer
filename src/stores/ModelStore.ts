/** 
 * @author: Pihedy
 */

import { ModelDataStoreInterface } from '@/interfaces/ModelDataStoreInterface';
import { ref } from 'vue';

export const ModelStore = ref<ModelDataStoreInterface>({
    model_id: null,
    lora: null
});
