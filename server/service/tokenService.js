const jwt = require('jsonwebtoken')
const Token = require('../models/Token')
class TokenService {
    generateToken(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }
    }
    async validateAccessToken(token) {
        try {
            const userPayload = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            return userPayload
        } catch (error) {
            return null
        }
    }

    async validateRefreshToken(token) {
        try {
            const userPayload = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
            return userPayload
        } catch (error) {
            return null
        }
    }


    async saveToken(userId, refreshToken) {
        const tokenData = await Token.findOne({user: userId}) 
        if(tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        const token = await Token.create({user: userId, refreshToken})
        return token
    }

    async removeToken(refreshToken) {
        const tokenData = await Token.deleteOne({refreshToken})
        return tokenData
    }

    async findToken(refreshToken) { 
        const tokenData = await Token.findOne({refreshToken})
        return tokenData
    }



}


module.exports = new TokenService()