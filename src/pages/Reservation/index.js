import { Box, Grid, Typography } from '@mui/material';
import ReservationForm from './components/ReservationForm';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReservationRequest } from './reservationSlice';
import { getTablesRequest } from './tablesSlice';
import LoadingIndicator from '../../components/LoadingIndicator';

const Reservation = () => {
  const dispatch = useDispatch();
  const { reservations, isLoading: isLoadingReservations } = useSelector(
    (state) => state.reservation,
  );
  const { tables, isLoading: isLoadingTables } = useSelector(
    (state) => state.tables,
  );
  useEffect(() => {
    dispatch(getReservationRequest());
    dispatch(getTablesRequest());
  }, []);

  return (
    <Box padding={2}>
      <Grid container spacing={4} direction='column'>
        <Grid item>
          <Typography variant='h5'>Reservation</Typography>
        </Grid>
        <Grid item sx={{ position: 'relative' }}>
          <ReservationForm reservations={reservations} tables={tables} />
          {(isLoadingReservations || isLoadingTables) && <LoadingIndicator />}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Reservation;
