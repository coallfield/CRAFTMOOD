<template>

    <select @change="moodboadStore.savePhoto(photosStore.singlePhoto, ($event.target as HTMLSelectElement)?.value)" class="save-select">
        <option class="save-select__title" disabled selected value="">SAVE TO MOODBOARD</option>
        <option :disabled="moodboards.photos.some(el => el.id === photosStore.singlePhoto.id)" 
                :value="moodboards.id"
                v-for="moodboards in moodboadStore.moodboards" 
                :key="moodboards.id">
                {{ moodboards.name }}</option>
    </select>
</template>


<script lang="ts" setup>
import { useMoodboardsStore } from '@/stores/useMoodboardsStore';
import { usePhotosStore } from '@/stores/usePhotosStore';
const moodboadStore = useMoodboardsStore()
const photosStore = usePhotosStore()
</script>


<style scoped>


.save-select {
  padding: 10px;
  width: 370px;
  height: 110px;
  background-color:  rgb(27, 27, 32);;
  outline: none;
  border: 1px solid rgb(240, 239, 243);
  font-size: 1.5rem;
  cursor: pointer;
}

@media (max-width:405px) {
  .save-select {
    width: 300px;
    padding: 0px;
  }
}
@media(max-width:355px) {
  .save-select {
    width: 250px;
  }
}


</style>