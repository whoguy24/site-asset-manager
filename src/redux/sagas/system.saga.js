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
        payload: response.data
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
    yield put({
      type: 'FETCH_BUILDING',
      payload: {id: action.payload.building_id}
    })
    yield put({
      type: 'FETCH_NAVIGATION',
      payload: {table:'system',id:action.payload.id}
    })
  } catch (error) {
    console.log(error)
  }
}

  function* deleteSystem(action) {
    console.log(action.payload);
    
    try {
      yield axios({
        method: 'DELETE',
        url: `/api/system/${action.payload.id}`
      })
      yield put({
        type: 'LOAD_SYSTEM',
        payload: {}
      })
      yield put({
        type: 'FETCH_BUILDING',
        payload: {id: action.payload.building_id}
      })
      yield put({
        type: 'FETCH_NAVIGATION',
        payload: {table:'building',id:action.payload.building_id}
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
          payload: action.payload
        })
        yield put({
          type: 'FETCH_BUILDING',
          payload: {id: action.payload.building_id}
        })
        yield put({
          type: 'FETCH_NAVIGATION',
          payload: {table:'system',id:action.payload.id}
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