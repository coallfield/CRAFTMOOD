<template>
    <div class="profile-page">
        <div v-if="!moodboardsStore.isFetchingMoodboards" class="moodboards">
            <MoodBoards :moodboards="moodboardsStore.moodboards" v-if="moodboardsStore.moodboards.length > 0"></MoodBoards>
            <h1 v-else class="no-moodboard">ADD SOME MOODBOARDS</h1>
        </div>
        <SkeletonList v-else width="400px" height="200px" :count="6"></SkeletonList>
        <SettingsButtons class="settings-buttons" @openCreatingWindow="openCloseCreatingWindow" @logout="logout"></SettingsButtons>
        <CreatingWindow @closeCreatingWindow="openCloseCreatingWindow" :isAddingMoodboard="isAddingMoodboard"></CreatingWindow>
        <FailedMessage v-if="moodboardsStore.errorMessage">{{ moodboardsStore.errorMessage }}</FailedMessage>
    </div>

</template>

<script lang="ts" setup>

import MoodBoards from '@/components/profile_page/MoodBoards.vue';
import SettingsButtons from '@/components/profile_page/SettingsButtons.vue';
import { useMoodboardsStore } from '@/stores/useMoodboardsStore';
import { useUserDataStore } from '@/stores/useUserDataStore';
import { onMounted, ref } from 'vue';
import FailedMessage from '@/components/FailedMessage.vue';


const userStore = useUserDataStore()
const moodboardsStore = useMoodboardsStore()
const isAddingMoodboard = ref(false)
function logout() {
    userStore.logout()
    moodboardsStore.moodboards = []
}

function openCloseCreatingWindow(value: boolean) {
    isAddingMoodboard.value = value
}

onMounted(async () => {
    try {
        await userStore.checkAccessToken()
    } catch (error) {
        console.log(error)
    } 
})

</script>


<style scoped>

.profile-page {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.settings-buttons {
    margin-bottom: 30px;
}

.no-moodboard {
    text-align: center;
}



</style>