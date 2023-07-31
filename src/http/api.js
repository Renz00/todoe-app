import axios from "axios"

//for api auth and cors issues
axios.defaults.withCredentials = true

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})

export default api
