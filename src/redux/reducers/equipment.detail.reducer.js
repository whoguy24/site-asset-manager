const equipmentDetailReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_EQUIPMENT_DETAIL':
        return action.payload;
      default:
        return state;
    }
};
  
export default equipmentDetailReducer;
  