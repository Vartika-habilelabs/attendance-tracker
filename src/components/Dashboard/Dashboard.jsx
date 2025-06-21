import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Avatar,
  Divider,
  Paper,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { selectMajdoorById } from '../../redux/majdoorSlice';
import { selectTransactionsByMajdoorId } from '../../redux/transactionSlice';
import { Person, TrendingUp, TrendingDown, AccountBalance, CalendarToday } from '@mui/icons-material';
import TransactionList from '../TransactionList/TransactionList';

const Dashboard = ({ majdoorId }) => {
  const majdoor = useSelector(state => selectMajdoorById(state, majdoorId));
  const transactions = useSelector(state => selectTransactionsByMajdoorId(state, majdoorId));

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

  if (!majdoor) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6" color="text.secondary">
          Majdoor not found.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      {/* Majdoor Info Card */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Avatar sx={{ mr: 3, width: 80, height: 80, bgcolor: 'primary.main' }}>
              <Person sx={{ fontSize: 40 }} />
            </Avatar>
            <Box>
              <Typography variant="h4" component="h1">
                {majdoor.firstName} {majdoor.lastName}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                ID: {majdoor.id}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <CalendarToday sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  DOB: {new Date(majdoor.dateOfBirth).toLocaleDateString()}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Aadhar: {majdoor.aadharNumber}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Financial Summary */}
          <Typography variant="h6" gutterBottom>
            Financial Summary
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Paper elevation={1} sx={{ p: 2, textAlign: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                  <TrendingUp color="success" sx={{ mr: 1 }} />
                  <Typography variant="h6" color="success.main">
                    {formatCurrency(majdoor.totalEarned)}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Total Earned
                </Typography>
              </Paper>
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <Paper elevation={1} sx={{ p: 2, textAlign: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                  <TrendingDown color="error" sx={{ mr: 1 }} />
                  <Typography variant="h6" color="error.main">
                    {formatCurrency(majdoor.totalTaken)}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Total Taken
                </Typography>
              </Paper>
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <Paper elevation={1} sx={{ p: 2, textAlign: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                  <AccountBalance color={getBalanceColor(majdoor.netBalance)} sx={{ mr: 1 }} />
                  <Typography 
                    variant="h6" 
                    color={getBalanceColor(majdoor.netBalance)}
                  >
                    {formatCurrency(majdoor.netBalance)}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Net Balance
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Chip
              icon={<AccountBalance />}
              label={`Current Balance: ${formatCurrency(majdoor.netBalance)}`}
              color={getBalanceColor(majdoor.netBalance)}
              size="large"
              variant="outlined"
            />
          </Box>
        </CardContent>
      </Card>

      {/* Transaction History */}
      <TransactionList majdoorId={majdoorId} />
    </Box>
  );
};

export default Dashboard; 