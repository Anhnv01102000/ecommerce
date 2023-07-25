import axios from '../utils/axiosCustomize'


const createNewCategory = (dataForm: any) => {
    return axios.post('category/', dataForm)
}

const getCategory = () => {
    return axios.get('category/')
}

const editCategory = (id: number, dataForm: any) => {
    return axios.put(`category/${id}`, dataForm)
}

const deleteCategory = (id: number) => {
    return axios.delete(`category/${id}`)
}

export { createNewCategory, getCategory, editCategory, deleteCategory }