import axios from "axios";

const appUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: `${appUrl}/api`,
  withCredentials: true,
});

const handleError = (error) => error.response?.data || error.message;

const registerUser = async (registerData) => {
  try {
    const res = await api.post("/users/register", registerData);
    return { success: true, data: res.data };
  } catch (error) {
    return { success: false, error: handleError(error) };
  }
};

const loginUser = async (loginData) => {
  try {
    const res = await api.post("/users/login", loginData);
    return { success: true, data: res.data };
  } catch (error) {
    return { success: false, error: handleError(error) };
  }
};

const logoutUser = async () => {
  try {
    const res = await api.post("/users/logout");
    return { success: true, data: res.data };
  } catch (error) {
    return { success: false, error: handleError(error) };
  }
};

const authAPI = { registerUser, loginUser, logoutUser };
export default authAPI;
