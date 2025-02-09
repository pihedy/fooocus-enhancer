<script setup lang="ts">

import { ref, watch } from 'vue';

import { ModelStore } from '@/stores/ModelStore';
import { storageDataManager } from '@/utils/storageDataManager';

import { gradioApp } from '@/utils/gradioApp';

let props = defineProps({
    model_id: {
        type: String,
        default: ''
    }
});

let isEdit = ref<boolean>(false);
let isShowed = ref<boolean>(false);

let loraWords = ref<string>('');

watch(ModelStore, (NewModel) => {
    if (NewModel.model_id !== props.model_id) {
        return;
    }

    if (NewModel.lora === 'none' || NewModel.lora === '' || NewModel.lora === null) {
        isShowed.value = false;

        return;
    }

    isShowed.value = true;
    loraWords.value = storageDataManager().get(
        `lora_words.${ModelStore.value.lora}`, 
        []
    ).join(', ');
});

watch(isEdit, (editState) => {
    if (editState) {
        return;
    }

    storageDataManager().set(
        `lora_words.${ModelStore.value.lora}`, 
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
                :name="ModelStore.model_id || undefined" 
                :class="['light', { disabled: !isEdit }]"
                v-model="loraWords"
                :disabled="!isEdit"
                :readonly="!isEdit"
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
