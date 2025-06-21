import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { majdoorFormSchema } from '../../constants';
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
import { useDispatch } from 'react-redux';
import { addMajdoor } from '../../redux/majdoorSlice';
import { CustomTextField, CustomDatePicker } from '../common';

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
      <Box sx={{ maxWidth: 600, p: 2 }}>
        <Card>
          <CardContent>
            <Typography variant="h4" component="h1" gutterBottom align="center">
              Add New Majdoor
            </Typography>

            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
              <Grid sx={{ display: "flex", flexDirection: "column" }} container columns={12} columnSpacing={3} rowSpacing={3}>
                <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
                  <CustomTextField
                    name="firstName"
                    control={control}
                    label="First Name"
                    error={errors.firstName}
                  />
                </Grid>
                <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
                  <CustomTextField
                    name="lastName"
                    control={control}
                    label="Last Name"
                    error={errors.lastName}
                  />
                </Grid>
                <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
                  <CustomDatePicker
                    name="dateOfBirth"
                    control={control}
                    label="Date of Birth"
                    error={errors.dateOfBirth}
                  />
                </Grid>
                <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
                  <CustomTextField
                    name="aadharNumber"
                    control={control}
                    label="Aadhar Number"
                    error={errors.aadharNumber}
                    inputProps={{
                      maxLength: 12,
                      pattern: '[0-9]*',
                    }}
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