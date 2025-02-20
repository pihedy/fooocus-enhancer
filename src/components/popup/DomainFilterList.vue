<script setup lang="ts">

import { ref, onMounted } from 'vue';
import { count } from '@/utils/count';

let accepted = ref<Record<string, string>[]>([]);

let newField = ref({
    name: '',
    address: ''
});

function deleteRow(index: number): void {
    accepted.value.splice(index, 1);

    saveAcceptedOnly();
}

function addRow(): void {
    if (newField.value.name.length <= 0 || newField.value.address.length <= 0) {
        return;
    }

    accepted.value.push({
        name: newField.value.name,
        address: newField.value.address
    });

    saveAcceptedOnly();

    newField.value = {name: '', address: ''};
}

function saveAcceptedOnly() {
    chrome.storage.local.get(['fooocus_enhancer'], (result) => {
        let data = result.fooocus_enhancer || {};

        data.accepted = accepted.value;

        chrome.storage.local.set({ fooocus_enhancer: data }, () => {
            console.log('Accepted is updated.', data);
        });
    });
}

onMounted(() => {
    chrome.storage.local.get(['fooocus_enhancer'], (result) => {
        const data = result.fooocus_enhancer ?? {};

        if (!data.accepted || count(data.accepted) === 0) {
            data.accepted = [{ 
                name: 'Default', 
                address: 'http://127.0.0.1:7865'
            }];
        }

        if (!Array.isArray(data.accepted)) {
            data.accepted = Object.values(data.accepted);
        }

        accepted.value = data.accepted;

        chrome.storage.local.set({ fooocus_enhancer: data }, () => {
            console.log('Accepted fixed as array in storage.');
        });
    });
});

</script>

<template>

    <div class="px-2 mb-2">

        <Fieldset legend="IP/Domain Filters">

            <DataTable :value="accepted" tableStyle="width: 100%">
                <template #empty>No IP or domain address is specified.</template>


                <Column field="name" header="Name" style="width: 45%"></Column>

                <Column field="address" header="IP/Domain Address" style="width: 50%"></Column>

                <Column bodyStyle="text-align:center" style="width: 5%">

                    <template #body="{ index }">
                        <Button @click="deleteRow(index)" style="padding: 0.25rem 0.5rem; font-size: 0.7rem" label="Delete" severity="contrast" />
                    </template>

                </Column>
            </DataTable>

            <div class="input-filter-group pt-2">

                <div class="flex flex-col gap-2 mb-3" style="display: flex; flex-direction: column">
                    <label for="name">New Filter Name</label>
                    <InputText id="name" size="small" v-model="newField.name" aria-describedby="name-help" />
                    <Message size="small" severity="secondary" variant="simple">Enter your username to reset your password.</Message>
                </div>

                <div class="flex flex-col gap-2 mb-3" style="display: flex; flex-direction: column">
                    <label for="address">New IP/Domain Address</label>
                    <InputText id="address" size="small" v-model="newField.address" aria-describedby="address-help" />
                    <Message size="small" severity="secondary" variant="simple">Enter your username to reset your password.</Message>
                </div>

                <Button label="Add Filter" severity="contrast" size="small" @click="addRow" />
                
            </div>

        </Fieldset>

    </div>

</template>
