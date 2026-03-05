import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});

// Interceptor to handle standardized responses
api.interceptors.response.use(
    (response) => response.data, // This will return {status, message, data}
    (error) => {
        return Promise.reject(error);
    }
);

export const getContacts = () => api.get('/contacts');
export const getContact = (id) => api.get(`/contacts/${id}`);
export const createContact = (data) => api.post('/contacts', data);
export const updateContact = (id, data) => api.put(`/contacts/${id}`, data);
export const deleteContact = (id) => api.delete(`/contacts/${id}`);

// Security Intelligence Endpoints
export const getSecurityLogs = () => api.get('/security/logs');
export const getSecurityStats = () => api.get('/security/stats');

export default api;
