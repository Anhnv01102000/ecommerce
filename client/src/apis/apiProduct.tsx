import axios from '../utils/axiosCustomize'

const createNewProduct = (dataForm: any) => {
    return axios.post('product/', dataForm)
}

const getProduct = () => {
    return axios.get('product/')
}

const editProduct = (id: number, dataForm: any) => {
    return axios.put(`product/${id}`, dataForm)
}

const deleteProduct = (id: number) => {
    return axios.delete(`product/${id}`)
}

export { createNewProduct, getProduct, editProduct, deleteProduct }