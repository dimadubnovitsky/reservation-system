import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useField } from 'formik';
import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';

const DayField = ({ isSubmitting, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;
  const { value } = field;
  const { touched, error } = meta;
  const isError = touched && !!error;
  const [selectedDay, setSelectedDay] = useState(null);
  const onChange = (day) => {
    setSelectedDay(day);
    setValue(day);
  };
  useEffect(() => {
    if (value) {
      setSelectedDay(value);
    }
  }, [value]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDatePicker
        {...field}
        value={selectedDay}
        onChange={onChange}
        disablePast
        slots={{ actionBar: () => {} }}
        sx={{ border: isError ? '1px solid #d32f2f' : 'none' }}
        disabled={isSubmitting}
      />
      {isError && (
        <Typography align='center' color='error' pt={2}>
          {error}
        </Typography>
      )}
    </LocalizationProvider>
  );
};

export default DayField;
