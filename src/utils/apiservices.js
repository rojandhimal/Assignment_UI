import { BASE_URL } from "../config";
import useAxios from "./useAxios"
const axios = require('axios').default;
const api = useAxios();

const headerConf ={
    headers: {
        'Content-Type': 'application/json'
    }
}
export const LoginService = async (data) => {
    let resp = { status: "fail", data: "error" }
    await axios.post(`${BASE_URL}/auth/login`, data,headerConf)
        .then(function (response) {
            resp = { status: "success", data: response.data }
        })
        .catch(function (error) {
            resp = { status: "fail", data: error }
        });
    return resp
}

export const SignupService = async (data) => {
    let resp = { status: "fail", data: "error" }
    await axios.post(`${BASE_URL}/auth/signup`, data,headerConf )
        .then(function (response) {
            resp = { status: "success", data: response.data }
        })
        .catch(function (error) {
            resp = { status: "fail", data: error }
        });
    return resp
}

export const apiGetALlPractitioners = async (data) => {
    let resp = { status: "fail", data: "error",practitioners:[] }
    await api.get(`${BASE_URL}/practitioner`, data, headerConf )
        .then(function (response) {
            resp = { status: "success", data: response.data, practitioners:response.data.practitioners  }
        })
        .catch(function (error) {
            resp = { status: "fail", data: error,practitioners:[] }
        });
    return resp
}

