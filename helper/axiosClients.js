import axios from "axios";

const axiosClients = axios.create({
    baseURL: 'https://ncc02.pythonanywhere.com/api',
    headers:{
        'Content-Type':'application/json'
    },
});

axiosClients.interceptors.response.use(
    function(response){
        return response.data;
    }
);

export default axiosClients;

