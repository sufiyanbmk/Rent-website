import { Box, Paper } from '@mui/material';
import React from 'react';
import UserGraph from './userGraph';
import ProductGraph from './productGraph';
import { PieChart } from './pieChart';

function Charts() {
  return (
    <Box display="flex flex-row" p={10} gap={5} justifyContent="space-between">
      <Paper sx={{ width: '600px' }}>
        <UserGraph />
      </Paper>
      <Paper sx={{ width: '600px' }}>
        <ProductGraph />
      </Paper>
      <Paper sx={{ width: '600px' }}>
        <PieChart />
      </Paper>
    </Box>
  );
}

export default Charts;
