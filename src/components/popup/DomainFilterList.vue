<script setup lang="ts">

import { ref, onMounted } from 'vue';

import { storage } from '@extend-chrome/storage';
import { SettingsInterface } from '@/interfaces/SettingsInterface';
import { count } from '@/utils/count';

let settings = ref<SettingsInterface>({
    accepted_urls: []
});

let newField = ref({
    name: '',
    address: ''
});

function deleteRow(index: number): void {
    settings.value.accepted_urls.splice(index, 1);

    saveSettings();
}

function addRow(): void {
    if (newField.value.name.length <= 0 || newField.value.address.length <= 0) {
        return;
    }

    settings.value.accepted_urls.push({
        name: newField.value.name,
        url: newField.value.address
    });

    saveSettings();

    newField.value = {name: '', address: ''};
}

function saveSettings(): void {
    storage.local.set(settings.value);
}

onMounted(() => {
    storage.local.get<SettingsInterface>({accepted_urls: []}).then((result) => {
        if (result.accepted_urls.length <= 0) {
            result.accepted_urls = [{
                name: 'Default',
                url: '127.0.0.1:7865'
            }];
        }

        if (count(result.accepted_urls) > 0) {
            result.accepted_urls = Object.values(result.accepted_urls);
        }

        if (!Array.isArray(result.accepted_urls)) {
            result.accepted_urls = [];
        }

        settings.value = result;

        saveSettings();
    });
});

</script>

<template>

    <div class="px-2 mb-2">

        <Fieldset legend="IP/Domain Filters">

            <DataTable :value="settings.accepted_urls" tableStyle="width: 100%">
                <template #empty>No IP or domain address is specified.</template>


                <Column field="name" header="Name" style="width: 45%"></Column>

                <Column field="url" header="IP/Domain Address" style="width: 50%"></Column>

                <Column bodyStyle="text-align:center" style="width: 5%">

                    <template #body="{ index }: { index: number }">
                        <Button @click="deleteRow(index)" style="padding: 0.25rem 0.5rem; font-size: 0.7rem" label="Delete" severity="contrast" />
                    </template>

                </Column>
            </DataTable>

            <div class="input-filter-group pt-2">

                <div class="flex flex-col gap-2 mb-3" style="display: flex; flex-direction: column">
                    <label for="name">New Filter Name</label>
                    <InputText id="name" size="small" maxlength="15" v-model="newField.name" aria-describedby="name-help" />
                    <Message size="small" severity="secondary" variant="simple">Enter the filter name.</Message>
                </div>

                <div class="flex flex-col gap-2 mb-3" style="display: flex; flex-direction: column">
                    <label for="address">New IP/Domain Address</label>
                    <InputText id="address" size="small" v-model="newField.address" aria-describedby="address-help" />
                    <Message size="small" severity="secondary" variant="simple">Enter the address, even with regex.</Message>
                </div>

                <Button label="Add Filter" severity="contrast" size="small" @click="addRow" />
                
            </div>

        </Fieldset>

    </div>

</template>
