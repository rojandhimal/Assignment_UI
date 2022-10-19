import axios from 'axios'
import jwt_decode from "jwt-decode";
import dayjs from 'dayjs'
import { BASE_URL } from '../config';


const baseURL = BASE_URL


const useAxios = () => {
    const authToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    const axiosInstance = axios.create({
        baseURL,
        headers:{Authorization: `Bearer ${authToken}`}
    });


    axiosInstance.interceptors.request.use(async req => {
    
        const user = jwt_decode(authToken)
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    
        if(!isExpired) return req
    
        const response = await axios.get(`${baseURL}/auth/refresh-token/`, {
            refresh: refreshToken
          });
    
        localStorage.setItem('accessToken', JSON.stringify(response.data.accessToken))
        localStorage.setItem('refreshToken', JSON.stringify(response.data.accessToken))
        req.headers.Authorization = `Bearer ${response.data.authToken}`
        return req
    })
    
    return axiosInstance
}

export default useAxios;