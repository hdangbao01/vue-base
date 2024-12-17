import axios from "axios"
import { getToken, setToken, removeToken } from '@/utils/auth'
import processBar from "@/modules/process-bar"
import constants from "@/constants"
import toast from "@/modules/toast"
import debounce from "@/utils/debounce"

const http = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL_API,
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    }
})

http.interceptors.request.use(
    config => {
        const accessToken = getToken().accessToken
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

const refreshAuthHandle = debounce(async (originalConfig) => {
    try {
        const data = {
            refresh_token: getToken().refreshToken
        }

        const refreshHttp = axios.create({
            baseURL: import.meta.env.VITE_BASE_URL_API,
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        })

        const result = await refreshHttp.post('/refresh_tokens', data)

        setToken(result.data.data)

        originalConfig.headers['Authorization'] = `Bearer ${result.data.access_token}`

        location.reload()

        return http(originalConfig)
    } catch (err) {
        removeToken()
        location.reload()
        return Promise.reject(err)
    }
}, 500)

http.interceptors.response.use(
    (response) => {
        return response
    },
    async (error) => {
        const originalConfig = error.config
        
        if (error.response && (error.response.data.error.code === 'ERR.TOK0101' || error.response.data.error.code === 'ERR.TOK0102')) {
            return refreshAuthHandle(originalConfig)
        }
        return Promise.reject(error)
    }
)

const onUploadProgress = (progressEvent) => {
    const progress = Math.round((progressEvent.loaded / progressEvent.total)*100)
    processBar(progress)
}

const onDownloadProgress = (progressEvent) => {
    const progress = Math.round((progressEvent.loaded / progressEvent.bytes)*100)
    processBar(progress)
}

export const request = async (method, url, data) => {
    // try {
        const config = {
            method: method,
            url: url,
            data: data,
            onUploadProgress: onUploadProgress,
            onDownloadProgress: onDownloadProgress
        };
    
        if (data instanceof FormData) {
            config.headers = {
                ...config.headers,
                'Content-Type': 'multipart/form-data'
            };
        }

    return new Promise((resolve, reject) => {
        http(config)
        .then((res) => {
            resolve(res.data)
        })
        .catch((error) => {
            const response = error.response.data.error.code
            
            const value = constants.errors.errorMessages.find(item => item.code === response)

            toast({
                title: "Thất bại!",
                message: value ? value.message : "Đã có lỗi xảy ra, vui lòng thử lại.",
                type: "error",
            })
            reject(error)
        })
    })
}

export default request