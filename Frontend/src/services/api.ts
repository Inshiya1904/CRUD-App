import axios from "axios";
import toast from "react-hot-toast";
import type { User } from "../types/user";

const API_URL = "https://crud-app-backend-lapg.onrender.com/api/users";

// Axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Global error handler
api.interceptors.response.use(
  (res) => res,
  (error) => {
    const msg =
      error.response?.data?.message ||
      "Something went wrong";

    toast.error(msg);

    return Promise.reject(error);
  }
);

export const getUsers = async () => {
  const res = await api.get("/");
  return res.data.data;
};

export const createUser = async (user: User) => {
  const res = await api.post("/", user);
  toast.success("User created");
  return res.data;
};

export const updateUser = async (
  id: string,
  user: User
) => {
  const res = await api.put(`/${id}`, user);
  toast.success("User updated");
  return res.data;
};

export const deleteUser = async (id: string) => {
  const res = await api.delete(`/${id}`);
  toast.success("User deleted");
  return res.data;
};
