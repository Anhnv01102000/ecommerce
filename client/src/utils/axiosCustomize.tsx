import axios from 'axios'

const instance = axios.create({
    baseURL: "http://localhost:8888/api/"
})

// const token = localStorage.getItem("access-token")
// console.log(token);

// instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export default instance