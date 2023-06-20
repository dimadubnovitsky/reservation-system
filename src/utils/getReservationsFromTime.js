import dayjs from 'dayjs';

// The function returns all reservations at a specific time.
export const getReservationsFromTime = (reservations, time) =>
  reservations.filter((reservation) => dayjs(reservation.time).isSame(time));
