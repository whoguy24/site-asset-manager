import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchBuilding(action) {
    try {
      const response = yield axios({
        method: 'GET',
        url: `/api/building/${action.payload.id}`
      })
      yield put({
        type: 'LOAD_BUILDING',
        payload: response.data[0]
      })
    } catch(error) {
      console.error('ERROR:', error)
    }
  }

function* addBuilding(action) {
  try {
    yield axios({
      method: 'POST',
      url: '/api/building',
      data: action.payload
    })
  } catch (error) {
    console.log(error)
  }
}

function* deleteBuilding(action) {
  try {
    yield axios({
      method: 'DELETE',
      url: `/api/building/${action.payload.id}`
    })
    yield put({
      type: 'LOAD_BUILDING',
      payload: {}
    })
  } catch (error) {
    console.log(error)
  }}

  function* editBuilding(action) {
    try {
      yield axios({
        method: 'PUT',
        url: `/api/building/${action.payload.id}`,
        data: action.payload
      })
      yield put({
        type: 'LOAD_BUILDING',
        payload: response.data[0]
      })
    } catch (error) {
      console.log(error)
    }}

function* buildingSaga() {
  yield takeLatest('ADD_BUILDING', addBuilding);
  yield takeLatest('FETCH_BUILDING', fetchBuilding);
  yield takeLatest('DELETE_BUILDING', deleteBuilding);
  yield takeLatest('EDIT_BUILDING', editBuilding);
}

export default buildingSaga;