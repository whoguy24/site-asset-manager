import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

  function* editECM(action) {
    console.log(action.payload);
    
    try {
      yield axios({
        method: 'PUT',
        url: `/api/ecm/${action.payload.id}`,
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

  function* deleteECM(action) {
    try {
      yield axios({
        method: 'Delete',
        url: `/api/ecm/${action.payload.id}`,
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

  function* addECM(action) {
    try {
      yield axios({
        method: 'POST',
        url: '/api/ecm',
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

function* ecmSaga() {
  yield takeLatest('EDIT_ECM', editECM);
  yield takeLatest('DELETE_ECM', deleteECM);
    yield takeLatest('ADD_ECM', addECM);
}

export default ecmSaga;