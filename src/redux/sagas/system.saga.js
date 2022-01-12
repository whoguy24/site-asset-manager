import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* addSystem(action) {
  try {
    yield axios({
      method: 'POST',
      url: '/api/system',
      data: action.payload
    })
    yield put({
      type: 'FETCH_NAVIGATION',
      payload: {id: action.payload.site_id}
    })
  } catch (error) {
    console.log(error)
  }
}

function* siteSaga() {
  yield takeLatest('ADD_SYSTEM', addSystem);
}

export default siteSaga;