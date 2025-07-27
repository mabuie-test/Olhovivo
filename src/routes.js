import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';
import DashboardPage from './pages/DashboardPage';
import DevicesPage from './pages/DevicesPage';
import DeviceDetailPage from './pages/DeviceDetailPage';
import LocationsPage from './pages/LocationsPage';
import MessagesPage from './pages/MessagesPage';
import SettingsPage from './pages/SettingsPage';
import LoginPage from './pages/LoginPage';
import { useAuth } from './contexts/AuthContext';

const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? (
    <DashboardLayout>{element}</DashboardLayout>
  ) : (
    <Navigate to="/login" replace />
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={<PrivateRoute element={<DashboardPage />} />}
      />
      <Route
        path="/devices"
        element={<PrivateRoute element={<DevicesPage />} />}
      />
      <Route
        path="/devices/:deviceId"
        element={<PrivateRoute element={<DeviceDetailPage />} />}
      />
      <Route
        path="/locations"
        element={<PrivateRoute element={<LocationsPage />} />}
      />
      <Route
        path="/messages"
        element={<PrivateRoute element={<MessagesPage />} />}
      />
      <Route
        path="/settings"
        element={<PrivateRoute element={<SettingsPage />} />}
      />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;
