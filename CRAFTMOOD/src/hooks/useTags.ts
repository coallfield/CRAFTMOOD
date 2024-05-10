import {watch, ref} from 'vue'
import { usePhotosStore } from '@/stores/usePhotosStore'


export const useTags = () => {
    const tags = ref('')
    const photosStore = usePhotosStore()
    watch (
        () => photosStore.singlePhoto,
        (newSinglePhoto) => {
          
            tags.value = ''
            for(let i = 0; i < 3; i++) {
                tags.value += ' ' + newSinglePhoto.tags[i].title
              }
              photosStore.getPhotos('Similar', undefined, tags.value)
        }
    )
}