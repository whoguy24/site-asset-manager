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

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    equipmentSaga(),
    navigationSaga(),
    sitesSaga(),
    siteSaga(),
    buildingSaga(),
    systemSaga(),
    activitySaga()
  ]);
}
