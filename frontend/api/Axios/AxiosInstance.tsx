import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "http://10.10.52.51:5000/api", //192.168.1.255  10.10.52.51 
  timeout: 10000
  // ,
  // headers: {
  //   "Content-Type": "multipart/form-data",
  // },
});

export default AxiosInstance;