<template>
    <header class="app-header">
          <div class="logo-username">
            <AppLogo class="logo-username__app-logo" @click="$router.push('/')"></AppLogo>
            <div v-if="userStore.userData.user" class="logo-username__username">{{ userStore.userData.user.email }}</div>
            <router-link v-else to="/login" class="navigation__link">LOG IN</router-link>
          </div>
          <div class="navigation">
              <router-link to="/" class="navigation__link">Home</router-link>
              <router-link to="/gallery" class="navigation__link">Gallery</router-link>
              <router-link :to="`/profile/${userStore.userData.user?.id}`" class="navigation__link">Profile</router-link>
          </div>
      </header>
</template>

<script setup lang="ts">
import AppLogo from './AppLogo.vue';
import { useUserDataStore } from '@/stores/useUserDataStore';

const userStore = useUserDataStore()
</script>


<style scoped>
.app-header {
    background-color: rgb(27, 27, 32);
    width: 100%;
    height: 100px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 40px 0 40px;
    z-index: 2;
}


.navigation {
  display: flex;
  flex-direction: row;
  grid-gap: 10px
}
.navigation__link {
   text-decoration: none;
}

.navigation__link:hover {
  text-decoration: underline;
  color:  rgb(197, 13, 13);
}
.logo-username {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  grid-gap: 15px
}
.logo-username__app-logo {
  cursor: pointer;
}

@media (max-width: 760px) {
  .app-header {
    flex-direction: column;
    justify-content: center;
  }
}

@media (max-width: 445px) {
   .logo-username {
    margin-top: 5px;
      flex-direction: column;
      grid-gap: 0px
   }
   .app-header {
    grid-gap: 20px;
    height: 120px;
   }
}

</style>