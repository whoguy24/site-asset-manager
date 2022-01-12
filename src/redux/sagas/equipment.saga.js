import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchEquipment(action) {
    try {
      const response = yield axios({
        method: 'GET',
        url: `/api/equipment/${action.payload.id}`
      })
      yield put({
        type: 'LOAD_EQUIPMENT',
        payload: response.data[0]
      })
    } catch(error) {
      console.error('ERROR:', error)
    }
  }

//   function* updateEquipment(action) {
//     try {
//       console.log('In UpdateEquipment Saga');
//       console.log(action.payload);
      
//       yield axios({
//         method: 'PUT',
//         url: `/api/equipment/${action.payload.id}`,
//         data: action.payload
//       })
//       yield put({
//         type: 'LOAD_EQUIPMENT',
//         payload: action.payload
//       })
//     } catch(error) {
//       console.error('ERROR:', error)
//     }
//   }

//   function* deleteEquipment(action) {
//     try {
//       console.log('In DeleteEquipment Saga');
//       console.log(action.payload);
      
//       yield axios({
//         method: 'Delete',
//         url: `/api/equipment/${action.payload.id}`,
//         data: action.payload
//       })
//       yield put({
//         type: 'FETCH_NAVIGATION',
//         payload: 1
//       })
//     } catch(error) {
//       console.error('ERROR:', error)
//     }
//   }

  function* addEquipment(action) {
    try {
      yield axios({
        method: 'POST',
        url: '/api/equipment',
        data: action.payload
      })
    } catch (error) {
      console.log(error)
    }
  }

function* equipmentSaga() {
  yield takeLatest('FETCH_EQUIPMENT', fetchEquipment);
  // yield takeLatest('UPDATE_EQUIPMENT', updateEquipment);
  // yield takeLatest('DELETE_EQUIPMENT', deleteEquipment);
    yield takeLatest('ADD_EQUIPMENT', addEquipment);
}

export default equipmentSaga;