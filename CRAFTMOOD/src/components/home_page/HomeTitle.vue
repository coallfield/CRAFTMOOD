<template>
    <div class="home-main-title">
        <h1 class="home-main-title__title">VISUALIZE YOUR IDEAS</h1>
   
      </div>
</template>

<style scoped>

.home-main-title {
  width: 50%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  
}

.home-main-title__title {

 font-size: 5rem;
 font-weight: 300;
}

@media(max-width: 1450px) {
  .home-main-title {
    justify-content: center;
    align-self: center;
    width: 100%;
    
  }
 
}

@media(max-width:910px) {
  .home-main-title {
    text-align: center;
  }
}
@media(max-width:480px) {

.home-main-title__title {
  font-size: 3.5rem;
}
}

</style>