import { takeEvery, call, put } from 'redux-saga/effects';
import { api } from '../../../api';
import { notificationOpen } from '../../../components/Notification/notificationSlice';
import {
  getReservationFailure,
  getReservationSuccess,
} from '../reservationSlice';

function* workGetReservationRequest() {
  try {
    const { data } = yield call(api.reservations.get);
    yield put(getReservationSuccess(data));
  } catch (error) {
    yield put(
      notificationOpen({
        type: 'error',
        message: error?.message,
      }),
    );
    yield put(getReservationFailure());
  }
}

function* getReservationSaga() {
  yield takeEvery(
    'reservation/getReservationRequest',
    workGetReservationRequest,
  );
}

export default getReservationSaga;
