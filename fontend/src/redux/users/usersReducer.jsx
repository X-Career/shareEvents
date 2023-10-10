const initialState = {
    loggedIn: false,
    userName: ''
  };
  
  const usersReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return { ...state, loggedIn: true, userName: action.payload.userName };
      default:
        return state;
    }
  };
  
  export default usersReducer;