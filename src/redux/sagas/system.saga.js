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

function* deleteSystem(action) {
    try {
      yield axios({
        method: 'DELETE',
        url: `/api/system/${action.payload}`
      })
    } catch (error) {
      console.log(error)
    }}

    function* editSystem(action) {
        try {
          yield axios({
            method: 'PUT',
            url: `/api/system/${action.payload.id}`,
            data: action.payload
          })
          yield put({
            type: 'LOAD_SYSTEM',
            payload: response.data[0]
          })
        } catch (error) {
          console.log(error)
        }}

function* systemSaga() {
  yield takeLatest('ADD_SYSTEM', addSystem);
  yield takeLatest('DELETE_SYSTEM', deleteSystem);
  yield takeLatest('FETCH_SYSTEM', fetchSystem);
  yield takeLatest('EDIT_SYSTEM', editSystem);
}

export default systemSaga;