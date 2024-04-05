import { useQuery } from "@tanstack/react-query";
import axios from "axios"


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
export const axiosInstance = axios.create({baseURL: API_BASE_URL, withCredentials:true})

const serverTest = async() => {
    const response = await axiosInstance.get('/test')
    return response.data
}

export const useServerTest = () => {
    return useQuery({
        queryKey:["test"],
        queryFn: serverTest
    })
}

