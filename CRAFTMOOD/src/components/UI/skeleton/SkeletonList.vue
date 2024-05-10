<template>
    <div class="skeleton-container">
        <Skeleton :width="props.width" :height="props.height" :count="props.count"></Skeleton>
    </div>



</template>

<script setup lang="ts">


const props = defineProps<{
    count: number
    width?: string,
    height?: string
}>()
</script>

<style scoped>

.skeleton-container {
    padding: 0 20px 150px 20px;
    margin: 20px auto;
    width: 100%;
    columns: 4;
    column-gap: 40px;
    column-fill: balance;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
}


</style>