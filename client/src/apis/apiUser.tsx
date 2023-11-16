import axios from '../utils/axiosCustomize'


const register = (dataForm: any) => {
    return axios.post('user/', dataForm)
}

const login = (dataForm: any) => {
    return axios.post('user/login', dataForm)
}

const logout = (dataForm: any) => {
    return axios.post('user/logout', dataForm)
}

const refreshToken = (dataForm: any) => {
    return axios.post('user/refreshtoken', dataForm)
}

const getUser = () => {
    return axios.get('user/')
}

export { register, login, refreshToken, getUser, logout }