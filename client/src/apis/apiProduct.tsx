import axios from '../utils/axiosCustomize'

const getProduct = () => {
    return axios.get('product/')
}

const createNewProduct = (dataForm: any) => {
    const token = localStorage.getItem("access-token")
    // console.log(token);
    return axios.post('product/', dataForm, { headers: { "Authorization": `Bearer ${token}` } })
}

const editProduct = (id: number, dataForm: any) => {
    const token = localStorage.getItem("access-token")
    // console.log(token);
    return axios.put(`product/${id}`, dataForm, { headers: { "Authorization": `Bearer ${token}` } })
}

const deleteProduct = (id: number) => {
    const token = localStorage.getItem("access-token")
    // console.log(token);
    return axios.delete(`product/${id}`, { headers: { "Authorization": `Bearer ${token}` } })
}

export { createNewProduct, getProduct, editProduct, deleteProduct }