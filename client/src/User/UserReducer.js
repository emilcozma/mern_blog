import {
	LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  REGISTER_SUCCESS,
  REGISTER_FAIL
  } from "./UserActions";

const user = JSON.parse(localStorage.getItem('user'));

// Initial State
const initialState = (user && user.token)
  ? { isLoggedIn: true, user:user}
  : { isLoggedIn: false, user:null};

const UserReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false
      };
		case REGISTER_SUCCESS:
      return {
        ...state
      };
    case REGISTER_FAIL:
      return {
        ...state
      };
		default:
      return state;
	}
}

// Export Reducer
export default UserReducer;