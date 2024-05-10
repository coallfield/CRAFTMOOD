<template>
    <div class="gallery-page">
        <SearchInput></SearchInput>
        <ListPhotos :animate="true" v-if="!photosStore.isLoading" :photos="photosStore.photos"></ListPhotos>     
        <SkeletonList v-else :count="20"></SkeletonList>
        <NoResults v-if="photosStore.photos.length === 0 && photosStore.isLoading === false"></NoResults>
     
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { usePhotosStore } from '@/stores/usePhotosStore';
import { useUserDataStore } from '@/stores/useUserDataStore';
import SearchInput from '@/components/gallery_page/SearchInput.vue';




const photosStore = usePhotosStore()
const userStore = useUserDataStore()



onMounted(async () => {
        try {
            await userStore.checkAccessToken()
            await photosStore.getPhotos('Basic')
            
        } catch (error) {
            console.log(error)
        }
})

</script>


<style scoped>
.gallery-page {
    background-color: rgb(27, 27, 32);
}





</style>