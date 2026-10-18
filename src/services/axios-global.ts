// axios.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5005",
});

export default axiosInstance;
