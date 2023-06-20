import { useField } from 'formik';
import { TextField, Typography } from '@mui/material';
import { useMemo } from 'react';
import { getReservationsFromDay } from '../../../../utils/getReservationsFromDay';
import { getReservationsFromTime } from '../../../../utils/getReservationsFromTime';
import { CustomInput } from '../../../../components/CustomInput';

const getMaxGuests = (selectedTimeReservations, guestsOnTables) =>
  guestsOnTables -
  selectedTimeReservations.reduce(
    (acc, reservation) => acc + +reservation.guests,
    0,
  );

const NumberGuestsField = ({
  isSubmitting,
  values,
  reservations,
  guestsOnTables,
  ...props
}) => {
  const [field, meta] = useField(props);
  const { touched, error } = meta;
  const isError = touched && !!error;
  const selectedDayReservations = useMemo(
    () => getReservationsFromDay(reservations, values.day),
    [values.day],
  );
  const selectedTimeReservations = useMemo(
    () => getReservationsFromTime(selectedDayReservations, values.time),
    [selectedDayReservations, values.time],
  );
  const maxGuests = useMemo(
    () => getMaxGuests(selectedTimeReservations, guestsOnTables),
    [selectedTimeReservations, guestsOnTables],
  );

  return (
    <>
      <Typography sx={{ pb: 2 }}>
        Maximum number of guests: {maxGuests}
      </Typography>
      <TextField
        label='Guests'
        error={isError}
        helperText={isError && error}
        {...field}
        variant='outlined'
        margin='normal'
        InputProps={{
          inputComponent: CustomInput,
          inputProps: {
            type: 'number',
            disableZero: true,
            numberLimit: maxGuests,
          },
        }}
        disabled={isSubmitting}
      />
    </>
  );
};

export default NumberGuestsField;
