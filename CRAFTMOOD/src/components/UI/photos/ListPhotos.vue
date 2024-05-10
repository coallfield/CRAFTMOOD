<template>
    <div class="list-photos">
        <div class="list-photos__photos">
          
            <PhotoCard @newCurrentMoodboard="setNewMoodboard" :key="photo.id" :animate="props.animate" v-for="photo in props.photos" :photo="photo"></PhotoCard>
          
        </div>
        <div v-if="props.photos.length > 0 && $route.fullPath === '/gallery'" class="list-photos__buttons">
            <AppButton @click="prevPage()" v-if="photosStore.currentPage > 1" class="list-photos__buttons__prev-button">PREVIOUS</AppButton>
            <AppButton @click="nextPage()" class="list-photos__buttons__next-button">NEXT</AppButton>
        </div>
        
    </div>
</template>


<script setup lang="ts">

import { usePhotosStore } from '@/stores/usePhotosStore';

import type {IPhoto} from '@/interfaces/IPhoto'


import type { IMoodboard } from '@/interfaces/IMoodboard';

const emits = defineEmits(['newCurrentMoodboard'])

const photosStore = usePhotosStore()

    const props = defineProps<{
        photos: IPhoto[],
        animate: boolean
    }>()

    function prevPage()  {
        if(photosStore.currentPage === 1) { 
            return
        } else {
            photosStore.previousPage()
            photosStore.getPhotos('Basic')
            window.scrollTo(pageYOffset, 0);
        }
    }

    function nextPage() { 
        photosStore.nextPage()
        photosStore.getPhotos('Basic')
        window.scrollTo(pageYOffset, 0);
    }

    function setNewMoodboard(moodboard: IMoodboard) {
        emits('newCurrentMoodboard', moodboard)
    }

</script>


<style scoped>

.list-photos__photos {
    padding: 0 20px 0px 20px;
    margin: 20px auto;
    width: 100%;
    columns: 4;
    column-gap: 40px;
    column-fill: balance;
}

.list-photos__buttons {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    grid-gap: 40px;
    padding-bottom: 40px;
    
}

@media (max-width: 1250px) {
    .list-photos__photos {
        columns: 3;
    }
}
@media (max-width: 930px) {
    .list-photos__photos {
        columns: 2;
    }
}
@media(max-width: 800px) {
    .list-photos__buttons {
        flex-direction: column;
    }
}

@media (max-width: 670px) {
    .list-photos__photos {
        columns: 1;
    }
    .photo-card {
        display:  flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
}

</style>