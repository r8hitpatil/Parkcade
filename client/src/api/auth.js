import apiClient from "@/api/apiClient";

export const loginUser = (data) => apiClient.post("/user/login",data);
export const logoutUser = () => apiClient.post("/user/logout");
export const fetchCurrentUser = () => apiClient.get("/user/me",{ withCredentials : true });