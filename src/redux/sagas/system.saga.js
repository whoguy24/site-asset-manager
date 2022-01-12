import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchSystem(action) {
    try {
      const response = yield axios({
        method: 'GET',
        url: `/api/system/${action.payload.id}`
      })
      yield put({
        type: 'LOAD_SYSTEM',
        payload: response.data[0]
      })
    } catch(error) {
      console.error('ERROR:', error)
    }
  }

function* addSystem(action) {
  try {
    yield axios({
      method: 'POST',
      url: '/api/system',
      data: action.payload
    })
  } catch (error) {
    console.log(error)
  }
}

function* systemSaga() {
  yield takeLatest('ADD_SYSTEM', addSystem);
  yield takeLatest('FETCH_SYSTEM', fetchSystem);
}

export default systemSaga;