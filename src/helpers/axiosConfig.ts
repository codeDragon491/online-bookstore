import axios from 'axios'

const axiosConfig = () => axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
})
export default axiosConfig
