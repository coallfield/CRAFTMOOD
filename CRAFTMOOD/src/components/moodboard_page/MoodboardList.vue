<template>
    <NoResults class="error" v-if="props.isFailedToFetch"></NoResults>
    <div v-else class="moodboard-container">
        <div v-if="props.currentMoodboard.photos !== undefined" class="moodboard">
            <div class="moodboard__name-rename">
                <div class="moodboard__name-rename__name">
                    <h1>{{ props.currentMoodboard.name }}</h1>
                </div>
                <div @click="isRename = true" class="moodboard__name-rename__pencil">&#9998;</div>
            </div>
            
            <ListPhotos @newCurrentMoodboard="setNewMoodboard" :photos="props.currentMoodboard.photos" :animate="true">
            </ListPhotos>
        </div>
        <div v-else>
            <SkeletonList :count="10"></SkeletonList>
        </div>
        <CreatingWindow @closeCreatingWindow="isRename = false" @setNewMoodboard="setNewMoodboard" :isAddingMoodboard="isRename" :moodboardId="props.currentMoodboard.id"></CreatingWindow>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { IMoodboard } from '@/interfaces/IMoodboard';



const isRename = ref(false)
const props = defineProps<{
    isFailedToFetch: boolean,
    currentMoodboard: IMoodboard,

}>()
const emits = defineEmits(['setNewMoodboard'])

const setNewMoodboard = (moodboard: IMoodboard) => {
    emits('setNewMoodboard', moodboard)
}


</script>


<style scoped>
.moodboard__name {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    
}

.moodboard__name-rename {
    margin-top: 30px;
    margin-bottom: 30px;
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;
    align-items: center;
    grid-gap: 20px
}
.moodboard__name-rename__pencil {
    cursor: pointer;
    scale: 110%;
}
.moodboard__name-rename__pencil:hover {
    color: rgb(197, 13, 13);
    
}
.rename-window {
    position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); 
  z-index: 999;
}

.rename-window__content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgb(45, 45, 59);
  padding: 20px;
  border: 1px solid rgb(240, 239, 243) ;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  z-index: 1000;
  width: auto;
  height: auto;
  display:  flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  grid-gap: 30px;
}
</style>