import axios from '../utils/axiosCustomize'
import { refreshToken } from './apiUser'

const getCategory = () => {
    return axios.get('category/')
}

const createNewCategory = (dataForm: any) => {
    const token = localStorage.getItem("access-token")
    console.log(token);
    return axios.post('category/', dataForm, { headers: { "Authorization": `Bearer ${token}` } })
}

const editCategory = (id: number, dataForm: any) => {
    const token = localStorage.getItem("access-token")
    console.log(token);
    return axios.put(`category/${id}`, dataForm, { headers: { "Authorization": `Bearer ${token}` } })
}

const deleteCategory = (id: number) => {
    const token = localStorage.getItem("access-token")
    console.log(token);
    return axios.delete(`category/${id}`, { headers: { "Authorization": `Bearer ${token}` } })
}

export { createNewCategory, getCategory, editCategory, deleteCategory }