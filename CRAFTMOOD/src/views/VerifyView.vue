<template>
    <div class="verify">
        <div class="verify-message">
            <h1 v-if="!userStore.userData.user.isActivated">PLEASE, VERIFY YOUR ACCOUNT<br>A VERIFICATION LINK HAS BEEN SENT TO YOUR MAIL</h1>
            <h1 v-else>YOU CAN USE CRAFTMOOD</h1>
        </div>
    </div>

</template>

<script setup lang="ts">
import { useUserDataStore } from '@/stores/useUserDataStore';

const userStore = useUserDataStore()
</script>


<style scoped>
.verify {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
 
}
 .verify-message {
    text-align: center;
}


</style>