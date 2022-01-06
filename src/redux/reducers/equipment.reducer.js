const equipmentReducer = (state = [], action) => {
    switch (action.type) {
      case 'LOAD_EQUIPMENT':
        return action.payload;
      default:
        return state;
    }
};
  
export default equipmentReducer;
  