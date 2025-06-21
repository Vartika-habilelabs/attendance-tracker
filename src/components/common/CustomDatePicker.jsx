import React from 'react';
import { Controller } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const CustomDatePicker = ({
  name,
  control,
  label,
  error,
  ...props
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <DatePicker
          {...field}
          label={label}
          slotProps={{
            textField: {
              fullWidth: true,
              error: !!error,
              helperText: error?.message,
              variant: 'outlined',
            },
          }}
          {...props}
        />
      )}
    />
  );
};

export default CustomDatePicker;