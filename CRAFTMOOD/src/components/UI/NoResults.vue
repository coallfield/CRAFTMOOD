<template>
<div class="no-results">
    <div class="no-results__message">Nothing was found for your request</div>
</div>
</template>



<script lang="ts" setup>
import { defineComponent } from 'vue';

const NoResults = defineComponent({
    name: 'NoResults'
})
</script>

<style scoped>
.no-results {
   
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-size: 2rem;
   
}
.no-results-message {
    text-align: center;
}

</style>