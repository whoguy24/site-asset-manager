import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import navigationReducer from './navigation.reducer';
import sitesReducer from './sites.reducer';
import siteReducer from './site.reducer';
import buildingReducer from './building.reducer';
import systemReducer from './system.reducer';
import equipmentReducer from './equipment.reducer';
import tableReducer from './table.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  navigationReducer,
  sitesReducer,
  siteReducer,
  buildingReducer,
  systemReducer,
  equipmentReducer,
  tableReducer
});

export default rootReducer;
