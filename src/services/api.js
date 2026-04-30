import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.simkl.com/",
  headers: {
    "simkl-api-key": import.meta.env.VITE_SIMKL_API_KEY,
  },
});

export default axiosInstance;
