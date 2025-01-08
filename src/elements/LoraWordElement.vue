<script setup lang="ts">

let test = defineProps({
    valami: {
        type: String,
        default: ''
    }
});

console.log(test.valami);

</script>

<template>
    
    <div class="fc-container">test</div>

</template>
