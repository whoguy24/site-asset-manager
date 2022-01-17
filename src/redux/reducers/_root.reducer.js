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

const rootReducer = combineReducers({
  errors,
  user,
  navigationReducer,
  sitesReducer,
  siteReducer,
  buildingReducer,
  systemReducer,
  equipmentReducer,
  tableReducer
});

export default rootReducer;
