const siteReducer = (state = [], action) => {
    switch (action.type) {
      case 'LOAD_SITE':
        return action.payload;
      default:
        return state;
    }
};
  
export default siteReducer;
  