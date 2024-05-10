export interface IServerResponse {
    accessToken: string,
    refreshToken: string,
    user: {
        email: string,
        id: string,
        isActivated: boolean
    }
}
