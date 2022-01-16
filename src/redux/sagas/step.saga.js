import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

  function* editStep(action) {
    console.log(action.payload);
    try {
      yield axios({
        method: 'PUT',
        url: `/api/step/${action.payload.id}`,
        data: action.payload
      })
      yield put({
        type: 'FETCH_EQUIPMENT',
        payload: {id: action.payload.equipment_id}
      })
    } catch(error) {
      console.error('ERROR:', error)
    }
  }

  function* deleteStep(action) {
    try {
      yield axios({
        method: 'Delete',
        url: `/api/step/${action.payload.id}`,
        data: action.payload
      })
      yield put({
        type: 'FETCH_EQUIPMENT',
        payload: {id: action.payload.equipment_id}
      })
    } catch(error) {
      console.error('ERROR:', error)
    }
  }

  function* addStep(action) {
    try {
      yield axios({
        method: 'POST',
        url: '/api/step',
        data: action.payload
      })
      yield put({
        type: 'FETCH_EQUIPMENT',
        payload: {id: action.payload.equipment_id}
      })
    } catch (error) {
      console.log(error)
    }
  }

function* stepSaga() {
  yield takeLatest('EDIT_STEP', editStep);
  yield takeLatest('DELETE_STEP', deleteStep);
    yield takeLatest('ADD_STEP', addStep);
}

export default stepSaga;