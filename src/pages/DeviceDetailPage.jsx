import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Tabs, 
  Tab, 
  Grid,
  CircularProgress,
  Chip
} from '@mui/material';
import DashboardLayout from '../components/layout/DashboardLayout';
import LocationMap from '../components/dashboard/LocationMap';
import DeviceSessions from '../components/devices/DeviceSessions';
import DeviceMessages from '../components/devices/DeviceMessages';
import DeviceCalls from '../components/devices/DeviceCalls';
import DeviceInfo from '../components/devices/DeviceInfo';
import { api } from '../api/api';

const DeviceDetailPage = () => {
  const { deviceId } = useParams();
  const [device, setDevice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchDeviceData = async () => {
      try {
        setLoading(true);
        const [deviceData, locationData] = await Promise.all([
          api.getDevice(deviceId),
          api.getDeviceLocations(deviceId)
        ]);
        setDevice(deviceData);
        setLocations(locationData);
      } catch (error) {
        console.error('Error fetching device data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeviceData();
  }, [deviceId]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
          <CircularProgress size={60} />
        </Box>
      </DashboardLayout>
    );
  }

  if (!device) {
    return (
      <DashboardLayout>
        <Typography variant="h5" color="error">
          Dispositivo não encontrado
        </Typography>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Box mb={3}>
        <Typography variant="h4" gutterBottom>
          {device.deviceId}
        </Typography>
        <Box display="flex" gap={1} mb={2}>
          <Chip 
            label={device.isActive ? 'Ativo' : 'Inativo'} 
            color={device.isActive ? 'success' : 'error'} 
          />
          <Chip label={`Android ${device.androidVersion}`} variant="outlined" />
          <Chip label={device.model} variant="outlined" />
        </Box>
      </Box>

      <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label="Visão Geral" />
        <Tab label="Localizações" />
        <Tab label="Mensagens" />
        <Tab label="Chamadas" />
        <Tab label="Informações" />
      </Tabs>

      {tabValue === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <LocationMap deviceId={deviceId} />
          </Grid>
          <Grid item xs={12} md={4}>
            <DeviceSessions deviceId={deviceId} />
          </Grid>
          <Grid item xs={12}>
            <DeviceInfo device={device} />
          </Grid>
        </Grid>
      )}

      {tabValue === 1 && (
        <Box>
          <LocationMap deviceId={deviceId} />
          {/* Lista de localizações seria adicionada aqui */}
        </Box>
      )}

      {tabValue === 2 && <DeviceMessages deviceId={deviceId} />}
      {tabValue === 3 && <DeviceCalls deviceId={deviceId} />}
      {tabValue === 4 && <DeviceInfo device={device} detailed />}
    </DashboardLayout>
  );
};

export default DeviceDetailPage;
