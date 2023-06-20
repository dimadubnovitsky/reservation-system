import { takeEvery, call, put } from 'redux-saga/effects';
import { api } from '../../../api';
import { notificationOpen } from '../../../components/Notification/notificationSlice';
import {
  deleteReservationFailure,
  deleteReservationSuccess,
  getReservationRequest,
} from '../reservationSlice';

function* workdeleteReservationRequest({ payload: id }) {
  try {
    yield call(api.reservations.delete, id);
    yield put(getReservationRequest());
    yield put(
      notificationOpen({
        type: 'success',
        message: 'Reservation canceled successfully.',
      }),
    );
    yield put(deleteReservationSuccess());
  } catch (error) {
    yield put(
      notificationOpen({
        type: 'error',
        message: error?.message,
      }),
    );
    yield put(deleteReservationFailure());
  }
}

function* deleteReservationSaga() {
  yield takeEvery(
    'reservation/deleteReservationRequest',
    workdeleteReservationRequest,
  );
}

export default deleteReservationSaga;
