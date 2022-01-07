import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchEquipmentDetail(action) {
    console.log(action.payload);
    
    try {
      const response = yield axios({
        method: 'GET',
        url: `/api/equipment/${action.payload}`
      })
      yield put({
        type: 'SET_EQUIPMENT_DETAIL',
        payload: response.data
      })
    } catch(error) {
      console.error('ERROR:', error)
    }
  }

function* deleteEquipment(action) {
    try {
      yield axios({
        method: 'DELETE',
        url: `/api/equipment/${action.payload}`
      })
      yield put({
        type: 'FETCH_EQUIPMENT',
      })
    } catch(error) {
      console.error('ERROR:', error)
    }
  }

function* equipmentDetailSaga() {
  yield takeLatest('FETCH_EQUIPMENT_DETAIL', fetchEquipmentDetail);
  yield takeLatest('DELETE_EQUIPMENT', deleteEquipment);
}

export default equipmentDetailSaga;
