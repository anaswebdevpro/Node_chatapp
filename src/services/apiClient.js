const BASE_URL = "http://192.168.29.171:8000/api/v1/"; 

export const apiClient = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...options,
  };

  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, config);

    if (!res.ok) {
      throw new Error("API Error");
    }

    return await res.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
