import { takeEvery, call, put } from 'redux-saga/effects';
import { api } from '../../../api';
import { notificationOpen } from '../../../components/Notification/notificationSlice';
import { getTablesFailure, getTablesSuccess } from '../tablesSlice';

function* workGetTablesRequest() {
  try {
    const { data } = yield call(api.tables.get);
    yield put(getTablesSuccess(data));
  } catch (error) {
    yield put(
      notificationOpen({
        type: 'error',
        message: error?.message,
      }),
    );
    yield put(getTablesFailure());
  }
}

function* getTablesSaga() {
  yield takeEvery('tables/getTablesRequest', workGetTablesRequest);
}

export default getTablesSaga;
