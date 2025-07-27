import React from 'react';
import { Box } from '@mui/material';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useAuth } from '../../contexts/AuthContext';

const DashboardLayout = ({ children }) => {
  const { user } = useAuth();

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Navbar />
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginTop: '64px',
          marginLeft: { sm: '240px', xs: 0 },
          width: { sm: 'calc(100% - 240px)', xs: '100%' }
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
