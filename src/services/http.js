import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://dummyjson.com/recipes",
  headers: {
    "Content-type": "application/json",
  },
});

export default axiosInstance;
