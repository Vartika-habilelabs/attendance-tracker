import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Button,
  Avatar,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { selectAllMajdoors } from '../../redux/majdoorSlice';
import { Person, TrendingUp, TrendingDown, AccountBalance } from '@mui/icons-material';

const MajdoorList = ({ onMajdoorSelect }) => {
  const majdoors = useSelector(selectAllMajdoors);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const getBalanceColor = (balance) => {
    if (balance > 0) return 'success';
    if (balance < 0) return 'error';
    return 'default';
  };

  if (majdoors.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6" color="text.secondary">
          No majdoors found. Add a new majdoor to get started.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Majdoor List
      </Typography>
      
      <Grid container columns={12} columnSpacing={3} rowSpacing={3}>
        {majdoors.map((majdoor) => (
          <Grid
            key={majdoor.id}
            gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}
          >
            <Card 
              sx={{ 
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                }
              }}
              onClick={() => onMajdoorSelect(majdoor)}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                    <Person />
                  </Avatar>
                  <Box>
                    <Typography variant="h6" component="h2">
                      {majdoor.firstName} {majdoor.lastName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      ID: {majdoor.id.slice(0, 8)}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Aadhar: {majdoor.aadharNumber}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    DOB: {new Date(majdoor.dateOfBirth).toLocaleDateString()}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="caption" color="text.secondary">
                      Total Earned
                    </Typography>
                    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', color: 'success.main' }}>
                      <TrendingUp sx={{ fontSize: 16, mr: 0.5 }} />
                      {formatCurrency(majdoor.totalEarned)}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="caption" color="text.secondary">
                      Total Taken
                    </Typography>
                    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', color: 'error.main' }}>
                      <TrendingDown sx={{ fontSize: 16, mr: 0.5 }} />
                      {formatCurrency(majdoor.totalTaken)}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Chip
                    icon={<AccountBalance />}
                    label={`Balance: ${formatCurrency(majdoor.netBalance)}`}
                    color={getBalanceColor(majdoor.netBalance)}
                    size="small"
                  />
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      onMajdoorSelect(majdoor);
                    }}
                  >
                    View Details
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MajdoorList; 