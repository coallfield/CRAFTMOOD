import { watch } from 'vue'
import { usePhotosStore } from '@/stores/usePhotosStore'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { useUserDataStore } from '@/stores/useUserDataStore'
import { useMoodboardsStore } from '@/stores/useMoodboardsStore'


export const useRouteID = (route: RouteLocationNormalizedLoaded) => {
    const photosStore = usePhotosStore()
    const moodboadStore = useMoodboardsStore()
    watch(
        () => route.params.id,
        async (newID) => {
            moodboadStore.isCurrentPage = false
            try {
                await useUserDataStore().checkAccessToken()
                await photosStore.getPhotos('Single', newID as string)
                
                window.scrollTo(pageYOffset, 0);
            } catch (error) {
                console.log(error)
            } 
            
            
        }
    )
}