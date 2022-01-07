import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchEquipment(action) {
    try {
      const response = yield axios({
        method: 'GET',
        url: `/api/equipment/${action.payload}`
      })
      yield put({
        type: 'LOAD_EQUIPMENT',
        payload: response.data
      })
    } catch(error) {
      console.error('ERROR:', error)
    }
}

function* equipmentSaga() {
  yield takeLatest('FETCH_EQUIPMENT', fetchEquipment);
}

export default equipmentSaga;