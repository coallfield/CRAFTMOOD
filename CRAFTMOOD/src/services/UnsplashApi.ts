import { UNSPLASH_ACCESS_KEY } from '@/config'
import type { IPhoto } from '@/interfaces/IPhoto'
import { useFillStorage } from "@/hooks/useFillStorage";




export default class UnsplashApi {
    static async getPhotos(url: string): Promise<IPhoto[] | IPhoto> {


        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
            }
        })

        if (!response.ok) {
            throw new Error;
        }
        const data = await response.json()

        if (data.results) {
            return data.results.map((el: IPhoto) => {
                return useFillStorage(el)
            });
        } else {
            return useFillStorage(data)
        }



    }

}


