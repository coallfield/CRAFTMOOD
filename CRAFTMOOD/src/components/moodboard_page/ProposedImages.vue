<template>
    <div 
        v-if="props.proposedPhotos.length !== 0" 
        class="proposed-images">
            <h1 class="proposed-images__title">ADD SOME IMAGES</h1>
            <Swiper 
                :autoHeight="true" 
                :spaceBetween="20" 
                :navigation="true" 
                :pagination="{
                    clickable: true,
                }" 
                :modules="modules" 
                class="mySwiper">

                    <SwiperSlide class="proposed-images__images" :key="photo.id" v-for="photo in props.proposedPhotos">
                        <div class="proposed-images__images__image-container">
                            <img loading="lazy" class="image" :src="photo.urls.small">
                            <div class="overlay"></div>
                            <div class="loading-overlay" v-if="moodboadStore.isSaving"></div>
                            <button
                                :class="isAlreadyContain(photo, props.currentMoodboard).value ? 'save-message_disabled' : ''"
                                :disabled="isAlreadyContain(photo, props.currentMoodboard).value"
                                @click="savePhoto(photo, props.currentMoodboard.id)" class="save-message">SAVE IMAGE</button>
                        </div>
                    </SwiperSlide>
            </Swiper>


    </div>

</template>


<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { computed } from 'vue';
import type { IPhoto } from '@/interfaces/IPhoto';
import type { IMoodboard } from '@/interfaces/IMoodboard';
import { useMoodboardsStore } from '@/stores/useMoodboardsStore';


const emits = defineEmits(['savePhoto'])
const moodboadStore = useMoodboardsStore()


const props = defineProps<{
    currentMoodboard: IMoodboard,
    proposedPhotos: IPhoto[],

}>()

 
const savePhoto = (photo: IPhoto, moodboardId: string) => {
        emits('savePhoto', [photo, moodboardId])
}


const isAlreadyContain = (photo: IPhoto, moodboard: IMoodboard) => computed(() => {
    return moodboard.photos.some(el => el.id === photo.id)
})




const modules = [Pagination, Navigation]
</script>

<style scoped>
.swiper-slide {
    display: flex;
    justify-content: center;
    width: auto;
   
}
.proposed-images {
    width: 100%;
    max-width: 600px; 
    margin-top: 30px; 
}

.proposed-images__title {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-bottom: 10px;
}


.proposed-images__images__image-container {
    position: relative;
    width: 100%;

    max-width: 400px; 
    max-height: 600px;
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 30%;
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
}

.save-message {
background: none;
border: none;
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    color: white;
    font-size: 1.5rem;
    font-weight: bold;
    cursor: pointer;
    object-fit: contain;
}
.save-message:hover {
    color: rgb(197, 13, 13);;
}
.save-message_disabled {
    text-decoration: line-through;
    
}
.image {
    border: 1px solid rgb(240, 239, 243);
    width: 100%;
    display: block;
    image-rendering: auto; 
}



.loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to bottom, rgba(255, 0, 0, 0) 0%, rgb(197, 13, 13) 100%);
    animation: loading-animation 2s linear infinite;
    z-index: 1;
}

@keyframes loading-animation {
    0% {
        height: 0%;
    }
    100% {
        height: 100%;
    }
}

@media(max-width: 620px) {
    .proposed-images {

    max-width: 500px; 
 
}
}
@media(max-width:420px) {
    .proposed-images {

    max-width: 400px; 
    }
 .mySwiper {
    width: 300px;
 }

}

</style>