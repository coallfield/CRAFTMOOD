<template>
    <div class="login-page">
        <RegistrationForm 
            to="/registration"
            :authFunction="userStore.login"
            buttonText="SIGN IN"
            link="Don't have an account?">
            
        </RegistrationForm>
    </div>

</template>


<script setup lang="ts">

import { useUserDataStore } from '@/stores/useUserDataStore';

const userStore = useUserDataStore()
</script>


<style scoped>
.login-page {
   
    height: 100%;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
   

}


</style>