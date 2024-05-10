<template>
<div class="moodboards-container">
            <h1 class="moodboards-container__title">YOUR MOODBOARDS</h1>
            <div class="moodboards">
                <div v-for="moodboard in props.moodboards" :key="moodboard.id" @click="$router.push(`/moodboard/${moodboard.id}`)" class="moodboard-container">
                    <div class="moodboard">
                        <div class="moodboard__preview">
                            <img class="moodboard__preview__img" v-for="photo in moodboard.photos.slice(0, 3)" :key="photo.id" :src="photo.urls.small">
                        </div>
                    </div>
                    <div class="moodboard__name">
                        <h2>{{ moodboard.name.toUpperCase() }}</h2>
                    </div>
                </div>
            </div>
            

        </div>

</template>


<script setup lang="ts">
import type { IMoodboard } from '@/interfaces/IMoodboard';

const props = defineProps<{
    moodboards: IMoodboard[]
}>()
</script>

<style scoped>
.moodboards-container {
    margin-top: 30px;
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    grid-gap: 10px;
    justify-content: center;
    align-items: center;
    
}

.moodboard {
    width: 400px;
    height: 200px;
    background-color: rgb(45, 45, 59);
    border: 2px solid rgb(240, 239, 243);
   
}


.moodboard:hover {
    border: 2px solid rgb(197, 13, 13);
}

.moodboard__preview {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
    padding: 5px;
    grid-gap: 3%
}
.moodboard__preview__img {
    
    object-fit: cover;
    max-width: 30%;
    border: 1px solid rgb(240, 239, 243);
}

.moodboard__name {
    margin-top: 10px;
    width: 100%;
    display: flex;
    justify-content: center;
}
.moodboards {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    grid-gap: 20px;
}
@media(max-width:445px) {
   
    .moodboard {
        width: 250px;
        height: 150px;
    }
  .moodboards-container__title {
     text-align: center;
     margin-left: 10px;
     margin-right: 10px;
  }
}
@media(max-width:345px) {
    .moodboard {
        width: 250px;
        height: 150px;
    }
  .moodboards-container__title {
     text-align: center;
     margin-left: 10px;
     margin-right: 10px;
  }

}
</style>