import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Divider,
  Paper,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { selectTransactionsByMajdoorId } from '../../redux/transactionSlice';
import { TrendingUp, TrendingDown, CalendarToday } from '@mui/icons-material';

const TransactionList = ({ majdoorId }) => {
  const transactions = useSelector(state => selectTransactionsByMajdoorId(state, majdoorId));

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getTransactionIcon = (type) => {
    return type === 'earning' ? (
      <TrendingUp color="success" />
    ) : (
      <TrendingDown color="error" />
    );
  };

  const getTransactionColor = (type) => {
    return type === 'earning' ? 'success' : 'error';
  };

  if (transactions.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6" color="text.secondary">
          No transactions found for this majdoor.
        </Typography>
      </Box>
    );
  }

  // Sort transactions by date (newest first)
  const sortedTransactions = [...transactions].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Transaction History
      </Typography>
      
      <Paper elevation={1}>
        <List>
          {sortedTransactions.map((transaction, index) => (
            <React.Fragment key={transaction.id}>
              <ListItem>
                <ListItemIcon>
                  {getTransactionIcon(transaction.type)}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body1" component="span">
                        {transaction.type === 'earning' ? 'Wage Earned' : 'Amount Taken'}
                      </Typography>
                      <Chip
                        label={formatCurrency(transaction.amount)}
                        color={getTransactionColor(transaction.type)}
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                  }
                  secondary={
                    <Box sx={{ mt: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                        <CalendarToday sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {formatDate(transaction.date)}
                        </Typography>
                      </Box>
                      {(transaction.note || transaction.reason) && (
                        <Typography variant="body2" color="text.secondary">
                          {transaction.note || transaction.reason}
                        </Typography>
                      )}
                    </Box>
                  }
                />
              </ListItem>
              {index < sortedTransactions.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default TransactionList; 