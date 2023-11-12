const initialState = {
  loggedIn: false,
  userName: "",
  image:"",
  role: "",
  fullName: "",
  accessToken:"",
  dataUser: {}
};

const loginReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { loggedIn: true, userName: action.payload.userName, image: action.payload.image, accessToken: action.payload.accessToken, role: action.payload.role, fullName: action.payload.fullName, dataUser: action.payload};
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
};

export default loginReducer;
