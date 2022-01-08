import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchNavigation(action) {
    try {
      const response = yield axios({
        method: 'GET',
        url: `/api/navigation/${action.payload}`
      })
      yield put({
        type: 'LOAD_NAVIGATION',
        payload: response.data
      })
    } catch(error) {
      console.error('ERROR:', error)
    }
  }

function* navigationSaga() {
  yield takeLatest('FETCH_NAVIGATION', fetchNavigation);
}

export default navigationSaga;
