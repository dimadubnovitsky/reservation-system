import { DigitalClock, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useField } from 'formik';
import { useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { Typography } from '@mui/material';
import { getReservationsFromDay } from '../../../../utils/getReservationsFromDay';
import { getReservationsFromTime } from '../../../../utils/getReservationsFromTime';
import { getFreeTables } from '../../../../utils/getFreeTables';

const TimeField = ({
  isSubmitting,
  values,
  reservations,
  guestsOnTables,
  tables,
  ...props
}) => {
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;
  const { value } = field;
  const { touched, error } = meta;
  const isError = touched && !!error;
  const [selectedTime, setSelectedTime] = useState(null);
  const selectedDayReservations = useMemo(
    () => getReservationsFromDay(reservations, values.day),
    [reservations, values.day],
  );
  const onChange = (time) => {
    setSelectedTime(time);
    setValue(time);
  };
  const getUnavailableTime = (value) => {
    const selectedTimeReservations = getReservationsFromTime(
      selectedDayReservations,
      value,
    );
    const selectedTimeGuests = selectedTimeReservations.reduce(
      (acc, reservation) => acc + +reservation.guests,
      0,
    );
    const freeTables = getFreeTables(tables, selectedTimeReservations);
    if (selectedTimeGuests >= guestsOnTables || freeTables.length === 0) {
      return true;
    }
  };
  useEffect(() => {
    if (value) {
      setSelectedTime(value);
    }
  }, [value]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DigitalClock
        {...field}
        value={selectedTime}
        onChange={onChange}
        ampm={false}
        minTime={dayjs().hour(11)}
        maxTime={dayjs().hour(22)}
        timeStep={60}
        skipDisabled
        disablePast={dayjs()
          .hour(0)
          .minute(0)
          .second(0)
          .millisecond(0)
          .isSame(values.day)}
        shouldDisableTime={(value) => getUnavailableTime(value)}
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

export default TimeField;
