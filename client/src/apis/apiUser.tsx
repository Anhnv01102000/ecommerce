import axios from '../utils/axiosCustomize'


const createNewUser = (dataForm: any) => {
    return axios.post('user/', dataForm)
}

const getUser = () => {
    return axios.get('user/')
}

const editUser = (id: number, dataForm: any) => {
    return axios.put(`user/${id}`, dataForm)
}

const deleteUser = (id: number) => {
    return axios.delete(`user/${id}`)
}

export { createNewUser, getUser, editUser, deleteUser }