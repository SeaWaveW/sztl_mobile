import axios from 'axios'

import router from 'router'

export const request = (config) => {
    const instance = axios.create({
        baseURL:"/api/v4",
        timeout:1000,
    })

    instance.interceptors.request.use(RequestInformation => {
        RequestInformation.headers.Authorization = sessionStorage.getItem("token")
        return RequestInformation
    })
    instance.interceptors.response.use(responseData => {
        if(responseData.data.errcode === 90101){
            router.push("/login")
        }
        return responseData.data
    })

    return instance(config)
}