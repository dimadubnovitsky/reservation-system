import { takeEvery, call, put } from 'redux-saga/effects';
import { api } from '../../../api';
import { notificationOpen } from '../../../components/Notification/notificationSlice';
import {
  createReservationFailure,
  createReservationSuccess,
  getReservationRequest,
} from '../reservationSlice';
import { getReservationsFromDay } from '../../../utils/getReservationsFromDay';
import { getReservationsFromTime } from '../../../utils/getReservationsFromTime';
import { getFreeTables } from '../../../utils/getFreeTables';
import { getNumberGuestsOnTables } from '../../../utils/getNumberGuestsOnTables';

function* workCreateReservationRequest({ payload }) {
  const { values, tables, userId, reservations, resolve, reject } = payload;
  const tableIds = getReservedTables(values, tables, reservations);

  try {
    yield call(api.reservations.post, { userId, tableIds, ...values });
    yield put(getReservationRequest());
    yield put(
      notificationOpen({
        type: 'success',
        message: 'Reservation completed successfully.',
      }),
    );
    yield put(createReservationSuccess());
    resolve();
  } catch (error) {
    yield put(
      notificationOpen({
        type: 'error',
        message: error?.message,
      }),
    );
    yield put(createReservationFailure());
    reject(error);
  }
}

function* createReservationSaga() {
  yield takeEvery(
    'reservation/createReservationRequest',
    workCreateReservationRequest,
  );
}

export default createReservationSaga;

// The function finds all free tables on the selected day and time.
// Places the selected number of guests at these tables
// (according to the maximum number of guests at a particular table).
// And returns IDs of the tables at which we seated the guests.
const getReservedTables = (values, tables, reservations) => {
  const { guests } = values;
  let count = guests;
  let iteration = 0;
  const newReservedTables = [];

  const guestsOnTables = getNumberGuestsOnTables(tables);
  const getSelectedDayReservations = getReservationsFromDay(
    reservations,
    values.day,
  );
  const selectedTimeReservations = getReservationsFromTime(
    getSelectedDayReservations,
    values.time,
  );
  const freeTables = getFreeTables(tables, selectedTimeReservations);

  if (guestsOnTables >= guests) {
    while (count > 0) {
      for (const table of freeTables) {
        let isReserved = newReservedTables.find(
          (reservedTable) => reservedTable === table.id,
        );

        if (!isReserved && table.guests - count - iteration <= 0) {
          newReservedTables.push(table.id);
          count -= table.guests;
        }
      }
      iteration++;
    }
  }
  return newReservedTables;
};
