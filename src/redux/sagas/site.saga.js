import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchSite(action) {
    try {
      const response = yield axios({
        method: 'GET',
        url: '/api/site'
      })
      yield put({
        type: 'LOAD_SITE',
        payload: response.data
      })
    } catch(error) {
      console.error('ERROR:', error)
    }
  }

function* siteSaga() {
  yield takeLatest('FETCH_SITE', fetchSite);
}

export default siteSaga;