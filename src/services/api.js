import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.simkl.com/",
  headers: {
    "simkl-api-key":
      "71d565fcfecb28bff9dc63ea3f245217636b96af9a0426a44cc5d5dd8085fe35",
  },
});

export default axiosInstance;
