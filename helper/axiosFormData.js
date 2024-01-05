import axios from "axios";

const axiosClientForm = axios.create({
  baseURL: 'https://ncc02.pythonanywhere.com/api',
  headers:{
      'Content-Type':'multipart/form-data',
      Accept: 'application/json',
  },
});

axiosClientForm.interceptors.response.use(
  function(response){
      return response.data;
  }
);

export default axiosClientForm