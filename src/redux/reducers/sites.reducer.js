const sitesReducer = (state = [], action) => {
    switch (action.type) {
      case 'LOAD_SITES':
        return action.payload;
      default:
        return state;
    }
};
  
export default sitesReducer;
  