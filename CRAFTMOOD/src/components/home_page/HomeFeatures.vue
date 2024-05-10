<template>
    <div class="home-page__features">
      <HomeTitle></HomeTitle>
      <div class="features-buttons">
        <AppButton class="to-gallery-button" @click="$router.push('/gallery')">GET STARTED</AppButton>
        <AppButton 
          v-if="!userStore.isAuth" 
          class="to-fakeuser-button" 
          @click="userStore.login({email: 'craftmoodfakemail@gmail.com', password: '1231234'})">
            {{!userStore.isLoading ? 'ENTER AS A FAKE USER' : 'WAIT...' }}
        </AppButton>
      </div>
      
    </div>
</template>


<script lang="ts" setup>
import HomeTitle from '@/components/home_page/HomeTitle.vue';
import { useUserDataStore } from '@/stores/useUserDataStore';
const userStore = useUserDataStore()

</script>

<style scoped>
.home-page__features {
  display: flex;
  flex-direction: column;
  grid-gap:150px;
  padding: 150px 0 150px 0;
  animation-name: fade;
  animation-duration: 1.2s;
  animation-fill-mode: forwards;
  animation-timing-function: ease-in-out;
}
@keyframes fade {
  from {

    opacity: 0%;
  } 
  to {

    opacity: 100%;
  }
}


.to-gallery-button {
 
  height: auto;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}

.features-buttons {
  display: flex;
  flex-direction: column;
  grid-gap: 15px;
 
}

@media(max-width: 1450px) {
  .home-page__features {
    overflow: hidden;
    justify-content: center;
    align-self: center;
    grid-gap: 50px;
    position: relative;
    z-index: 2;
  }
  .features-buttons {
    justify-content: center;
  align-items: center;
  }
  .to-gallery-button {
    justify-content: center;
    align-items: center;
    width: 100%;
  }
}
@media(max-width:320px) {
  .home-page__features {
    padding: 70px 0px 70px 0px
  }
}
</style>