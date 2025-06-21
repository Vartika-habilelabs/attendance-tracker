import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { majdoorFormSchema } from '../../constants';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Grid,
  Alert,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useDispatch } from 'react-redux';
import { addMajdoor } from '../../redux/majdoorSlice';

const MajdoorForm = () => {
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(majdoorFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      dateOfBirth: null,
      aadharNumber: '',
    },
  });

  const onSubmit = (data) => {
    dispatch(addMajdoor(data));
    reset();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ maxWidth: 600, mx: 'auto', p: 2 }}>
        <Card>
          <CardContent>
            <Typography variant="h4" component="h1" gutterBottom align="center">
              Add New Majdoor
            </Typography>
            
            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
              <Grid container columns={12} columnSpacing={3} rowSpacing={3}>
                <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
                  <Controller
                    name="firstName"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="First Name"
                        error={!!errors.firstName}
                        helperText={errors.firstName?.message}
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
                <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
                  <Controller
                    name="lastName"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Last Name"
                        error={!!errors.lastName}
                        helperText={errors.lastName?.message}
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
                <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
                  <Controller
                    name="dateOfBirth"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        label="Date of Birth"
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            error: !!errors.dateOfBirth,
                            helperText: errors.dateOfBirth?.message,
                            variant: 'outlined',
                          },
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
                  <Controller
                    name="aadharNumber"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Aadhar Number"
                        error={!!errors.aadharNumber}
                        helperText={errors.aadharNumber?.message}
                        variant="outlined"
                        inputProps={{
                          maxLength: 12,
                          pattern: '[0-9]*',
                        }}
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
                    disabled={isSubmitting}
                    sx={{ mt: 2 }}
                  >
                    {isSubmitting ? 'Adding...' : 'Add Majdoor'}
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

export default MajdoorForm; 