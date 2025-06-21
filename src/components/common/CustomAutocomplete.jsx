import React from 'react';
import { Controller } from 'react-hook-form';
import { Autocomplete, TextField } from '@mui/material';

const CustomAutocomplete = ({
  name,
  control,
  options,
  getOptionLabel,
  getOptionValue,
  label,
  error,
  ...props
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Autocomplete
          options={options}
          getOptionLabel={getOptionLabel}
          value={options.find(option => getOptionValue(option) === value) || null}
          onChange={(_, newValue) => onChange(newValue ? getOptionValue(newValue) : '')}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              error={!!error}
              helperText={error?.message}
              fullWidth
            />
          )}
          {...props}
        />
      )}
    />
  );
};

export default CustomAutocomplete;