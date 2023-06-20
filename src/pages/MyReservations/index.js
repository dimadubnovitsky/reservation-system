import { Box, Grid, Typography } from '@mui/material';
import ReservationsTable from './components/MyReservationsTable';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getReservationRequest,
  deleteReservationRequest,
} from '../Reservation/reservationSlice';
import LoadingIndicator from '../../components/LoadingIndicator';
import * as React from 'react';

const MyReservations = () => {
  const dispatch = useDispatch();
  const { reservations, isLoading } = useSelector((state) => state.reservation);
  const userId = useSelector((state) => state.login.user.id);
  const onCancel = (id) => {
    dispatch(deleteReservationRequest(id));
  };
  useEffect(() => {
    dispatch(getReservationRequest());
  }, []);

  return (
    <Box padding={2}>
      <Grid container spacing={4} direction='column'>
        <Grid item>
          <Typography variant='h5'>My Reservations</Typography>
        </Grid>
        <Grid item sx={{ position: 'relative' }}>
          <ReservationsTable
            reservations={reservations}
            onCancel={onCancel}
            userId={userId}
          />
          {isLoading && <LoadingIndicator />}
        </Grid>
      </Grid>
    </Box>
  );
};

export default MyReservations;
