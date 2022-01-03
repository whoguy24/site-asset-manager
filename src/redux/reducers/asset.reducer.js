const assetReducer = (state = [], action) => {
    switch (action.type) {
      case 'LOAD_ASSETS':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default assetReducer;
  