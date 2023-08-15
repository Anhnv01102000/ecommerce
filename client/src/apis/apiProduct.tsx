import axios from '../utils/axiosCustomize'

const getProduct = () => {
    return axios.get('product/')
}

const createNewProduct = (dataForm: any) => {
    const token = localStorage.getItem("access-token")
    // console.log(token);
    return axios.post('product/', dataForm, { headers: { "Authorization": `Bearer ${token}` } })
}

const editProduct = (id: String, dataForm: any) => {
    const token = localStorage.getItem("access-token")
    // console.log(token);
    return axios.put(`product/${id}`, dataForm, { headers: { "Authorization": `Bearer ${token}` } })
}

const deleteProduct = (id: String) => {
    const token = localStorage.getItem("access-token")
    // console.log(token);
    return axios.delete(`product/${id}`, { headers: { "Authorization": `Bearer ${token}` } })
}

const ratings = (dataForm: any) => {
    const token = localStorage.getItem("access-token")
    return axios.put(`product/ratings`, dataForm, { headers: { "Authorization": `Bearer ${token}` } })
}

export { createNewProduct, getProduct, editProduct, deleteProduct, ratings }