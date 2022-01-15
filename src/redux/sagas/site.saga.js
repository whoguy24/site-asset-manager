import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchSite(action) {
    try {
      const response = yield axios({
        method: 'GET',
        url: `/api/site/${action.payload.id}`
      })
      yield put({
        type: 'LOAD_SITE',
        payload: response.data
      })
    } catch(error) {
      console.error('ERROR:', error)
    }
  }

function* addSite(action) {
  try {
    yield axios({
      method: 'POST',
      url: '/api/site',
      data: action.payload
    })
    yield put({
      type: 'FETCH_SITES'
    })
  } catch (error) {
    console.log(error)
  }
}

function* deleteSite(action) {
  try {
    yield axios({
      method: 'DELETE',
      url: `/api/site/${action.payload.id}`
    })
    yield put({
      type: 'FETCH_SITES'
    })
    yield put({
      type: 'LOAD_SITE',
      payload: {}
    })
    yield put({
      type: 'LOAD_BUILDING',
      payload: {}
    })
    yield put({
      type: 'LOAD_SYSTEM',
      payload: {}
    })
    yield put({
      type: 'LOAD_EQUIPMENT',
      payload: {}
    })
  } catch (error) {
    console.log(error)
  }}

  function* editSite(action) {
    try {
      yield axios({
        method: 'PUT',
        url: `/api/site/${action.payload}`,
        data: action.payload
      })
      yield put({
        type: 'FETCH_SITE',
        payload: action.payload
      })
      yield put({
        type: 'FETCH_SITES'
      })
      yield put({
        type: 'FETCH_NAVIGATION',
        payload: {table:'site',id:action.payload.id}
      })
    } catch (error) {
      console.log(error)
    }}

function* siteSaga() {
  yield takeLatest('ADD_SITE', addSite);
  yield takeLatest('FETCH_SITE', fetchSite);
  yield takeLatest('DELETE_SITE', deleteSite);
  yield takeLatest('EDIT_SITE', editSite);
}

export default siteSaga;