const MoodboardDto = require('../dtos/moodboard-dto')
const Moodboard = require('../models/Moodboard')



class MoodboardService {
    async getMoodboards(userId) {
   
        const moodboards = await Moodboard.find({user: userId})
        const moodboardsDto = []
        moodboards.forEach(el => {
            el = new MoodboardDto(el)
            moodboardsDto.push(el)
        })
        return moodboardsDto
    }

    async createMoodboard(moodboardName, userId) {
         await Moodboard.create({name: moodboardName, user: userId})
         const moodboards = await this.getMoodboards(userId)
         return moodboards
    }

    async savePhoto(photo, moodboardId) {
        const newPhoto = {
            alt_description: photo.alt_description,
            description: photo.description,
            id: photo.id,
            urls: photo.urls,
            tags: photo.tags
        }
        const moodboard = await Moodboard.findOne({_id: moodboardId})
        moodboard.photos.push(newPhoto)
        await moodboard.save()
        const moodboardDto = new MoodboardDto(moodboard)
        return moodboardDto
    }


    async getCurrentMoodboard(id) {
        const moodboard = await Moodboard.findById(id) 
        if(!moodboard) {
            throw new Error('Can\'t find moodboard')
        }
        const moodboardDto = new MoodboardDto(moodboard)
        return moodboardDto
    }

    async deletePhoto(photoId, moodboardId) {
        const moodboard = await Moodboard.findById(moodboardId) 

        moodboard.photos = moodboard.photos.filter((el) => el.id !== photoId)
       
        await moodboard.save()
        const moodboardDto = new MoodboardDto(moodboard)
        return moodboardDto

    }

    async deleteMoodboard(moodboardId, userId) {
        await Moodboard.deleteOne({user: userId, _id: moodboardId})
        const moodboards = await this.getMoodboards(userId)
        return moodboards
    }

  async renameMoodboard(newMoodboardName, moodboardId) {
        const moodboard = await Moodboard.findById(moodboardId) 
        moodboard.name = newMoodboardName
        await moodboard.save()
        const moodboardDto = new MoodboardDto(moodboard)
        return moodboardDto
  }
}


module.exports = new MoodboardService()