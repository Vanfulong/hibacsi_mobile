import axios from "axios";

const axiosClients = axios.create({
    baseURL: 'abc',
    headers:{
        'Content-Type':'application/json'
    }
});

axiosClients.interceptors.response.use(
    function(response){
        return response.data;
    }
);

export default axiosClients;