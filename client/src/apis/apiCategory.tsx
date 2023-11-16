import axios from '../utils/axiosCustomize'
import { refreshToken } from './apiUser'

const getCategory = () => {
    return axios.get('category/')
}

const createNewCategory = (dataForm: any) => {
    return axios.post('category/', dataForm)
}

const editCategory = (id: String, dataForm: any) => {
    return axios.put(`category/${id}`, dataForm)
}

const deleteCategory = (id: String) => {
    return axios.delete(`category/${id}`)
}

export { createNewCategory, getCategory, editCategory, deleteCategory }