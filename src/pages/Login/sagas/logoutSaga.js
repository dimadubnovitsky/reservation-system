import { takeEvery, put } from 'redux-saga/effects';
import { logoutFailure, logoutSuccess } from '../loginSlice';

function* workLogoutRequest() {
  try {
    localStorage.removeItem('user');
    yield put(logoutSuccess());
  } catch (error) {
    yield put(logoutFailure());
  }
}

function* logoutSaga() {
  yield takeEvery('login/logoutRequest', workLogoutRequest);
}

export default logoutSaga;
