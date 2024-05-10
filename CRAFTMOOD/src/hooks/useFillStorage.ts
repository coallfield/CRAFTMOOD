import type { IPhoto } from "@/interfaces/IPhoto"

export const useFillStorage = (storage: IPhoto): IPhoto => {
    return  {
        alt_description: storage.alt_description,
        description: storage.description,
        id: storage.id,
        urls: {
            full: storage.urls.full,
            small: storage.urls.small
        },
        tags: storage.tags
    }
}