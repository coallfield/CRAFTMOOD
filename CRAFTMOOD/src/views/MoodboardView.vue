<template>
    <div class="mooodboard-page">
        <div class="moodboard-content" :class="isDeleting ? 'moodboard-content_deleting' : ''">
            <MoodboardList @setNewMoodboard="setNewMoodboard" :isFailedToFetch="isFailedToFetch" :currentMoodboard="currentMoodboard" ></MoodboardList>
            <div v-if="currentMoodboard?.photos?.length === 0" class="no-photos-moodboard"><h1>YOU HAVEN'T ATTACHED ANYTHING</h1></div>
            <ProposedImages :currentMoodboard="currentMoodboard" @savePhoto="savePhoto" :proposedPhotos="photosStore.proposedPhotos"></ProposedImages>
        </div>
        
        <div class="moodboard-delete">
            <AppButton @click="deleteMoodboard(currentMoodboard.id, route.params.id as string)">DELETE MOODBOARD</AppButton>
        </div>
        <FailedMessage v-if="moodboadStore.isError">{{ moodboadStore.errorMessage }}</FailedMessage>
    </div>
</template>

<script lang="ts" setup>

import type { IMoodboard } from '@/interfaces/IMoodboard';
import { useRoute } from 'vue-router';
import { onMounted, onUnmounted, ref} from 'vue';
import { useMoodboardsStore } from '@/stores/useMoodboardsStore';

import { usePhotosStore } from '@/stores/usePhotosStore';
import type { IPhoto } from '@/interfaces/IPhoto';
import FailedMessage from '@/components/FailedMessage.vue';
import MoodboardList from '@/components/moodboard_page/MoodboardList.vue';
import ProposedImages from '@/components/moodboard_page/ProposedImages.vue';



const photosStore = usePhotosStore()
const moodboadStore = useMoodboardsStore()
const currentMoodboard = ref<IMoodboard>({} as IMoodboard)
const route = useRoute()
const isFailedToFetch = ref(false)
const isDeleting = ref(false)

function setNewMoodboard(moodboard: IMoodboard) {
    currentMoodboard.value = moodboard
} 

async function deleteMoodboard(moodboardId: string, routeId: string) {
        try {
            isDeleting.value = true
            await moodboadStore.deleteMoodboard(moodboardId, routeId)
        } catch (error) {
            console.log(error)
        } finally {
            isDeleting.value = false
        }
}


async function savePhoto(data: [IPhoto, string]) {
    try {
        const [photo, moodboardId] = data
        moodboadStore.isSaving = true
        
        currentMoodboard.value = await moodboadStore.savePhoto(photo, moodboardId) as IMoodboard
    } catch (error) {
        console.log(error)
    } finally {
        moodboadStore.isSaving = false
    }
}


onMounted(async() => {
    try {
        currentMoodboard.value = await moodboadStore.getCurrentMoodboard(route.params.id as string)
        await photosStore.getPhotos('Proposed', undefined, undefined, currentMoodboard.value.name, Math.floor(Math.random() * 20) + 1)
    } catch (error) {
        console.log(error)
        isFailedToFetch.value = true
    }
    
})

onUnmounted(() => {
    photosStore.proposedPhotos = []
})
</script>


<style scoped>

.mooodboard-page {
    display: flex;
    flex-direction: column;
    align-items: center
}
.moodboard-delete {
    margin-top: 50px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
}

.moodboard-content {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex-direction: column;
}
.moodboard-content_deleting {
  animation: fade 2s infinite;
}
.no-photos-moodboard {
    text-align: center;
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


</style>