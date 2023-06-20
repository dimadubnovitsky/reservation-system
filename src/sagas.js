import { all } from 'redux-saga/effects';
import loginSaga from './pages/Login/sagas/loginSaga';
import signupSaga from './pages/Singup/sagas/signupSaga';
import logoutSaga from './pages/Login/sagas/logoutSaga';
import createReservationSaga from './pages/Reservation/sagas/createReservationSaga';
import getReservationSaga from './pages/Reservation/sagas/getReservationSaga';
import deleteReservationSaga from './pages/Reservation/sagas/deleteReservationSaga';
import getTablesSaga from './pages/Reservation/sagas/getTablesSaga';

export default function* rootSaga() {
  yield all([
    loginSaga(),
    signupSaga(),
    logoutSaga(),
    createReservationSaga(),
    getReservationSaga(),
    deleteReservationSaga(),
    getTablesSaga(),
  ]);
}
