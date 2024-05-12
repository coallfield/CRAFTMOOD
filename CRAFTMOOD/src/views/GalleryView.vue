<template>
    <div class="gallery-page">
        <SearchInput></SearchInput> 
        <ListPhotos :animate="true" v-if="photosStore.isLoaded && photosStore.photos.length > 0" :photos="photosStore.photos"></ListPhotos>     
        <SkeletonList v-else-if="photosStore.isLoading" :count="20"></SkeletonList>
        <NoResults v-else-if="photosStore.isLoaded && photosStore.photos.length === 0"></NoResults>
        <FailedMessage v-if="photosStore.errorMessage !== ''">{{ photosStore.errorMessage }}</FailedMessage>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { usePhotosStore } from '@/stores/usePhotosStore';
import { useUserDataStore } from '@/stores/useUserDataStore';
import SearchInput from '@/components/gallery_page/SearchInput.vue';
import FailedMessage from '@/components/FailedMessage.vue';



const photosStore = usePhotosStore()
const userStore = useUserDataStore()



onMounted(async () => {
        try {
            photosStore.setLoadings(true, false)
            await userStore.checkAccessToken()
            await photosStore.getPhotos('Basic')
        } catch (error) {
            console.log(error)
        } finally {
            photosStore.setLoadings(false, true)
        }
})

</script>


<style scoped>
.gallery-page {
    background-color: rgb(27, 27, 32);
   
}




</style>