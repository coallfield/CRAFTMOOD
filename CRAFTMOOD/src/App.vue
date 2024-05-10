

<template>
    <div class="app">
      <AppHeader></AppHeader>
      <RouterView class="main" />
      <AppFooter></AppFooter>
    </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import { onMounted } from 'vue';
import { useUserDataStore } from './stores/useUserDataStore';
import { useMoodboardsStore } from './stores/useMoodboardsStore';

const userStore = useUserDataStore()
const moodboadStore = useMoodboardsStore()
onMounted(async () => {
  if (localStorage.getItem('accessToken')) {
    try {
      await userStore.checkAuth()
      await moodboadStore.getMoodboards()
    } catch (error) {
      console.log(error)
    }

  }
})
</script>

<style>
* {
  scroll-behavior: smooth;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: "Nunito Sans", sans-serif;
  font-style: normal;
  font-variation-settings:
    "wdth" 100,
    "YTLC" 500;
    color: rgb(240, 239, 243);
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: rgb(27, 27, 32);
}

.main { 
 
  flex: 1 1 auto;

}




</style>
