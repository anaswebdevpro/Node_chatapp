const BASE_URL = "http://192.168.29.171:8000/api/v1/";

export const apiClient = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  const config = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, config);
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw { response: { data, status: res.status } };
    }

    return { data, status: res.status };
  } catch (error) {
    console.error(`[API Error] ${endpoint}:`, error);
    throw error;
  }
};

apiClient.get = (endpoint, options = {}) =>
  apiClient(endpoint, { ...options, method: "GET" });
apiClient.post = (endpoint, body, options = {}) =>
  apiClient(endpoint, {
    ...options,
    method: "POST",
    body: JSON.stringify(body),
  });
apiClient.put = (endpoint, body, options = {}) =>
  apiClient(endpoint, {
    ...options,
    method: "PUT",
    body: JSON.stringify(body),
  });
apiClient.delete = (endpoint, options = {}) =>
  apiClient(endpoint, { ...options, method: "DELETE" });
