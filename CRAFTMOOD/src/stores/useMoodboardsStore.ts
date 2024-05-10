import {defineStore} from 'pinia'
import type { IMoodboard } from '@/interfaces/IMoodboard'
import { ref } from 'vue'
import MoodboardService from '@/services/MoodboardService'
import type { IPhoto } from '@/interfaces/IPhoto'
import { SERVER_URL } from '@/config'
import { useRouter } from 'vue-router'



export const useMoodboardsStore = defineStore('moodboards', () => {
    const moodboards = ref<IMoodboard[]>([])
    const isSaving = ref(false)
    const errorMessage = ref('')
    const isError = ref(false)
    const isSaved = ref(false)
    const isCurrentPage = ref(true)
    const router = useRouter()
    const getMoodboards = async () => {
        try {
            const response: IMoodboard[] = await MoodboardService.getMoodboards(`${SERVER_URL}/moodboards`)
            setMoodboards(response)
          
        } catch (error) {
            console.log(error)
        }
    }

    const savePhoto = async (photo: IPhoto, moodboardId: string) => {
        isCurrentPage.value = true
       
        try {
            
            isSaving.value = true
            const response: IMoodboard = await MoodboardService.saveToAll(`${SERVER_URL}/save`, photo, moodboardId)
            moodboards.value = moodboards.value.map((el) => {
                if(el.id === response.id) {
                    return response
                } else {
                    return el
                }
            })
            isSaved.value = true 
            setTimeout(() => {
                isSaved.value = false
            }, 2000)
            return response
        } catch (error) {
            if(error instanceof Error)
            errorMessage.value = error.message 
            isError.value = true 
            setTimeout(() => {
                isError.value = false
            }, 1500)
            console.log(errorMessage.value)
        } finally {
            isSaving.value = false
        }
    }

    const getCurrentMoodboard = async (id: string): Promise<IMoodboard> => {
            const response = await fetch(`${SERVER_URL}/currentmoodboard/${id}`)
            if (!response.ok) {
                throw new Error('FAILED TO LOAD MOODBOARD')
            }
            const moodboard: IMoodboard = await response.json()
            return moodboard
    }

    const deletePhoto = async(photoId: string, moodboardId: string): Promise<IMoodboard> => {
      
        const requestBody = {
            photoId,
            moodboardId
        }
        const response = await fetch(`${SERVER_URL}/deletephoto`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(requestBody)
        })
        if(!response.ok) {
        
            throw new Error('FAILED TO REMOVE')
        }
        const moodboard: IMoodboard = await response.json()
        moodboards.value = moodboards.value.map((el) => {
            if(el.id === moodboard.id) {
                return moodboard
            } else {
                return el
            }
        })

        return moodboard
    }

    const createMoodboard = async (moodboardName: string) => {
            const response: IMoodboard[] = await MoodboardService.createMoodboard(`${SERVER_URL}/create`, moodboardName)
            setMoodboards(response)
            const route = moodboards.value.find((el) => el.name === moodboardName)?.id as string
            router.push(`/moodboard/${route}`)
    }

    const deleteMoodboard = async (moodboardId: string, routeId: string) => {
        const response: IMoodboard[] = await MoodboardService.deleteMoodboard(`${SERVER_URL}/deletemoodboard`, moodboardId)
        setMoodboards(response)
        router.push(`/profile/${routeId}`)
    }

    const renameMoodboard = async (newMoodboardName: string, moodboardId: string) => {
            const response: IMoodboard = await MoodboardService.renameMoodboard(`${SERVER_URL}/rename`, newMoodboardName, moodboardId)
            moodboards.value = moodboards.value.map((el) => {
                if (el.id === response.id) {
                    return response;
                } else {
                    return el;
                }
            });
            return response
    }

    const setMoodboards = (value: IMoodboard[]) => {
        moodboards.value = value
    }


    

    return {savePhoto, getMoodboards, getCurrentMoodboard, deletePhoto, createMoodboard, deleteMoodboard, renameMoodboard, moodboards, isSaving, isError, errorMessage, isSaved, isCurrentPage}
})