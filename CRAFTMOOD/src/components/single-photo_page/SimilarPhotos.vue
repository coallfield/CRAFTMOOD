<template>
    <div class="single-card-info__similar-photos">
        <div class="single-card-info__similar-photos__title">SIMILAR PHOTOS</div>
        <ListPhotos 
            :animate="false" 
            v-if="!photosStore.isLoading"
            :photos="photosStore.similarPhotos.filter((el) => el.id !== photosStore.singlePhoto.id)">
        </ListPhotos>
        <SkeletonList v-else  :count="10"></SkeletonList>
    </div>
</template>


<script lang="ts" setup>


import { usePhotosStore } from '@/stores/usePhotosStore';
const photosStore = usePhotosStore()
</script>

<style scoped>
.single-card-info__similar-photos__title {
  width: 100%;
  text-align: center;
  font-size: 1.5rem;
}
</style>../UI/ListPhotos.vue../UI/SkeletonList.vue