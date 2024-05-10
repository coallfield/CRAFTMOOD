<template>
    <div class="photo-card" :class="`${animate ? 'photo-card_animate' : ''} ${isDeletingPhoto ? 'photo-card_deleting' : ''}`">
        <img @click="$router.push(`/photo/${props.photo.id}`)" class="photo-card__photo"  :src="props.photo.urls.small">
        <div class="photo-card__small-description"> {{ upperFirstLetter() }} </div>
        <div @click="$router.push(`/photo/${props.photo.id}`)" v-if="route.fullPath === '/gallery'" class="photo-card__link-box"><a class="photo-card__link-box__link">Show more</a></div>
        <div @click="deletePhoto()"  v-if="route.fullPath.startsWith('/moodboard')" class="photo-card__link-box"><a class="photo-card__link-box__link">Delete</a></div>
    </div>

</template>


<script setup lang="ts">
import type {IPhoto} from '@/interfaces/IPhoto'
import { useMoodboardsStore } from '@/stores/useMoodboardsStore';
import { useRoute } from 'vue-router';
import { ref } from 'vue';


const route = useRoute()
const emits = defineEmits(['newCurrentMoodboard'])

const isDeletingPhoto = ref(false)
    const props = defineProps<{
        photo: IPhoto,
        animate: boolean
    }>()


    function upperFirstLetter(): string  {
        if(props.photo.alt_description) {
            return props.photo.alt_description.charAt(0).toUpperCase() + props.photo.alt_description.slice(1);
        }
         else {
            return ''
        }
    }

async function deletePhoto() {
    try {
        isDeletingPhoto.value = true
        const moodboard = await moodboadStore.deletePhoto(props.photo.id, route.params.id as string)
        emits('newCurrentMoodboard', moodboard)
    } catch (error) {
        console.log(error)
    } finally {
        isDeletingPhoto.value = false
    }

}

const moodboadStore = useMoodboardsStore()


</script>


<style scoped>
.photo-card {
    width: 100%;
    margin-bottom: 30px;
    break-inside: avoid;
    transition: 0.5s ease-in-out;
}

.photo-card_animate:hover {
    transform:translateY(-15px);
    .photo-card__link-box { 
        opacity: 1;
    }
}



.photo-card__photo {
 
    border: 1px solid rgb(240, 239, 243);
    max-width: 100%;
}

.photo-card__link-box {
    opacity: 0;
    transition: 0.5s ease-in-out;
}

.photo-card__link-box__link {
    cursor: pointer;
    color: rgb(197, 13, 13);
}
.photo-card__link-box__link:hover {
    text-decoration: underline;
}

@keyframes fade {
    0% {
    opacity: 1;
    filter: blur(0px) grayscale(0%);;
  }
  100% {
    opacity: 0;
    filter: blur(10px) grayscale(100%);;
  }
}

.photo-card_deleting {
  animation: fade 2s infinite;
}

</style>