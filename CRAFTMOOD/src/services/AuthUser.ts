import type { IServerResponse } from "@/interfaces/IServerResponse"
import type { IUserRequest } from "@/interfaces/IUserRequest"
import type { IResponseError } from "@/interfaces/IResponseError"



export default class AuthUser {
    static async registration(url: string, userRequest: IUserRequest): Promise<IServerResponse | IResponseError> {
        let userData: IServerResponse = {} as IServerResponse
      

            const response = await fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userRequest)
            })
            if (!response.ok) {
                const res: IResponseError = await response.json()
                return res
            }

            const data: IServerResponse = await response.json();
            localStorage.setItem('accessToken', data.accessToken)
            userData = data
            return userData
    }
    static async login(url: string, userRequest: IUserRequest): Promise<IServerResponse | IResponseError> {
        let userData: IServerResponse = {} as IServerResponse

            const response = await fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userRequest)

            })
            if (!response.ok) {
             
                const res: IResponseError = await response.json()
                return res
            }
            const data: IServerResponse = await response.json()
            localStorage.setItem('accessToken', data.accessToken)
            userData = data
            return userData
    }

    static logout(url: string) {
        fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
        })
    }
}
