<template>
    <div v-if="photosStore.homePhotos.length > 0" class="photo-grid">
        <img class="photo-grid__photo" 
            :src="photo.urls.small" 
            v-for="photo in photosStore.homePhotos" :key="photo.id" 
            :style="{  
                left: `${Math.floor(Math.random() * 100) + 1}%`, 
                top: `${Math.floor(Math.random() * 100) + 1}%`, 
                transform: `scale(${Math.random() * 0.5 + 0.5})`, 
                animationDelay: `${Math.random() * 10}s`
            }">
    
    </div>

</template>


<script lang="ts" setup>
import { usePhotosStore } from '@/stores/usePhotosStore';
import { onMounted, onUnmounted } from 'vue';
const photosStore = usePhotosStore()

onMounted(() => {
    photosStore.getPhotos('Home', undefined, undefined, undefined, Math.floor(Math.random() * 20) + 1)
})

onUnmounted(() => {
  photosStore.homePhotos = []
})

</script>


<style scoped>
.photo-grid {
  margin-bottom: 50px;
  position: relative;
  width: 750px;
  height: 300px; 

  margin-left: auto; 
  
}

.photo-grid__photo {
  
  position: absolute;
  filter: grayscale(100%);
  animation: saturateAnimation 5s linear infinite;

}

@keyframes saturateAnimation {
    0% { filter: grayscale(100%); }
    50% { filter: grayscale(0%); }
    100% { filter: grayscale(100%); }
}

@media(max-width: 1450px) {
  .photo-grid {
    display: none
    

  
  }

}

</style>