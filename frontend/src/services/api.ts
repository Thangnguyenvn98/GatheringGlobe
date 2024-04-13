import { SignInFormData } from "@/types/signInFormData";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

const serverTest = async () => {
  const response = await axiosInstance.get("/test");
  return response.data;
};

export const useServerTest = () => {
  return useQuery({
    queryKey: ["test"],
    queryFn: serverTest,
  });
};

export const RegisterUser = async (data: SignInFormData) => {
  try {
  const response = await axiosInstance.post("/api/users/register", data);
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }
  else {
    throw new Error(`Server responded with status: ${response.status}`);
  }
} catch (error) {
  console.error("Registration failed", error);
  throw error
}

};
