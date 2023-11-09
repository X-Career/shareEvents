import { combineReducers } from "redux";
import loginReducer from "./users/loginReducer"

const reducer = combineReducers({
    dataUser: loginReducer 
})

export default reducer