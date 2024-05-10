<template>
<div class="search-input">
    <input class="search-input__input" type="text" placeholder="Type something..." @change="searchPhotos($event)">
</div>
</template>

<script setup lang="ts">

import { usePhotosStore } from '@/stores/usePhotosStore';

const photosStore = usePhotosStore()

async function searchPhotos(event: Event) {
    const value = (event.target as HTMLInputElement).value
    photosStore.currentPage = 1
    if(value.trim() === '') {
       photosStore.setQueryParam('random')
       await photosStore.getPhotos('Basic')
    } else {
       photosStore.setQueryParam(value)
       await photosStore.getPhotos('Basic')
    }
}

</script>

<style scoped>
.search-input {
    width: 100%;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.search-input__input {
    width: 500px;
    height: 50px;
    background-color: rgb(27, 27, 32);
    outline: none;
    border: 1px solid rgb(240, 239, 243);;
    color: rgb(240, 239, 243);;
    padding-left: 10px;
}

@media (max-width: 670px) {
    .search-input__input {
        width: 350px;
    }
}
@media(max-width:405px) {
  .search-input__input {
    width: 300px;
  }
}
@media(max-width:355px) {
  .search-input__input {
    width: 250px;
  }
}
</style>