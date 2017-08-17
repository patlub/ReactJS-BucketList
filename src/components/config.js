import axios from 'axios'


const axiosInstance = axios.create({
    timeout: 10000,
    baseURL: 'https://patrickluboobi-bucket-list-api.herokuapp.com',
});

export default axiosInstance
/**
 * Created by PATRICK on 8/17/2017.
 */
