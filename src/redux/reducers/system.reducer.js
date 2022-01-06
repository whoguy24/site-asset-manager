const systemReducer = (state = [], action) => {
    switch (action.type) {
      case 'LOAD_SYSTEM':
        return action.payload;
      default:
        return state;
    }
};
  
export default systemReducer;
  