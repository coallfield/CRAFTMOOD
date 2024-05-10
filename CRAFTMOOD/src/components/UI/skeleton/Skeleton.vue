<template>
        <div v-for="skeleton in skeletonCount" :key="skeleton" class="skeleton">
            <div  :style="{ width: props.width, height: props.height }" class="skeleton__item" :class="route.path.startsWith('/profile') ? 'skeleton__item_moodboard' : ''"></div>
            <div :class="route.path.startsWith('/profile') ? 'skeleton__text_moodboard' : ''" class="skeleton__text"></div>
        </div>
        


</template>

<script setup lang="ts" name="Skeleton">
import { useRoute } from 'vue-router';

const props = defineProps<{
    count: number,
    width?: string,
    height?: string
}>()


const route = useRoute()

const skeletonCount = props.count

</script>

<style scoped>

.skeleton {
  margin-bottom: 30px;
}

.skeleton__item {
  background-color: rgb(45, 45, 59);
  width: 400px;
  height: 500px;
  margin-bottom: 5px;
  break-inside: avoid;
  animation: pulse 1.5s infinite alternate;
}

.skeleton__text {
 
  background-color: rgb(45, 45, 59);
  width: 300px;
  height: 10px;
  margin-top: 5px;
  break-inside: avoid;
  animation: pulse 1.5s infinite alternate;
}

.skeleton__text_moodboard {
  width:120px;
  height: 25px;
  margin-left: auto;
  margin-right: auto;
}
@keyframes pulse {
  0% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

@media(max-width: 880px) {
  .skeleton__item {
    width: 290px;
  }
  .skeleton__text {
      width: 190px;
  }
}

@media(max-width: 460px) {
  .skeleton__item {
    width: 100%;
    height: 400px;
  }
  .skeleton__item_moodboard {
    width: 250px !important;
    height: 150px !important;
  }
  .skeleton__text_moodboard {
    width: 100px;

  }
}


</style>