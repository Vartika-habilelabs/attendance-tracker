import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { wageEntrySchema } from '../../constants';
import {
  Box,
  Card,
  CardContent,
  Button,
  Typography,
  Grid,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useDispatch, useSelector } from 'react-redux';
import { addTransaction } from '../../redux/transactionSlice';
import { updateMajdoorBalance, selectAllMajdoors } from '../../redux/majdoorSlice';
import { CustomAutocomplete, CustomTextField, CustomDatePicker } from '../common';

const WageEntryForm = () => {
  const dispatch = useDispatch();
  const majdoors = useSelector(selectAllMajdoors);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(wageEntrySchema),
    defaultValues: {
      majdoorId: '',
      date: new Date(),
      amount: '',
      note: '',
    },
  });

  const onSubmit = (data) => {
    const transaction = {
      majdoorId: data.majdoorId,
      type: 'earning',
      date: data.date,
      amount: parseFloat(data.amount),
      note: data.note,
    };

    dispatch(addTransaction(transaction));
    dispatch(updateMajdoorBalance({
      majdoorId: data.majdoorId,
      amount: parseFloat(data.amount),
      type: 'earning',
    }));

    reset({
      majdoorId: '',
      date: new Date(),
      amount: '',
      note: '',
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box>
        <Card>
          <CardContent>
            <Typography variant="h4" component="h1" gutterBottom align="center">
              Add Wage Entry
            </Typography>

            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
              <Grid sx={{ display: "flex", flexDirection: "column" }} container columns={12} columnSpacing={3} rowSpacing={3}>
                <Grid gridColumn="span 12">
                  <CustomAutocomplete
                    name="majdoorId"
                    control={control}
                    options={majdoors}
                    getOptionLabel={(option) => `${option.firstName} ${option.lastName} (ID: ${option.id.slice(0, 8)})`}
                    getOptionValue={(option) => option.id}
                    label="Select Majdoor"
                    error={errors.majdoorId}
                  />
                </Grid>
                <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
                  <CustomDatePicker
                    name="date"
                    control={control}
                    label="Date of Work"
                    error={errors.date}
                  />
                </Grid>
                <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
                  <CustomTextField
                    name="amount"
                    control={control}
                    label="Amount Earned (₹)"
                    type="number"
                    error={errors.amount}
                    inputProps={{
                      min: 0,
                      step: 0.01,
                    }}
                  />
                </Grid>
                <Grid gridColumn="span 12">
                  <CustomTextField
                    name="note"
                    control={control}
                    label="Note (Optional)"
                    multiline
                    rows={3}
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
                    {isSubmitting ? 'Adding...' : 'Add Wage Entry'}
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

export default WageEntryForm; 