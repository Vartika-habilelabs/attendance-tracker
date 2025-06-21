import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Autocomplete, TextField, Box, Typography, Paper } from '@mui/material';
import { selectAllMajdoors } from '../redux/majdoorSlice';
import Dashboard from '../components/Dashboard/Dashboard';

const DashboardPage = () => {
  const majdoors = useSelector(selectAllMajdoors);
  const [selectedMajdoor, setSelectedMajdoor] = useState(null);

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Search Majdoor
        </Typography>
        <Autocomplete
          options={majdoors}
          getOptionLabel={(option) => `${option.firstName} ${option.lastName} (Aadhar: ${option.aadharNumber})`}
          renderInput={(params) => <TextField {...params} label="Type to search..." variant="outlined" />}
          onChange={(_, value) => setSelectedMajdoor(value)}
          isOptionEqualToValue={(option, value) => option.id === value.id}
        />
      </Paper>
      {selectedMajdoor ? (
        <Dashboard majdoorId={selectedMajdoor.id} />
      ) : (
        <Typography variant="body1" color="text.secondary" align="center">
          Select a majdoor to view their account summary and transactions.
        </Typography>
      )}
    </Box>
  );
};

export default DashboardPage; 