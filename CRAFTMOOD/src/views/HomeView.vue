<template>
  <div class="home-page">
    <HomeFeatures></HomeFeatures>
    <HomePhotos ></HomePhotos>
    <FailedMessage v-if="userStore.errorMessage !== ''">{{ userStore.errorMessage }}</FailedMessage>
  </div>
</template>

<script setup lang="ts">
import FailedMessage from '@/components/FailedMessage.vue';
import HomeFeatures from '@/components/home_page/HomeFeatures.vue';
import HomePhotos from '@/components/home_page/HomePhotos.vue';
import { useUserDataStore } from '@/stores/useUserDataStore';

const userStore = useUserDataStore()
</script>


<style scoped>
.home-page {
  background-color: rgb(27, 27, 32);
  display: flex;
  padding: 0px 500px 30px 150px;
  position: relative;
}

@media(max-width:1450px) {
  .home-page {
    padding: 0px;
    flex-direction: column;
  
  }
}


</style>