import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchBuilding(action) {
    try {
      const response = yield axios({
        method: 'GET',
        url: '/api/building'
      })
      yield put({
        type: 'LOAD_BUILDING',
        payload: response.data
      })
    } catch(error) {
      console.error('ERROR:', error)
    }
  }

function* buildingSaga() {
  yield takeLatest('FETCH_BUILDING', fetchBuilding);
}

export default buildingSaga;
