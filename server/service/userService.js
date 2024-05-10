const User = require('../models/User')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('./mailService')
const tokenService = require('./tokenService')
const Moodboard = require('../models/Moodboard')
const UserDto = require('../dtos/user-dto')
const ApiError = require('../exeptions/ApiError')

class UserService {
    async registration(email, password) {
        const candidate = await User.findOne({email})
      
        if(candidate) {
            throw ApiError.BadRequest(`User with this mail already exists`)
        }
        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink = uuid.v4()
       
        
        const user = await User.create({email, password: hashPassword, activationLink}) 
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)
     
        const userDto = new UserDto(user)
        const tokens = tokenService.generateToken({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
      
        await Moodboard.create({name: 'All', user: userDto.id, photos: []})
    
        return {
            ...tokens, 
            user: userDto
        }
    }


    async login(email, password) {
        const user = await User.findOne({email})
        
        if(!user) {
            throw ApiError.BadRequest('The user was not found')
        }
        const isPasswordEquals = await bcrypt.compare(password, user.password)

        if(!isPasswordEquals) {
            throw ApiError.BadRequest('Wrong password')
        }

        const userDto = new UserDto(user)
        const tokens = tokenService.generateToken({...userDto})  
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens, 
            user: userDto
        }
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken)
        return token
    }

    async activate(activationLink) {
        const user = await User.findOne({activationLink})
        if(!user) {
            throw ApiError.BadRequest('Invalid activation link')
        }
        user.isActivated = true
        await user.save()





            
    }

    async refresh(refreshToken) {

        if(!refreshToken) {
            throw ApiError.UnauthorizedError()
        }

        const userPayload = await tokenService.validateRefreshToken(refreshToken)
        const tokenFromDB = await tokenService.findToken(refreshToken)

        if(!userPayload || !tokenFromDB) {
            throw ApiError.UnauthorizedError()
        }
        const user = await User.findById(userPayload.id)
        const userDto = new UserDto(user)
        const tokens = tokenService.generateToken({...userDto})  
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {
            ...tokens, 
            user: userDto
        }
    }

}


module.exports = new UserService()