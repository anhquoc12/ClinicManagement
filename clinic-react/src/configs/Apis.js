import axios from "axios";
import cookie from "react-cookies";

const SERVER_CONTEXT = '/ClinicWeb'
const SERVER = 'http://localhost:8080'

export const endpoints = {
    'addPatients': `${SERVER_CONTEXT}/api/users/patient/`,
    'login': `${SERVER_CONTEXT}/api/login/`,
    'current-user': `${SERVER_CONTEXT}/api/current-user/`,
    'patients': `${SERVER_CONTEXT}/api/admin/users/patients/`,
    'nurses': `${SERVER_CONTEXT}/api/admin/users/nurses/`,
    'deleteNurse': (userId) => `${SERVER_CONTEXT}/api/admin/nurse/${userId}/`,
    'AddNurse': `${SERVER_CONTEXT}/api/admin/users/nurse/`,
    'user': (userId) => `${SERVER_CONTEXT}/api/user/${userId}/`,
    'updateNurse': (nurse) => `${SERVER_CONTEXT}/api/admin/users/nurse/${nurse}/`,
    'doctors':`${SERVER_CONTEXT}/api/admin/users/doctors/`,
    'doctor':(doctorId) => `${SERVER_CONTEXT}/api/user/doctor/${doctorId}/`,
    'special': `${SERVER_CONTEXT}/api/admin/specialization/`,
    'updateDoctor': (doctor) => `${SERVER_CONTEXT}/api/admin/users/doctor/${doctor}/`,
    'deleteDoctor': (userId) => `${SERVER_CONTEXT}/api/admin/doctor/${userId}/`,
    'addDoctor': `${SERVER_CONTEXT}/api/admin/users/doctor/`,
    'medicines': `${SERVER_CONTEXT}/api/admin/medicines/`,
    'categories': `${SERVER_CONTEXT}/api/admin/medicine/categories/`,
    'deleteCategory': (categoryId) => `${SERVER_CONTEXT}/api/admin/medicine/category/${categoryId}/`,
    'addCategory': `${SERVER_CONTEXT}/api/admin/medicine/category/`,
    'deleteMedicine': (medicineId) => `${SERVER_CONTEXT}/api/admin/medicines/${medicineId}/`,
    'unitMedicines': `${SERVER_CONTEXT}/api/admin/medicine/unit-medicines/`,
    'addUnitMedicine': `${SERVER_CONTEXT}/api/admin/medicine/unit-medicine/`,
    "deleteUnitMedicine": (unitMedicineId) => `${SERVER_CONTEXT}/api/admin/medicine/unit-medicine/${unitMedicineId}/`,
    'addMedicine': `${SERVER_CONTEXT}/api/admin/medicine/`,
    'updateMedicine': (id) => `${SERVER_CONTEXT}/api/admin/medicine/${id}/`,
    'medicine': (id) => `${SERVER_CONTEXT}/api/admin/medicine/${id}/`
}
export const authAPI = () => {
    return axios.create({
        baseURL: SERVER,
        headers: {
            'Authorization': cookie.load('token'),
            'Content-Type': 'multipart/form-data'
        }
    })
}

export default axios.create({
    baseURL: SERVER
})