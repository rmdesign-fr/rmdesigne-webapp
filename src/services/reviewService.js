import api from './api'

export const getApprovedReviews = () =>
  api.get('/api/reviews').then(r => r.data)

export const getAllReviews = () =>
  api.get('/api/reviews/all').then(r => r.data)

export const createReview = (data) =>
  api.post('/api/reviews', data).then(r => r.data)

export const approveReview = (id, approved) =>
  api.put(`/api/reviews/${id}/approve`, { approved }).then(r => r.data)

export const deleteReview = (id) =>
  api.delete(`/api/reviews/${id}`).then(r => r.data)
