import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// function* fetchSite(action) {
//     try {
//       const response = yield axios({
//         method: 'GET',
//         url: `/api/site/${action.payload.id}`
//       })
//       yield put({
//         type: 'LOAD_SITE',
//         payload: response.data
//       })
//     } catch(error) {
//       console.error('ERROR:', error)
//     }
//   }

function* addBuilding(action) {
  try {
    yield axios({
      method: 'POST',
      url: '/api/building',
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

function* deleteBuilding(action) {
    console.log('In DeleteBuildingSaga');
    
    console.log(action.payload);
    
  try {
    yield axios({
      method: 'DELETE',
      url: `/api/building/${action.payload.id}`
    })
    yield put({
        type: 'FETCH_NAVIGATION',
        payload: {id: action.payload.site_id}
    })
  } catch (error) {
    console.log(error)
  }}

//   function* editSite(action) {
//     try {
//       yield axios({
//         method: 'PUT',
//         url: `/api/site/${action.payload}`,
//         data: action.payload
//       })
//       yield put({
//         type: 'FETCH_SITES'
//       })
//     } catch (error) {
//       console.log(error)
//     }}

function* buildingSaga() {
  yield takeLatest('ADD_BUILDING', addBuilding);
//   yield takeLatest('FETCH_SITE', fetchSite);
  yield takeLatest('DELETE_BUILDING', deleteBuilding);
//   yield takeLatest('EDIT_SITE', editSite);
}

export default buildingSaga;