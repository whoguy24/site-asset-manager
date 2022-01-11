import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchSites(action) {
    try {
      const response = yield axios({
        method: 'GET',
        url: '/api/site'
      })
      yield put({
        type: 'LOAD_SITES',
        payload: response.data
      })
    } catch(error) {
      console.error('ERROR:', error)
    }
  }

function* sitesSaga() {
  yield takeLatest('FETCH_SITES', fetchSites);
}

export default sitesSaga;