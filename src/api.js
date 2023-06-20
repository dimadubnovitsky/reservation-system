import request from './utils/request';

export const api = {
  users: {
    get: () => request.get('/users/'),
    post: (data) => request.post('/users/', data),
  },
  reservations: {
    get: () => request.get('/reservations/'),
    post: (data) => request.post('/reservations/', data),
    delete: (id) => request.delete(`/reservations/${id}/`),
  },
  tables: {
    get: () => request.get('/tables/'),
  },
};
