import api from "../api/axios";

// Backend: GET /dashboard -> DashboardDTO
export const getDashboardStats = async () => {
  const response = await api.get("/dashboard");
  return response.data;
};
