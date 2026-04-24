import { apiClient } from "./apiClient";

export const loginAPI = async (data) => {
  return apiClient("users/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
