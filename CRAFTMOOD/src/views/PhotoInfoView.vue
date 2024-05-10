<template>
  <div class="single-photo-page">
    <div class="single-card-info">
      <PhotoCard 
            :animate="false" 
            v-if="!photosStore.isLoading && Object.keys(photosStore.singlePhoto).length !== 0" 
            class="single-card-info__card"
            :photo="photosStore.singlePhoto">
      </PhotoCard>
      <div v-else class="single-card-info__skeleton">
        <Skeleton  :count="1"></Skeleton>
      </div>
      
      <SinglePhotoSettings></SinglePhotoSettings>
      <SimilarPhotos></SimilarPhotos>
    </div>
  </div>

</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import {  onUnmounted, onMounted } from 'vue';
import { usePhotosStore } from '@/stores/usePhotosStore';
import { useTags } from '@/hooks/useTags';
import { useRouteID } from '@/hooks/useRouteID';
import { useUserDataStore } from '@/stores/useUserDataStore';
import SinglePhotoSettings from '@/components/single-photo_page/SInglePhotoSettings.vue';
import SimilarPhotos from '@/components/single-photo_page/SimilarPhotos.vue';



window.scrollTo(pageYOffset, 0);

const route = useRoute()
const photosStore = usePhotosStore()
const userStore = useUserDataStore()
useTags()
useRouteID(route)

onMounted(async () => {
    try {
        await userStore.checkAccessToken()
        await photosStore.getPhotos('Single', route.params.id as string)
    } catch (error) {
        console.log(error)
    }
})
onUnmounted(() => {
    photosStore.similarPhotos = []
    
})


</script>

<style scoped>

.single-card-info {
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.single-card-info__card {
  width: auto;
  display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
@media(max-width:460px) {
  .single-card-info__skeleton {
    width: 300px !important;
  }
}
@media (max-width:445px) {
  .single-card-info__card {
    width: 350px;
  }
  
}
@media (max-width:405px) {
  .single-card-info__card {
    width: 300px;
  }
}

@media (max-width:355px) {
  .single-card-info__card {
    width: 280px;
  }
  .single-card-info__skeleton {
    width: 280px !important;
  }
}



</style>