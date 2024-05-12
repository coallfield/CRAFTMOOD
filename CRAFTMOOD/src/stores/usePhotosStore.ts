import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IPhoto } from '@/interfaces/IPhoto'
import UnsplashApi from '@/services/UnsplashApi'
import { UNSPLASH_URL, UNSPLASH_URL_SINGLE } from '@/config'
import type { UnsplashDirection } from '@/types/unsplashDirection'

export const usePhotosStore = defineStore('photos', () => {
  const currentPage = ref(1)
  const queryParam = ref('random')
  const photos = ref<IPhoto[]>([])
  const similarPhotos = ref<IPhoto[]>([])
  const singlePhoto = ref<IPhoto>({} as IPhoto)
  const proposedPhotos = ref<IPhoto[]>([])
  const homePhotos = ref<IPhoto[]>([])
  const isLoading = ref(true)
  const isLoaded = ref(false)
  const errorMessage = ref('')
  const nextPage = () => {
      currentPage.value += 1
  }
  const previousPage = () => {
    currentPage.value -= 1
  }

  const setQueryParam = (value: string) => {
     queryParam.value = value
  }

  const setLoadings = (loading: boolean, loaded: boolean) => {
      isLoading.value = loading,
      isLoaded.value = loaded
  }

  const setErrorMessage = (message: string) => {
      errorMessage.value = message
  }

  const getPhotos = async (storage: UnsplashDirection, id?: string, tags?: string, query?: string, page?: number) => {
    setLoadings(true, false)
    try {
      
      switch(storage) {
        case 'Basic':
          photos.value = await UnsplashApi.getPhotos(`${UNSPLASH_URL}=query=${queryParam.value}&page=${currentPage.value}&per_page=20`) as IPhoto[]
          break;
        case 'Single': 
          singlePhoto.value = await UnsplashApi.getPhotos(`${UNSPLASH_URL_SINGLE}/${id}`) as IPhoto
          break;
        case 'Similar': 
          similarPhotos.value = await UnsplashApi.getPhotos(`${UNSPLASH_URL}=${tags}&page=1&per_page=10`) as IPhoto[]
          break;
        case 'Proposed':
          proposedPhotos.value = await UnsplashApi.getPhotos(`${UNSPLASH_URL}=${query}&page=${page}&per_page=20`) as IPhoto[]
          break;
        case 'Home': 
          homePhotos.value = await UnsplashApi.getPhotos(`${UNSPLASH_URL}=random&page=${page}&per_page=20`) as IPhoto[]
          break;
      }
    } catch (error) {
        setErrorMessage('FAILED TO LOAD PHOTOS')
        setTimeout(() => {
            setErrorMessage('')
        },1500)
    } finally {
      setLoadings(false, true)
    }
  }

 

  return { photos, isLoading, isLoaded, errorMessage, currentPage, nextPage, previousPage, setQueryParam, setLoadings, getPhotos, singlePhoto, similarPhotos, proposedPhotos, homePhotos}
})
