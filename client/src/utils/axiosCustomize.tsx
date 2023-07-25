import axios from 'axios'

const instance = axios.create({
    baseURL: "http://localhost:8888/api/"
})

instance.defaults.headers.common['Authorization'] = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YjdhNTIzZDVmMzA2MDQ3Y2I3Y2QwNCIsInJvbGUiOiJVc2VyIiwiaWF0IjoxNjkwMTc5MDQ0LCJleHAiOjE2OTAzNTE4NDR9.KapepCipO_PLljjPWei4HVo-CBfgEkmDkm-OtptoQfM";

export default instance