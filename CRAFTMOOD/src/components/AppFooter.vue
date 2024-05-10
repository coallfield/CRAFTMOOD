<template>
<footer class="app-footer">
          <div class="footer-title">
            <h1 class="footer-title__title">I'M ON SOCIAL MEDIA</h1>
          </div>
          <div class="social-media">
              <div class="social-media__link-container">
                  <a class="social-media__link-container__link" href="https://www.instagram.com/coallfield/">Instagram</a>
              </div>
              <div class="social-media__link-container">
                  <a target="_blank" href="https://t.me/coallfield" class="social-media__link-container__link">Telegram</a>
              </div>
              <div class="social-media__link-container">
                  <a target="_blank" href="https://github.com/coallfield" class="social-media__link-container__link">GitHub</a>
              </div>
              <div class="social-media__link-container">
                  <a target="_blank" href="https://vk.com/id448165428" class="social-media__link-container__link">VK</a>
              </div>
          </div>
      </footer>
</template>


<style scoped>
.app-footer {
  padding: 70px 0 70px 0;
  background-color: rgb(45, 45, 59);;
  margin-top: auto;

}

.footer-title {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}

.footer-title__title {
  font-size: 2.5rem;
 font-weight: 300;
}
.social-media {
  
  width: 100%;
  display: grid;
  grid-template-columns: 120px 120px;
  justify-content: center;
  align-items: center;
  grid-gap:10px

}
.social-media__link-container {
  
    font-size: 1.5rem;
    cursor: pointer;
}
.social-media__link-container__link {
  text-decoration: none;
}
.social-media__link-container__link:hover {
  color: rgb(197, 13, 13);
  text-decoration: underline;
}

@media(max-width: 445px) {
  .footer-title__title {
    font-size: 2rem;
    font-weight: 500;
  }
}


@media(max-width: 355px) {
  .footer-title__title {
    text-align: center;
  }
}
</style>