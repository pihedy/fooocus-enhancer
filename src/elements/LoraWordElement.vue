<script setup lang="ts">

import { onMounted, ref, watch } from 'vue';

import { ModelStore } from '@/stores/ModelStore';
import { MountStore } from '@/stores/MountStore';

import { storageDataManager } from '@/utils/storageDataManager';

import { gradioApp } from '@/utils/gradioApp';

let props = defineProps({
    model_id: {
        type: String,
        default: ''
    }
});

onMounted(() => {
    MountStore.value.current += 1;
});

let isEdit = ref<boolean>(false);
let isShowed = ref<boolean>(false);

let loraWords = ref<string>('');

watch(() => ModelStore.value.loras[props.model_id], (newVal) => {
    if (!newVal || newVal == 'none') {
        isShowed.value = false;

        return;
    }

    isShowed.value = true;
    loraWords.value = storageDataManager().get(
        `lora_words.${newVal}`, 
        []
    ).join(', ');
});

watch(isEdit, (editState) => {
    if (editState) {
        return;
    }

    storageDataManager().set(
        `lora_words.${ModelStore.value.loras[props.model_id]}`, 
        loraWords.value.replace(/, /g, ',').split(',')
    );
});

/** 
 * Inserts the current value of `loraWords` into the positive prompt area of the Gradio application.
 */
function insertPrompt(): void {
    let Area = gradioApp().getPositivePromptArea();

    if (Area === null) {
        return;
    }

    let separator = '';

    if (Area.value.length > 0) {
        separator = `,`;
    }

    Area.value += `${separator} ${loraWords.value}`;

    Area.dispatchEvent(new Event('input', {bubbles: true}));
}

</script>

<template>
    
    <div class="fe-container" v-if="isShowed">

        <div class="row mb-1">
            <textarea 
                :name="ModelStore.loras[props.model_id] || undefined" 
                :class="['light', { disabled: !isEdit }]"
                v-model="loraWords"
                :disabled="!isEdit"
                :readonly="!isEdit"
                placeholder="Write the LoRA trigger words here..."
            ></textarea>
        </div>

        <div class="row btn-group">
            <div 
                class="btn" 
                @click="() => isEdit = !isEdit"
            >
                {{ isEdit ? 'Save' : 'Edit' }}
            </div>

            <div 
                class="btn" 
                @click="() => insertPrompt()"
                v-if="!isEdit"
            >Inster</div>
        </div>

    </div>

</template>
