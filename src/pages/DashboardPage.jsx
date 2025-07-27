import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import DataStats from '../components/dashboard/DataStats';
import ActivityTimeline from '../components/dashboard/ActivityTimeline';
import RealTimeMonitor from '../components/dashboard/RealTimeMonitor';
import DeviceList from '../components/devices/DeviceList';
import { api } from '../api/api';

const DashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [statsData, devicesData] = await Promise.all([
          api.getDashboardStats(),
          api.getDevices(1, 5)
        ]);
        setStats(statsData);
        setDevices(devicesData);
      } catch (error) {
        console.error('Error fetching dashboard data:', api.handleError(error));
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <DashboardLayout>
      <Typography variant="h4" gutterBottom>
        Painel de Controle
      </Typography>
      
      {loading ? (
        <Box display="flex" justifyContent="center" my={10}>
          <CircularProgress size={60} />
        </Box>
      ) : (
        <>
          <DataStats stats={stats} />
          
          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid item xs={12} md={6}>
              <ActivityTimeline />
            </Grid>
            <Grid item xs={12} md={6}>
              <RealTimeMonitor />
            </Grid>
          </Grid>
          
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
              Dispositivos Recentes
            </Typography>
            <DeviceList devices={devices} />
          </Box>
        </>
      )}
    </DashboardLayout>
  );
};

export default DashboardPage;
