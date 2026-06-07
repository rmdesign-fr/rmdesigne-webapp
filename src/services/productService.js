import api from "./api";

const normalizeProducts = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.products)) return payload.products;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.data?.products)) return payload.data.products;
  return [];
};

export const getProducts = (category) =>
  api
    .get("/api/products", { params: category ? { category } : {} })
    .then((r) => normalizeProducts(r.data));

export const getProductsAdmin = () =>
  api.get("/api/products/admin").then((r) => normalizeProducts(r.data));

export const getProduct = (id) =>
  api.get(`/api/products/${id}`).then((r) => r.data);

export const createProduct = (formData) =>
  api.post("/api/products", formData).then((r) => r.data);

export const updateProduct = (id, formData) =>
  api.put(`/api/products/${id}`, formData).then((r) => r.data);

export const deleteProduct = (id) =>
  api.delete(`/api/products/${id}`).then((r) => r.data);
