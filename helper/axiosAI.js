import axios from "axios";

const axiosAI = axios.create({
    baseURL: '',
    headers:{
        'Content-Type':'application/json'
    },
});

axiosAI.interceptors.response.use(
    function(response){
        return response.data;
    }
);
axiosAI.defaults.headers.common[
    "Authorization"
  ] = `Bearer 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`;
export default axiosAI;