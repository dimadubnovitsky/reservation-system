import { takeEvery, call, put, delay } from 'redux-saga/effects';
import { api } from '../../../api';
import { signupFailure, signupSuccess } from '../signupSlice';
import { notificationOpen } from '../../../components/Notification/notificationSlice';

function* workSignupRequest({ payload }) {
  const { values, resolve, reject } = payload;

  // Delay to simulate waiting for a response from the server.
  yield delay(1000);

  try {
    const { data: users } = yield call(api.users.get);
    // Check if there is a user with the same login in the database.
    const userRegistered = users.find((user) => user.login === values.login);
    if (!userRegistered) {
      yield call(api.users.post, values);
      yield put(
        notificationOpen({
          type: 'success',
          message: 'Registration completed successfully.',
        }),
      );
      yield put(signupSuccess());
      resolve();
    } else {
      yield put(
        notificationOpen({
          type: 'error',
          message: 'User with this login already exists.',
        }),
      );
      yield put(signupFailure());
      reject(new Error('User with this login already exists.'));
    }
  } catch (error) {
    yield put(
      notificationOpen({
        type: 'error',
        message: error?.message,
      }),
    );
    yield put(signupFailure());
    reject(error);
  }
}

function* signupSaga() {
  yield takeEvery('signup/signupRequest', workSignupRequest);
}

export default signupSaga;
