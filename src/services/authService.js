import { apiClient } from "./apiClient";

export const loginAPI = async (data) => {
  return apiClient.post("users/login", data);
};

export const getMeAPI = async () => {
  return apiClient.get("auth/me");
};
