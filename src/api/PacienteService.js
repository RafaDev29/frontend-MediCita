import axiosInstance from '@/config/http.config';
// import axios from 'axios';

const baseURL = process.env.VUE_APP_BASE_URL;


export function listPacienteApi() {
  
    return axiosInstance.get(`${baseURL}/patient/list`)
}

export function createPacienteApi(payload) {
  
    return axiosInstance.post(`${baseURL}/patient/create`, payload)
}