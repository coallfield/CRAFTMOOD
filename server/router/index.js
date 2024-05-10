const Roter = require('express').Router
const userController = require('../controllers/userController')
const router = new Roter()
const {body} = require('express-validator')
const authMiddleware = require('../middlewares/authMiddleware')
const moodboardController = require('../controllers/moodboardController')

router.post('/registration', 
        body('email').isEmail(), 
        body('password').isLength({min: 4}),
        userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.post('/save', authMiddleware, moodboardController.savePhoto)
router.get('/activate/:link', userController.activate)
router.get('/refresh', userController.refresh)
router.get('/checkaccess', authMiddleware, (req, res) => res.json('success'))
router.get('/moodboards', authMiddleware, moodboardController.getMoodboards),
router.get('/currentmoodboard/:id', moodboardController.getCurrentMoodboard)
router.post('/deletephoto', authMiddleware, moodboardController.deletePhoto)
router.post('/create', authMiddleware, moodboardController.createMoodboard)
router.post('/deletemoodboard', authMiddleware, moodboardController.deleteMoodboard)
router.post('/rename', authMiddleware, moodboardController.renameMoodboard)
module.exports = router