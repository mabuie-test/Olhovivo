import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para adicionar token a cada requisição
api.interceptors.request.use(config => {
  const token = localStorage.getItem('monitoring_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default {
  login: (username, password) => 
    api.post('/auth/login', { username, password }),
  
  getUserProfile: () => 
    api.get('/users/me'),
  
  getDashboardStats: () => 
    api.get('/dashboard/stats'),
  
  getDevices: (page = 1, limit = 10) => 
    api.get(`/devices?page=${page}&limit=${limit}`),
  
  getDevice: (deviceId) => 
    api.get(`/devices/${deviceId}`),
  
  getDeviceLocations: (deviceId, page = 1, limit = 50) => 
    api.get(`/devices/${deviceId}/locations?page=${page}&limit=${limit}`),
  
  getDeviceSMS: (deviceId, page = 1, limit = 20) => 
    api.get(`/devices/${deviceId}/sms?page=${page}&limit=${limit}`),
  
  getDeviceCalls: (deviceId, page = 1, limit = 20) => 
    api.get(`/devices/${deviceId}/calls?page=${page}&limit=${limit}`),
  
  updateDevice: (deviceId, data) => 
    api.put(`/devices/${deviceId}`, data),
  
  deleteDevice: (deviceId) => 
    api.delete(`/devices/${deviceId}`),
  
  getUsers: () => 
    api.get('/users'),
  
  createUser: (userData) => 
    api.post('/users', userData),
  
  updateUser: (userId, userData) => 
    api.put(`/users/${userId}`, userData),
  
  deleteUser: (userId) => 
    api.delete(`/users/${userId}`),
  
  // Função para lidar com erros
  handleError: (error) => {
    if (error.response) {
      // Erro da API com status code
      return {
        status: error.response.status,
        message: error.response.data.error || 'Erro desconhecido'
      };
    } else if (error.request) {
      // Requisição feita mas sem resposta
      return { message: 'Sem resposta do servidor' };
    } else {
      // Erro ao configurar a requisição
      return { message: error.message };
    }
  }
};
