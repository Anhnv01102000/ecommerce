import axios from '../utils/axiosCustomize'

const createNewOrder = (dataForm: any) => {
    return axios.post('order/', dataForm)
}

const getOrder = () => {
    const token = localStorage.getItem("access-token")
    return axios.get('order/')
}

export { createNewOrder, getOrder }