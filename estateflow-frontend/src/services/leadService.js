import api from "../api/axios";

// Backend: GET /leads?page=&size=&sortBy=&direction=
export const getLeads = async ({ page = 0, size = 10, sortBy = "id", direction = "asc" } = {}) => {
  const response = await api.get("/leads", {
    params: { page, size, sortBy, direction },
  });
  return response.data; // Page<Lead>: { content, totalPages, totalElements, number, ... }
};

export const getLeadById = async (id) => {
  const response = await api.get(`/leads/${id}`);
  return response.data;
};

export const searchLeads = async (keyword, { page = 0, size = 10 } = {}) => {
  const response = await api.get("/leads/search", {
    params: { keyword, page, size },
  });
  return response.data;
};

export const getLeadsByStatus = async (status, { page = 0, size = 10 } = {}) => {
  const response = await api.get(`/leads/status/${status}`, {
    params: { page, size },
  });
  return response.data;
};

export const createLead = async (lead) => {
  const response = await api.post("/leads", lead);
  return response.data;
};

export const updateLead = async (id, lead) => {
  const response = await api.put(`/leads/${id}`, lead);
  return response.data;
};

export const updateLeadStatus = async (id, status) => {
  const response = await api.put(`/leads/${id}/status`, null, {
    params: { status },
  });
  return response.data;
};

export const deleteLead = async (id) => {
  const response = await api.delete(`/leads/${id}`);
  return response.data;
};
