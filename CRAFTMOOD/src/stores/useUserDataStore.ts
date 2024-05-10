import {defineStore} from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AuthUser from '@/services/AuthUser'
import type { IUserRequest } from '@/interfaces/IUserRequest'
import type { IResponseError } from '@/interfaces/IResponseError'
import type { IServerResponse } from '@/interfaces/IServerResponse'
import { SERVER_URL } from '@/config'
<<<<<<< HEAD
import { useMoodboardsStore } from './useMoodboardsStore'
=======
>>>>>>> f44a573feeaa71d4ed373921d057d8b388a1c507
export const useUserDataStore = defineStore('user', () => {

    const userData = ref<IServerResponse>({} as IServerResponse)
    const isAuth = ref(false)
    const router = useRouter()
    const errorMessage = ref('')
    const isLoading = ref(false)


    const registration = async (userRequest: IUserRequest) => {
        
        if(userRequest.password.length < 4) {
            console.log(1)
            setErrorMessage('PASSWORD MUST BE AT LEAST 4 CHARACTERS LONG')
            setTimeout(() => {
                setErrorMessage('')
            }, 3000)
            return
        }
        try {
            setLoading(true)
            const response: IServerResponse | IResponseError = await AuthUser.registration(`${SERVER_URL}/registration`, userRequest)
            if (isResponseError(response)) {
                setErrorMessage(response.message)
                setTimeout(() => {
                    setErrorMessage('')
                }, 3000)
            } else {
                setAuth(true)
                setUserData(response)
                router.push('/verify')
<<<<<<< HEAD
             
=======
            
>>>>>>> f44a573feeaa71d4ed373921d057d8b388a1c507
            }
        } catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    }


    const login = async (userRequest: IUserRequest) => {
  
        try {
            setLoading(true)
            const response: IServerResponse | IResponseError = await AuthUser.login(`${SERVER_URL}/login`, userRequest)
            if (isResponseError(response)) {
                setErrorMessage(response.message)
                setTimeout(() => {
                    setErrorMessage('')
                }, 3000)
            } else {
                setAuth(true)
                setUserData(response)
                router.push('/')
                await useMoodboardsStore().getMoodboards()
            }
        } catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }
        
    }


    const logout = async () => {
        await AuthUser.logout(`${SERVER_URL}/logout`)
        localStorage.removeItem('accessToken')
        setUserData({} as IServerResponse)
        setAuth(false)
        router.push('/')
    }

    const checkAuth = async () => {
     
            const response = await fetch(`${SERVER_URL}/refresh`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',

                }
            }) 
        if (!response.ok) {
            throw new Error('Unauthorized user')
        }

            const data: IServerResponse = await response.json()
            localStorage.setItem('accessToken', data.accessToken)
            setUserData(data)
            setAuth(true)

        
    }

    const checkAccessToken = async (): Promise<void> => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            setUserData({} as IServerResponse)
            router.push('/login');
            throw new Error('The user is not logged in')
        } 
        
        const response = await fetch(`${SERVER_URL}/checkaccess`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (response.status === 401) {
            const refreshResponse = await fetch(`${SERVER_URL}/refresh`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!refreshResponse.ok) {
                userData.value = {} as IServerResponse
                router.push('/login');
                throw new Error('The user is not logged in')
            }


            const userPayload = await refreshResponse.json();
            setUserData(userPayload);
            localStorage.setItem('accessToken', userPayload.accessToken);


            const newResponse = await fetch(`${SERVER_URL}/checkaccess`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userPayload.accessToken}`
                }
            });
            console.log(newResponse);
        } else if(response.status === 403) {
            router.push('/verify')
            throw new Error('User didn\'t confirm the email')
           
        }
        return

    }

 
    const setLoading = (bool: boolean) => {
        isLoading.value = bool
    }
    const setErrorMessage = (message: string) => {
        errorMessage.value = message
    }
    const setUserData = (data: IServerResponse) => {
        userData.value = data
    }
    const setAuth = (bool: boolean) => {
        isAuth.value = bool
    }

   const isResponseError = (data: IResponseError | IServerResponse): data is IResponseError => {
        return 'message' in data
   }
    return {userData, registration, checkAuth, errorMessage, isLoading, isResponseError, setUserData, login, logout, checkAccessToken, isAuth}
})









