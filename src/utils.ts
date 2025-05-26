import axios, { type AxiosRequestConfig } from "axios";
import { AuthService } from "./services/auth.service";
import type { UserModel } from "./models/user.model";
import Swal from "sweetalert2";

export async function useAxios(url: string, method: 'get' | 'post' | 'put' | 'delete' = 'get', data: any = {}, retry = true) {


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
            const newAccess = await refreshAccessToken()
            if (newAccess) {
                return useAxios(url, method, data, false)
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

export async function login(email: string, password: string) {
    return await axios.post('http://localhost:3000/user/login', {
        email,
        password
    })
}
export async function register(model: any) {
    return await axios.post('http://localhost:3000/user/register', model)
}

export function formatDate(iso: string) {
    return new Date(iso).toLocaleString('sr-RS', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    })
}

async function refreshAccessToken() {
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



//--------------------------------------------------

const boostrapStyle = {
    popup: 'card',
    cancelButton: 'btn btn-danger',
    denyButton: 'btn btn-secondary',
    confirmButton: 'btn btn-primary'

}

export function showError(message: string) {
    Swal.fire({
        title: 'Something went wrong!',
        text: message,
        icon: 'error',
        customClass: boostrapStyle
    })
}

export function showConfirm(message: string, callback: Function) {
    Swal.fire({
        title: 'Are you sure you want to make changes?',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        //text: message,
        icon: 'question',
        customClass: boostrapStyle
    }).then()
}