import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchAssets(action) {
    try {
      const response = yield axios({
        method: 'GET',
        url: '/api/asset'
      })
      yield put({
        type: 'LOAD_ASSETS',
        payload: response.data
      })
    } catch(error) {
      console.error('ERROR:', error)
    }
  }

function* assetSaga() {
  yield takeLatest('FETCH_ASSETS', fetchAssets);
}

export default assetSaga;
