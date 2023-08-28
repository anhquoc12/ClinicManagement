import axios from "axios";
import cookie from "react-cookies";

const SERVER_CONTEXT = '/ClinicWeb'
const SERVER = 'http://localhost:8080'

export const endpoints = {
    'addPatients': `${SERVER_CONTEXT}/api/users/patient/`,
    'login': `${SERVER_CONTEXT}/api/login/`,
    'current-user': `${SERVER_CONTEXT}/api/current-user/`,
    'patients': `${SERVER_CONTEXT}/api/admin/users/patients/`,
    'nurses': `${SERVER_CONTEXT}/api/admin/users/nurses/`
}
export const authAPI = () => {
    return axios.create({
        baseURL: SERVER,
        headers: {
            'Authorization': cookie.load('token')
        }
    })
}

export default axios.create({
    baseURL: SERVER
})