import type { IMoodboard } from "@/interfaces/IMoodboard"
import type { IPhoto } from "@/interfaces/IPhoto"

export default class MoodboardService {
    static async getMoodboards(url: string): Promise<IMoodboard[]> {
      
            const response = await fetch(url, {
                method: 'GET', 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })

            if(!response.ok) {
                throw new Error('Failed to fetch moodboards')
            }
            const moodboards: IMoodboard[] = await response.json()
            return moodboards
    }


    static async saveToAll(url: string, photo: IPhoto, moodboardId: string): Promise<IMoodboard> {
        const requestBody = {
            photo,
            moodboardId
        }
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(requestBody)
            
        })
        if(!response.ok) {
            throw new Error('FAILED TO SAVE IMAGE')
        }
        const moodboard = await response.json()
        return moodboard
        
    }

    static async createMoodboard(url: string, moodboardName: string): Promise<IMoodboard[]> {
        const requestBody = {
            moodboardName
        }
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(requestBody)
        })
        if(!response.ok) {
            throw new Error('FAILED TO SAVE MOODBOARD')
            
        }
        const moodboards: IMoodboard[] = await response.json()
        return moodboards
    }

    static async deleteMoodboard(url: string, moodboardId: string): Promise<IMoodboard[]> {
        const requestBody = {
            moodboardId
        }
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(requestBody)
        })
        if(!response.ok) {
            throw new Error('FAILED TO DELETE MOODBOARD')
            
        }
        const moodboards: IMoodboard[] = await response.json()
        return moodboards
    }


    static async renameMoodboard(url: string, newMoodboardName: string, moodboardId: string): Promise<IMoodboard> {
        const requestBody = {
            newMoodboardName, 
            moodboardId
        }
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(requestBody)
        })
        if(!response.ok) {
            throw new Error('FAILED TO RENAME')
        }
        const moodboard: IMoodboard = await response.json()
        return moodboard
    }

   
}