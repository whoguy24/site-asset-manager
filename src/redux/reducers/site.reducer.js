const siteReducer = (state = {}, action) => {
    switch (action.type) {
      case 'LOAD_SITE':
        return action.payload;
      case 'CLEAR_SITE':
        return {};
      default:
        return state;
    }
};
  
export default siteReducer;
  