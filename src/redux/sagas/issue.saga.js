import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

  function* editIssue(action) {
    console.log(action.payload);
    
    try {
      yield axios({
        method: 'PUT',
        url: `/api/issue/${action.payload.id}`,
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

  function* deleteIssue(action) {
    try {
      yield axios({
        method: 'Delete',
        url: `/api/issue/${action.payload.id}`,
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

  function* addAIssue(action) {
    try {
      yield axios({
        method: 'POST',
        url: '/api/issue',
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

function* issueSaga() {
  yield takeLatest('EDIT_ISSUE', editIssue);
  yield takeLatest('DELETE_ISSUE', deleteIssue);
    yield takeLatest('ADD_ISSUE', addIssue);
}

export default issueSaga;