const initialState = {
  loggedIn: false,
  userName: "",
  image:"",
  role: "",
  accessToken:"",
  dataUser: {}
};

const loginReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, loggedIn: true, userName: action.payload.userName, role: action.payload.role , image: action.payload.image, accessToken: action.payload.accessToken, dataUser: action.payload};
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
};

export default loginReducer;
