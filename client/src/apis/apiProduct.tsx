import axios from '../utils/axiosCustomize'

const getProduct = () => {
    return axios.get('product/')
}

const createNewProduct = (dataForm: any) => {
    return axios.post('product/', dataForm)
}

const editProduct = (id: String, dataForm: any) => {
    return axios.put(`product/${id}`, dataForm)
}

const deleteProduct = (id: String) => {
    return axios.delete(`product/${id}`)
}

const ratings = (dataForm: any) => {
    return axios.put(`product/ratings`, dataForm)
}

export { createNewProduct, getProduct, editProduct, deleteProduct, ratings }