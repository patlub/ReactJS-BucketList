import axios from 'axios'


const axiosInstance = axios.create({
    // timeout: 10000,
    // baseURL: 'https://patrickluboobi-bucket-list-api.herokuapp.com',
    baseURL: 'http://127.0.0.1:5000',
    headers: {'Authorization': localStorage.getItem('token')}

});

export default axiosInstance
/**
 * Created by PATRICK on 8/17/2017.
 */
