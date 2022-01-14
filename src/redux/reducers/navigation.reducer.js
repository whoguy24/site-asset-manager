const navigationReducer = (state = [], action) => {
    switch (action.type) {
      case 'LOAD_NAVIGATION':
        return action.payload;
      case 'CLEAR_NAVIGATION':
        return [];
      default:
        return state;
    }
};
  
export default navigationReducer;
  