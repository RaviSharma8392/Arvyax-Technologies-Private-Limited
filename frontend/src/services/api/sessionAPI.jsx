import axios from "axios";

// Base URL for API
const appUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Create Axios instance
const api = axios.create({
  baseURL: `${appUrl}/api`,
  withCredentials: true,
});

// Helper function for handling errors
const handleError = (error) => {
  console.error("API call failed:", error.response?.data || error.message);
  return error.response?.data || error.message;
};

// Save draft
const saveDraft = async (data) => {
  try {
    const res = await api.post("/sessions/my-sessions/save-draft", data);
    return { success: true, data: res.data };
  } catch (error) {
    return { success: false, error: handleError(error) };
  }
};

// Publish session
const publishSession = async (data) => {
  try {
    const res = await api.post("/sessions/my-sessions/publish", data);
    return { success: true, data: res.data };
  } catch (error) {
    return { success: false, error: handleError(error) };
  }
};

// Fetch all sessions of current user
const fetchSession = async () => {
  try {
    const res = await api.get("/sessions/my-sessions");
    return { success: true, data: res.data };
  } catch (error) {
    return { success: false, error: handleError(error) };
  }
};

// Fetch single session by ID
const fetchSessionById = async (id) => {
  try {
    // console.log(id)
    const res = await api.get(`/sessions/my-sessions/${id}`);
    console.log(res);
    return { success: true, data: res.data.session };
  } catch (error) {
    return { success: false, error: handleError(error) };
  }
};

// Fetch all public sessions
const fetchAllSession = async () => {
  try {
    const res = await api.get("/sessions/sessions");
    return { success: true, data: res.data };
  } catch (error) {
    return { success: false, error: handleError(error) };
  }
};

// Export all API functions
const SesssionAPI = {
  saveDraft,
  publishSession,
  fetchSession,
  fetchSessionById,
  fetchAllSession,
};

export default SesssionAPI;
