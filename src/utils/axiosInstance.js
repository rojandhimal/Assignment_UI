import axios from 'axios'
import jwt_decode from "jwt-decode";
import dayjs from 'dayjs'
import { BASE_URL } from '../config';


const baseURL = BASE_URL;

let accessToken = localStorage.getItem('accessToken') ? JSON.parse(localStorage.getItem('accessToken')) : null
let refreshToken = localStorage.getItem('refreshToken') ? JSON.parse(localStorage.getItem('refreshToken')) : null

const axiosInstance = axios.create({
    baseURL,
    headers:{Authorization: `Bearer ${accessToken}`}
});

axiosInstance.interceptors.request.use(async req => {
    console.log("hey there")
    if(!accessToken){
        accessToken = localStorage.getItem('accessToken') ? JSON.parse(localStorage.getItem('accessToken')) : null
        req.headers.Authorization = `Bearer ${accessToken}`
    }

    const user = jwt_decode(accessToken)
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if(!isExpired) return req

    const response = await axios.post(`${baseURL}/auth/refresh-token`, {
        refresh: refreshToken
      });

    localStorage.setItem('accessToken', JSON.stringify(response.data.authToken))
    localStorage.setItem('refreshToken', JSON.stringify(response.data.refreshToken))
    req.headers.Authorization = `Bearer ${response.data.access}`
    return req
})


export default axiosInstance;