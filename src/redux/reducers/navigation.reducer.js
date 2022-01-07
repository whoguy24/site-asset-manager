const navigationReducer = (state = [], action) => {
    switch (action.type) {
      case 'LOAD_NAVIGATION':
        return action.payload;
      default:
        return state;
    }
};
  
export default navigationReducer;
  