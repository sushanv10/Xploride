import axios from "axios";
import config from "./Config";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
    baseURL: config.baseURL,
    headers: {
        "Content-Type": "application/json",
    },

    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = Cookies.get("accessToken");
        if(token){
            config.headers["Authorization"]= `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default axiosInstance;