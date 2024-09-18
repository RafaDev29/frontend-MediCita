import axiosInstance from '@/config/http.config';
// import axios from 'axios';

const baseURL = process.env.VUE_APP_BASE_URL;


export function listDoctorApi() {
  
    return axiosInstance.get(`${baseURL}/doctor/list`)
}

export function createDoctorApi(payload) {
  
    return axiosInstance.post(`${baseURL}/doctor/create`, payload)
}