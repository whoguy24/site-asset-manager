const equipmentReducer = (state = {}, action) => {
    switch (action.type) {
      case 'LOAD_EQUIPMENT':   
        return action.payload;
      case 'CLEAR_EQUIPMENT':
          return {};
      default:
        return state;
    }
};
  
export default equipmentReducer;