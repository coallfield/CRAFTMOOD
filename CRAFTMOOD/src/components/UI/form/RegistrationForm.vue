<template>
    <div class="registration-container">
        <form @submit.prevent class="form">
            <AppLogo class="form__logo"></AppLogo>
            <div class="form__title">
                <h1>ENTER DATA</h1>
            </div>
            <div class="form__inputs">
                <FormInput  v-bind:value="userData.email" @input="userData.email = $event.target.value" placeholder="email" ></FormInput>
                <FormInput  v-bind:value="userData.password" @input="userData.password = $event.target.value" placeholder="password" type="password" ></FormInput>   
            </div>
            <div class="from__login-link">
                <router-link class="from__login-link__link" :to="props.to">{{ props.link }}</router-link>
            </div>
            <AppButton class="form__button" @click="props.authFunction(userData)">{{ props.buttonText }}</AppButton>
            <div v-if="userStore.errorMessage !== ''" class="form__error">
                <p class="form__error__message">{{ userStore.errorMessage.toUpperCase() }}</p>
            </div>
            <div v-if="userStore.isLoading" class="form__loading">
                <p class="form__loading__message">WAIT</p>
            </div>
        </form>
    </div>



</template>
<script setup lang="ts">
import AppLogo from '@/components/AppLogo.vue';
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useUserDataStore } from '@/stores/useUserDataStore';
import type { IUserRequest } from '@/interfaces/IUserRequest';
import type {linkText} from '@/types/linkText'


const props = defineProps<{
    link: linkText,
    authFunction: ( userData: IUserRequest) => {},
    buttonText:string,
    to: string
}>()


const userStore = useUserDataStore()
const userData = ref<IUserRequest>({
    email: '',
    password: ''
})

</script>


<style scoped>

.registration-container {
    margin-bottom: 20px;
}
.form {
    width: 100%;
    height: 100%;


}
.form__logo {
    display: flex;
    justify-content: center;
    width: 100%;
}

.form__title {
    margin-top: 30px;
    width: 100%;
    text-align: center;
    font-size: 0.7rem;
}

.form__inputs {
    margin-top: 10px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    grid-gap: 20px
}

.form__button {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    
}

.form__error {
    margin-top: 20px;
    width: 100%;
    text-align: center;
}
.form__error__message {

    font-size: 1.5rem;
    color: rgb(197, 13, 13);;
}

.from__login-link {
    margin-top: 10px;
    width: 100%;
    display: flex;
    justify-content: center;
   
}
.from__login-link__link {
    text-decoration: none;
}
.from__login-link__link:hover {
    text-decoration: underline;
    color:  rgb(197, 13, 13);
}

.registration-container {

    width: 500px;
    height: auto;
    padding: 20px;
    border: 2px solid rgb(240, 239, 243);
    background-color: rgb(45, 45, 59);

}


.form__inputs-attentions {
    display: flex;
    justify-content: center;
    
}
.form__inputs-attentions__attention {
    color: rgb(197, 13, 13);
}

.form__loading {
    margin-top: 20px;
    width: 100%;
    text-align: center;
}

.form__loading__message {
    font-size: 1.5rem;
    color: rgb(197, 13, 13);
}


@media(max-width:545px) {
    .registration-container {
        margin-top: 20px;
        width: 100%;
        height: 100%;
        border: none;
        margin-bottom: 0px;
    }
}
</style>