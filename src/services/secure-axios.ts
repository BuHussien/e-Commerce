import axiosInstance from "./axios-global";
const secureAxiosInstance = axiosInstance.create();
secureAxiosInstance.interceptors.request.use((config) => {
  const persistedAuth = localStorage.getItem("persist:auth");
  const token = persistedAuth
    ? JSON.parse(JSON.parse(persistedAuth).accessToken)
    : null;
  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
});

export default secureAxiosInstance;
