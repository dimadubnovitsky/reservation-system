import dayjs from 'dayjs';

// The function returns all reservations on a specific day.
export const getReservationsFromDay = (reservations, day) =>
  reservations.filter((reservation) => dayjs(reservation.day).isSame(day));
