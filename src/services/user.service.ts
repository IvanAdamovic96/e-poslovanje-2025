import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios"
import { AuthService } from "./auth.service"
import type { UserModel } from "@/models/user.model"

export class UserService {

    static async useAxios<T>(url: string, method: 'get' | 'post' | 'put' | 'delete' = 'get', data: any = {}, retry = true): Promise<AxiosResponse<T, any>> {
    
    
        try {
            const accessToken = AuthService.getAccessToken()
    
            const config: AxiosRequestConfig = {
                baseURL: 'http://localhost:3000/',
                url: url,
                method: method,
                headers: {
                    'Accept': 'application/json',
                    ...(accessToken ? { 'Authorization': `Bearer ${accessToken}` } : {})
                },
                data,
                validateStatus: () => true
            }
    
            const response = await axios.request(config)
    
            /* if ((response.status === 401 || response.status === 403) && response.data?.redirect) {
                console.warn(`Redirecting to ${response.data.redirect} due to authentication issue.`);
                clearTokens(); 
                window.location.href = response.data.redirect;
                throw new Error('REDIRECT_TO_LOGIN');
            } */
    
    
    
            if (response.status === 403 && retry) {
                const newAccess = await this.refreshAccessToken()
                if (newAccess) {
                    return this.useAxios(url, method, data, false)
                }
            }
    
    
            if (response.status === 200 || response.status === 204) {
                return response
            }
    
            throw new Error("Status code: " + response.status)
    
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                console.error('Axios error:', error.message)
            } else {
                console.error('Unknown error:', error)
            }
            throw error
        }
    }
    
    static async  login(email: string, password: string) {
        return await axios.post('http://localhost:3000/user/login', {
            email,
            password
        })
    }
    
    static async  register(model: any) {
        return await axios.post('http://localhost:3000/user/register', model)
    }

    static async refreshAccessToken() {
        const refreshToken = AuthService.getRefreshToken()
        if (!refreshToken) return null
    
        try {
            const rsp = await axios.request({
                url: 'http://localhost:3000/user/refresh',
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${refreshToken}`
                }
            })
    
            AuthService.setTokens(rsp.data)
            return rsp.data.access
    
        } catch (error) {
            AuthService.clearTokens()
            console.error('Token refresh failed')
            return null
        }
    }

    static async getSelfUser() {
        return await this.useAxios<UserModel>('/user/self')
    }

    static async updateUser(payload: Partial<UserModel>){
        return await UserService.useAxios('/user', 'put', payload);
        
    }
}