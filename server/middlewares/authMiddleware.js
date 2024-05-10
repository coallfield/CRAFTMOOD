const ApiError = require('../exeptions/ApiError')
const tokenService = require('../service/tokenService')
module.exports = async function (req, res, next) {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader) {
            return next(ApiError.UnauthorizedError())
        }

        const requestToken = authHeader.split(' ')[1]
        if (!requestToken) {
            return next(ApiError.UnauthorizedError())
        }
        const userPayload = await tokenService.validateAccessToken(requestToken)

        if (!userPayload) {
            return next(ApiError.UnauthorizedError())
        }
        if (userPayload.isActivated === false) {
            return next(ApiError.Forbidden())
        }
        req.user = userPayload
        next()
    } catch (error) {
        return next(ApiError.UnauthorizedError())
    }
}