import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchSystem(action) {
    try {
      const response = yield axios({
        method: 'GET',
        url: '/api/system'
      })
      yield put({
        type: 'LOAD_SYSTEM',
        payload: response.data
      })
    } catch(error) {
      console.error('ERROR:', error)
    }
  }

function* systemSaga() {
  yield takeLatest('FETCH_SYSTEM', fetchSystem);
}

export default systemSaga;
