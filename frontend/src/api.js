import axios from 'axios'

const environ = process.env.NODE_ENV

let baseUrl
if (environ === 'production') {
    baseUrl = ''
}
else {
    baseUrl = 'http://localhost:8000'
}

export const registerUrl = `${baseUrl}/api/users/register`
export const loginUrl = `${baseUrl}/api/users/login`
export const logoutUrl = `${baseUrl}/api/users/logout`
export const hobbyUrl = `${baseUrl}/api/hobbies/`
export const createLinkUrl = `${baseUrl}/api/links/create`
export const verifyLinkUrl = `${baseUrl}/api/links/verify`
export const scheduleUrl = `${baseUrl}/api/schedule/`
export const pollUrl = `${baseUrl}/api/schedule/poll/`

export let authAxios = axios.create()
authAxios.interceptors.request.use((config) => {
    let auth = sessionStorage.getItem('auth')
    let token = JSON.parse(auth)?.state?.token
    if (token) {
        config.headers.Authorization = `Token ${token}`
    }
    return config
}, (error) => {
    return Promise.reject(error)
})
