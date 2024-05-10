<template>
  <div class="home-page">
    <HomeFeatures></HomeFeatures>
    <HomePhotos ></HomePhotos>
  </div>
</template>

<script setup lang="ts">
import HomeFeatures from '@/components/home_page/HomeFeatures.vue';
import HomePhotos from '@/components/home_page/HomePhotos.vue';
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