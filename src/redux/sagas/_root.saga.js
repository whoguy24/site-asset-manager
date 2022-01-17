import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import equipmentSaga from './equipment.saga';
import navigationSaga from './navigation.saga';
import sitesSaga from './sites.saga';
import siteSaga from './site.saga';
import buildingSaga from './building.saga';
import systemSaga from './system.saga';
import activitySaga from './activity.saga';
import stepSaga from './step.saga';
import issueSaga from './issue.saga';
import ecmSaga from './ecm.saga';

export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    equipmentSaga(),
    navigationSaga(),
    sitesSaga(),
    siteSaga(),
    buildingSaga(),
    systemSaga(),
    activitySaga(),
    stepSaga(),
    issueSaga(),
    ecmSaga()
  ]);
}
