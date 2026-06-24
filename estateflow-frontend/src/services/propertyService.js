import api from "../api/axios";

// Backend: GET /properties?page=&size=&sortBy=&direction=
export const getProperties = async ({ page = 0, size = 10, sortBy = "id", direction = "asc" } = {}) => {
  const response = await api.get("/properties", {
    params: { page, size, sortBy, direction },
  });
  return response.data; // Page<Property>
};

export const createProperty = async (property) => {
  const response = await api.post("/properties", property);
  return response.data;
};

export const searchPropertiesByLocation = async (location) => {
  const response = await api.get("/properties/search", {
    params: { location },
  });
  return response.data; // plain List<Property>, not paginated
};

export const filterPropertiesByPrice = async (minPrice, maxPrice) => {
  const response = await api.get("/properties/filter", {
    params: { minPrice, maxPrice },
  });
  return response.data; // plain List<Property>, not paginated
};
