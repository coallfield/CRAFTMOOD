<template>
<div  class="no-results">
    <div  class="no-results__message">NOTHING WAS FOUND FOR YOUR REQUEST</div>
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
    height: 100%;
    text-align: center;
    font-size: 2.5rem;
    margin: 5px;
    font-weight: 600;
}

</style>