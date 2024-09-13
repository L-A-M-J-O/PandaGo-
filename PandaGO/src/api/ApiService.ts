import axios from 'axios'

const apiUrl = import.meta.env.VITE_API_URL
const apiKey = import.meta.env.VITE_API_KEY

const apiClient = axios.create({
  baseURL: apiUrl
})

apiClient.interceptors.request.use(
  (config) => {
    config.params = {
      ...config.params,
      apikey: apiKey
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default apiClient
