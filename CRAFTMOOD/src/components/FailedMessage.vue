<template>
<h1 class="popup-error-message"><slot></slot></h1>
</template>

<script lang="ts" setup>

</script>

<style scoped>
.popup-error-message {
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: rgb(197, 13, 13);;
    background-color: rgba(0, 0, 0, 0.5); 
    width: 100%;
  height: 100%;
}

@media(max-width: 490px) {
  .popup-error-message {
    text-align: center;
  }
}
</style>