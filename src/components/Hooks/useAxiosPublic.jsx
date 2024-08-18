import axios from "axios";

const axiosPublic = axios.create({
    // baseURL:import.meta.env.VITE_serverUrl
    baseURL:'https://ghorer-bazar-server.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic ;
};

export default useAxiosPublic;