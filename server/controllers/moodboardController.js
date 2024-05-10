const moodboardService = require('../service/moodboardService')

class MoodboardController {
    async getMoodboards(req, res, next) {
        try {
            const moodboards = await moodboardService.getMoodboards(req.user.id)
            return res.json(moodboards)
        } catch (error) {
            next(error)
        }

    }

    async getCurrentMoodboard(req, res, next) {
        try {
            const moodboard = await moodboardService.getCurrentMoodboard(req.params.id)
            return res.json(moodboard)
        } catch (error) {
            next(error)
        }
    }

    async savePhoto(req, res, next) {
        try {
            const photo = req.body.photo
            const moodboardId = req.body.moodboardId
            const moodboard = await moodboardService.savePhoto(photo, moodboardId)
            return res.json(moodboard)
        } catch (error) {
            next(error)
        }

    }

    async deletePhoto(req, res, next) {
        try {
            
            const photo = req.body.photoId
            const moodboardId = req.body.moodboardId
     
            const moodboard = await moodboardService.deletePhoto(photo, moodboardId)
            return res.json(moodboard)
        } catch (error) {
            next(error)
        }
    }

    async createMoodboard(req, res, next) {
        try {
            
            const mooodboardName = req.body.moodboardName
            const userId = req.user.id
            const moodboards = await moodboardService.createMoodboard(mooodboardName, userId)
            return res.json(moodboards)
        } catch (error) {
            next(error)
        }
        
    }


    async deleteMoodboard(req, res, next) {
        try {
            const moodboardId = req.body.moodboardId
            const userId = req.user.id
            const moodboards = await moodboardService.deleteMoodboard(moodboardId, userId)
            return res.json(moodboards)
        } catch (error) {
            next(error)
        }
    }

    async renameMoodboard(req, res, next) {
        try {
            const {newMoodboardName, moodboardId} = req.body
            const newMoodboard = await moodboardService.renameMoodboard(newMoodboardName, moodboardId)
            return res.json(newMoodboard)
        } catch (error) {
            next(error)
        }
    }


}


module.exports = new MoodboardController()