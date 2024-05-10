<template>
    <div class="registration-page">
        <RegistrationForm 
            to="/login"
            :authFunction="userStore.registration"
            buttonText="SIGN UP"
            link="Already have an account?">
        </RegistrationForm>
    </div>

</template>


<script setup lang="ts">
import { useUserDataStore } from '@/stores/useUserDataStore';

const userStore = useUserDataStore()
</script>


<style scoped>
.registration-page {
   
    height: 100%;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
   

}


</style>