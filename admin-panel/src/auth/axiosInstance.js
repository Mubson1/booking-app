import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8800/api/',
    timeout:10000,
})

axiosInstance.interceptors.request.use(
    config => {

        config.headers['Content-Type'] = 'application/json'
        // if(config.url==='/api'){
            config.headers.authorization = localStorage.getItem('token')
        // }
        // const token = localStorage.getItem('token')
        // config.headers.authorization = token?`Bearer ${token}` : '' 
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

axiosInstance.interceptors.response.use(
    response => {
        return response
    },
    error => {
        // const errorObj = {}
        // if(error.response) {
        //     error.respose.data.details.forEach(e => {
        //         const key = e.message.split(' ')[0].slice(1, -1)
        //         errorObj[key] = e.message
        //     })
        // }
        return Promise.reject(error)
    }
)

export default axiosInstance