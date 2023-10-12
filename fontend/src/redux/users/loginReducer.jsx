const initialState = {
  loggedIn: false,
  userName: "",
  image:"",
};

const loginReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, loggedIn: true, userName: action.payload.userName };
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
};

export default loginReducer;
