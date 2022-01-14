const buildingReducer = (state = {}, action) => {
    switch (action.type) {
      case 'LOAD_BUILDING':
        return action.payload;
      case 'CLEAR_BUILDING':
          return {};
      default:
        return state;
    }
};
  
export default buildingReducer;
  