import React from 'react';
import { 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  useTheme 
} from '@mui/material';
import { 
  AccessTime, 
  Smartphone, 
  Message, 
  Phone, 
  LocationOn 
} from '@mui/icons-material';
import { ResponsiveBar } from '@nivo/bar';

const DataStats = ({ stats }) => {
  const theme = useTheme();

  const barData = [
    { day: 'Seg', sms: stats?.smsPerDay?.monday || 0 },
    { day: 'Ter', sms: stats?.smsPerDay?.tuesday || 0 },
    { day: 'Qua', sms: stats?.smsPerDay?.wednesday || 0 },
    { day: 'Qui', sms: stats?.smsPerDay?.thursday || 0 },
    { day: 'Sex', sms: stats?.smsPerDay?.friday || 0 },
    { day: 'Sáb', sms: stats?.smsPerDay?.saturday || 0 },
    { day: 'Dom', sms: stats?.smsPerDay?.sunday || 0 },
  ];

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={3}>
        <Card sx={{ height: '100%' }}>
          <CardContent>
            <Typography variant="h6" color="textSecondary">
              Dispositivos
            </Typography>
            <Box display="flex" alignItems="center" mt={1}>
              <Smartphone sx={{ fontSize: 40, color: theme.palette.primary.main }} />
              <Typography variant="h4" sx={{ ml: 2 }}>
                {stats?.totalDevices || 0}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid item xs={12} md={3}>
        <Card sx={{ height: '100%' }}>
          <CardContent>
            <Typography variant="h6" color="textSecondary">
              Mensagens
            </Typography>
            <Box display="flex" alignItems="center" mt={1}>
              <Message sx={{ fontSize: 40, color: theme.palette.success.main }} />
              <Typography variant="h4" sx={{ ml: 2 }}>
                {stats?.totalSMS || 0}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid item xs={12} md={3}>
        <Card sx={{ height: '100%' }}>
          <CardContent>
            <Typography variant="h6" color="textSecondary">
              Chamadas
            </Typography>
            <Box display="flex" alignItems="center" mt={1}>
              <Phone sx={{ fontSize: 40, color: theme.palette.warning.main }} />
              <Typography variant="h4" sx={{ ml: 2 }}>
                {stats?.totalCalls || 0}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid item xs={12} md={3}>
        <Card sx={{ height: '100%' }}>
          <CardContent>
            <Typography variant="h6" color="textSecondary">
              Localizações
            </Typography>
            <Box display="flex" alignItems="center" mt={1}>
              <LocationOn sx={{ fontSize: 40, color: theme.palette.error.main }} />
              <Typography variant="h4" sx={{ ml: 2 }}>
                {stats?.totalLocations || 0}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid item xs={12}>
        <Card sx={{ height: 300 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Mensagens por Dia
            </Typography>
            <ResponsiveBar
              data={barData}
              keys={['sms']}
              indexBy="day"
              margin={{ top: 20, right: 30, bottom: 50, left: 60 }}
              padding={0.3}
              colors={theme.palette.primary.main}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
              }}
              labelSkipWidth={12}
              labelSkipHeight={12}
              labelTextColor="#fff"
              animate={true}
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default DataStats;
