<template>

        <input :style="{width: props.width}" :type="props.type" class="registration-container__form__inputs__input" :placeholder="props.placeholder">

</template>

<script lang="ts" setup>


const props = defineProps<{
    placeholder: string,
    width?: string,
    type?: string,
   
}>()
</script>

<style scoped>
.registration-container__form__inputs__input {
    width: 400px;
    height: 50px;
    background-color: rgb(45, 45, 59);
    outline: none;
    border: 2px solid rgb(240, 239, 243);
    color: rgb(240, 239, 243);
    padding-left: 10px;
}

@media (max-width: 405px) {

    .registration-container__form__inputs__input {
        width: 300px !important;

    }
}
@media (max-width: 355px) {

.registration-container__form__inputs__input {
    width: 250px !important;

}
}
</style>