import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { lendingEntrySchema } from '../../constants';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useDispatch, useSelector } from 'react-redux';
import { addTransaction } from '../../redux/transactionSlice';
import { updateMajdoorBalance, selectAllMajdoors } from '../../redux/majdoorSlice';

const LendingEntryForm = () => {
  const dispatch = useDispatch();
  const majdoors = useSelector(selectAllMajdoors);
  
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(lendingEntrySchema),
    defaultValues: {
      majdoorId: '',
      date: new Date(),
      amount: '',
      reason: '',
    },
  });

  const onSubmit = (data) => {
    const transaction = {
      majdoorId: data.majdoorId,
      type: 'lending',
      date: data.date,
      amount: parseFloat(data.amount),
      reason: data.reason,
    };

    dispatch(addTransaction(transaction));
    dispatch(updateMajdoorBalance({
      majdoorId: data.majdoorId,
      amount: parseFloat(data.amount),
      type: 'lending',
    }));
    
    reset({
      majdoorId: '',
      date: new Date(),
      amount: '',
      reason: '',
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ maxWidth: 600, mx: 'auto', p: 2 }}>
        <Card>
          <CardContent>
            <Typography variant="h4" component="h1" gutterBottom align="center">
              Add Lending Entry
            </Typography>
            
            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
              <Grid container columns={12} columnSpacing={3} rowSpacing={3}>
                <Grid gridColumn="span 12">
                  <Controller
                    name="majdoorId"
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth error={!!errors.majdoorId}>
                        <InputLabel>Select Majdoor</InputLabel>
                        <Select {...field} label="Select Majdoor">
                          {majdoors.map((majdoor) => (
                            <MenuItem key={majdoor.id} value={majdoor.id}>
                              {majdoor.firstName} {majdoor.lastName} (ID: {majdoor.id.slice(0, 8)})
                            </MenuItem>
                          ))}
                        </Select>
                        {errors.majdoorId && (
                          <Typography variant="caption" color="error">
                            {errors.majdoorId.message}
                          </Typography>
                        )}
                      </FormControl>
                    )}
                  />
                </Grid>
                <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
                  <Controller
                    name="date"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        label="Date of Lending"
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            error: !!errors.date,
                            helperText: errors.date?.message,
                            variant: 'outlined',
                          },
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
                  <Controller
                    name="amount"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Amount Taken (₹)"
                        type="number"
                        error={!!errors.amount}
                        helperText={errors.amount?.message}
                        variant="outlined"
                        inputProps={{
                          min: 0,
                          step: 0.01,
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid gridColumn="span 12">
                  <Controller
                    name="reason"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Reason (Optional)"
                        multiline
                        rows={3}
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
                <Grid gridColumn="span 12">
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={isSubmitting || majdoors.length === 0}
                    sx={{ mt: 2 }}
                  >
                    {isSubmitting ? 'Adding...' : 'Add Lending Entry'}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </LocalizationProvider>
  );
};

export default LendingEntryForm; 