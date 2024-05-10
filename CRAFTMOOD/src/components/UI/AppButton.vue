<template>
     <div class="gallery-button">
          <button  class="gallery-button__button"><slot></slot></button>
      </div>
</template>


<script lang="ts" setup>
import { defineComponent } from 'vue';

const AppButton = defineComponent({
    name: 'AppButton'
})
</script>

<style scoped>


.gallery-button__button { 
  
  width: 370px;
  height: 110px;
  background-color:  rgb(27, 27, 32);;
  outline: none;
  border: 1px solid rgb(240, 239, 243);
  font-size: 1.5rem;
  cursor: pointer;

}

.gallery-button__button:hover {
  border: 1px solid rgb(197, 13, 13);
  color:  rgb(197, 13, 13);
  box-shadow: 1px 1px 1px rgb(197, 13, 13);
}

@media(max-width:405px) {
  .gallery-button__button {
    width: 300px;
  }
}
@media(max-width:355px) {
  .gallery-button__button {
    width: 250px;
  }
}
</style>