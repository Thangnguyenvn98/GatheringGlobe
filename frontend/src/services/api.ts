import { useQuery } from "@tanstack/react-query";
import axios from "axios"


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
export const axiosInstance = axios.create({baseURL: API_BASE_URL, withCredentials:true})

const serverTest = async() => {
    const response = await axiosInstance.get('/test')
    return response.data
}
const serverTest_Login = async() => {
    const response = await axiosInstance.post('/api/users/register',{
        "email": "5@55.com",
        "password": "password789"
      })
    return response.data
}

export const useServerTest = () => {
    return useQuery({
        queryKey:["test"],
        queryFn: serverTest
    })
}

export const serverTestUsers = () => {
    return useQuery({
        queryKey:["test"],
        queryFn: serverTest_Login
    })
}

export const RegisterUser = async(data: any) => {
    const reponse = await axiosInstance.post('/api/users/register',data)
}