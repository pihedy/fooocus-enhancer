<script setup lang="ts">

import { onMounted } from 'vue';
import { MountStore } from '@/stores/MountStore';

onMounted(() => {
    MountStore.value.current += 1;
});

</script>

<template>
    
    <div class="fe-container p-0 m-0">

        <div class="row">

            <div class="separator mx-1">·</div>

            <a href="https://github.com/pihedy/fooocus-enhancer">Fooocus Enhancer by Pihedy</a>

        </div>

    </div>

</template>
