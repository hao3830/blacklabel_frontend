import axios from 'axios'
import { API_URL } from '../constants/Api'

const instance = axios.create({
    // TODO: replace url in production mode
    baseURL: API_URL

})

export default instance