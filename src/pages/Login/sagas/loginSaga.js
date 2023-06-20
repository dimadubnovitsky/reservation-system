import { takeEvery, call, put, delay } from 'redux-saga/effects';
import { api } from '../../../api';
import { loginFailure, loginSuccess } from '../loginSlice';
import { notificationOpen } from '../../../components/Notification/notificationSlice';

function* workLoginRequest({ payload }) {
  const { values, resolve, reject } = payload;

  // Delay to simulate waiting for a response from the server.
  yield delay(1000);

  try {
    const { data: users } = yield call(api.users.get);
    // Check if there is a user with the same login and password in the database.
    const userRegistered = users.find(
      (user) =>
        user.login === values.login && user.password === values.password,
    );
    if (userRegistered) {
      localStorage.setItem('user', JSON.stringify(userRegistered));
      yield put(loginSuccess(userRegistered));
      resolve();
    } else {
      yield put(
        notificationOpen({
          type: 'error',
          message: 'Unable to log in with provided credentials.',
        }),
      );
      yield put(loginFailure());
      reject(new Error('Unable to log in with provided credentials.'));
    }
  } catch (error) {
    yield put(
      notificationOpen({
        type: 'error',
        message: error?.message,
      }),
    );
    yield put(loginFailure());
    reject(error);
  }
}

function* loginSaga() {
  yield takeEvery('login/loginRequest', workLoginRequest);
}

export default loginSaga;
