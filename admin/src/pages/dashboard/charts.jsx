import { Box, Paper } from '@mui/material';
import React from 'react';
import UserGraph from './userGraph';
import ProductGraph from './productGraph';
import { PieChart } from './pieChart';

function Charts() {
  return (
    <Box
      display="flex"
      flexWrap="wrap"
      p={10}
      gap={5}
      justifyContent="space-between"
    >
      <Paper sx={{ width: { xs: '100%', sm: 'calc(50% - 20px)' } }}>
        <UserGraph />
      </Paper>
      <Paper sx={{ width: { xs: '100%', sm: 'calc(50% - 20px)' } }}>
        <ProductGraph />
      </Paper>
      <Paper sx={{ width: { xs: '100%', sm: 'calc(50% - 20px)' } }}>
        <PieChart />
      </Paper>
    </Box>
  );
}

export default Charts;
