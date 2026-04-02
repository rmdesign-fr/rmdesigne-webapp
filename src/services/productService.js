import api from './api'

export const getProducts = (category) =>
  api.get('/api/products', { params: category ? { category } : {} }).then(r => r.data)

export const getProduct = (id) =>
  api.get(`/api/products/${id}`).then(r => r.data)

export const createProduct = (formData) =>
  api.post('/api/products', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then(r => r.data)

export const updateProduct = (id, formData) =>
  api.put(`/api/products/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then(r => r.data)

export const deleteProduct = (id) =>
  api.delete(`/api/products/${id}`).then(r => r.data)
