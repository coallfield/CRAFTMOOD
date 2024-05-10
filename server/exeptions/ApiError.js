module.exports = class ApiError extends Error {

    status;
    errors;

    constructor(status, message, error = []) {
        super(message);
        this.status = status 
        this.errors = error
    }

    static UnauthorizedError() {
        return new ApiError(401, 'The user is not logged in')
    }

    static BadRequest(message, errors = []) {
        return new ApiError(400, message, errors)
    } 
    static Forbidden() {
        return new ApiError(403, 'Confirm the email')
    }
}

