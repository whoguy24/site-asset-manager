const systemReducer = (state = {}, action) => {
    switch (action.type) {
      case 'LOAD_SYSTEM':
        return action.payload;
      case 'CLEAR_SYSTEM':
          return {};
      default:
        return state;
    }
};
  
export default systemReducer;
  