import axios from '../utils/axiosCustomize'


const register = (dataForm: any) => {
    return axios.post('user/', dataForm)
}

const login = (dataForm: any) => {
    return axios.post('user/login', dataForm)
}

const refreshToken = (dataForm: any) => {
    return axios.post('user/refreshtoken', dataForm)
}

const getUser = () => {
    return axios.get('user/')
}

const editUser = (id: number, dataForm: any) => {
    const token = localStorage.getItem("access-token")
    console.log(token);
    return axios.put(`user/${id}`, dataForm, { headers: { "Authorization": `Bearer ${token}` } })
}

const deleteUser = (id: number) => {
    const token = localStorage.getItem("access-token")
    console.log(token);
    return axios.delete(`user/${id}`, { headers: { "Authorization": `Bearer ${token}` } })
}

export { register, login, refreshToken, getUser, editUser, deleteUser }