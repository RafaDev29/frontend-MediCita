import axiosInstance from '@/config/http.config';
// import axios from 'axios';

const baseURL = process.env.VUE_APP_BASE_URL;


export function authLoginApi() {
  
    return axiosInstance.get(`${baseURL}/internment/list`)
}

export function createInternadoApi(payload) {
  
    return axiosInstance.post(`${baseURL}/internment/create`, payload)
}