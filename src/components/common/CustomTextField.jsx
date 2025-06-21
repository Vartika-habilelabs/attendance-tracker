import React from 'react';
import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

const CustomTextField = ({
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
        <TextField
          {...field}
          label={label}
          error={!!error}
          helperText={error?.message}
          fullWidth
          variant="outlined"
          {...props}
        />
      )}
    />
  );
};

export default CustomTextField;