export interface IResponseError {
    errors: {
        type: string,
        value: string,
        msg: string,
        path: string,
        location: string
    }[]
    message: string,
}