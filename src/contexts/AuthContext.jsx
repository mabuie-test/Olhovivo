import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../api/api';
import { decodeToken } from '../utils/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('monitoring_token');
      if (token) {
        try {
          const decoded = decodeToken(token);
          const userData = await api.getUserProfile();
          setUser({ ...decoded, ...userData });
        } catch (error) {
          logout();
        }
      }
      setLoading(false);
      
      if (!token && location.pathname !== '/login') {
        navigate('/login');
      }
    };
    
    initAuth();
  }, []);

  const login = async (username, password) => {
    const response = await api.login(username, password);
    localStorage.setItem('monitoring_token', response.token);
    const decoded = decodeToken(response.token);
    setUser(decoded);
    navigate('/dashboard');
  };

  const logout = () => {
    localStorage.removeItem('monitoring_token');
    setUser(null);
    navigate('/login');
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
