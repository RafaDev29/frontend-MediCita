import axiosInstance from '@/config/http.config';
// import axios from 'axios';

const baseURL = process.env.VUE_APP_BASE_URL;


export function listAltasApi() {
  
    return axiosInstance.get(`${baseURL}/discharges/list`)
}

export function createAltasApi(payload) {
  
    return axiosInstance.post(`${baseURL}/discharges/create`, payload)
}