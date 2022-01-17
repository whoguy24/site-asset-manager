import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

  function* editActivity(action) {
    try {
      yield axios({
        method: 'PUT',
        url: `/api/activity/${action.payload.id}`,
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

  function* deleteActivity(action) {
    try {
      yield axios({
        method: 'Delete',
        url: `/api/activity/${action.payload.id}`,
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

  function* addActivity(action) {
    try {
      yield axios({
        method: 'POST',
        url: '/api/activity',
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

function* activitySaga() {
  yield takeLatest('EDIT_ACTIVITY', editActivity);
  yield takeLatest('DELETE_ACTIVITY', deleteActivity);
    yield takeLatest('ADD_ACTIVITY', addActivity);
}

export default activitySaga;