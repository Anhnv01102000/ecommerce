import axios from '../utils/axiosCustomize'

const createOrder = (dataForm: any) => {
    return axios.post('order/', dataForm)
}

const getOrder = () => {
    const token = localStorage.getItem("access-token")
    return axios.get('order/', { headers: { "Authorization": `Bearer ${token}` } })
}

export { createOrder, getOrder }