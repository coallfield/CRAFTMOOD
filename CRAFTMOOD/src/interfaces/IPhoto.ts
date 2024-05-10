import type { ITags } from "./ITags"
export interface IPhoto {
    alt_description: string,
    description: string,
    id: string,
    urls: {
        full: string,
        small: string
    },
    tags: ITags[]
        
    

}