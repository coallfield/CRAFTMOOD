import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import GalleryView from '@/views/GalleryView.vue'
import PhotoInfoView from '@/views/PhotoInfoView.vue'
import RegistrationView from '@/views/RegistrationView.vue'
import VerifyView from '@/views/VerifyView.vue'
import LoginView from '@/views/LoginView.vue'
import ProfileView from '@/views/ProfileView.vue'
import MoodboardView from '@/views/MoodboardView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView
    }, 
    {
      path: '/gallery',
      component: GalleryView,
      
    },
    {
      path: '/photo/:id',
      component: PhotoInfoView,

    },
    {
      path: '/registration',
      component: RegistrationView

    },
    {
      path: '/verify',
      component: VerifyView
    },
    {
      path: '/login',
      component: LoginView

    }, 
    {
      path: '/profile/:id',
      component: ProfileView,
    },
    {
      path: '/moodboard/:id',
      component: MoodboardView
    }
  ]


  
})


export default router
