import callApi from '../util/apiCaller';

// React Notification
import { NotificationManager } from 'react-notifications';

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT = "LOGOUT";

export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";

// Export Actions
export function loginSuccess() {
  return {
    type: LOGIN_SUCCESS
  };
}

export function loginFail() {
  return {
    type: LOGIN_FAIL
  };
}

export function logout() {
  return {
    type: LOGOUT
  };
}

export function registerFail() {
  return {
    type: REGISTER_FAIL
  };
}

export function registerSuccess() {
  return {
    type: REGISTER_SUCCESS
  };
}

export const loginRequest = (username, password) => (dispatch) => {
  return callApi('users/login', 'post', {
    user: {
      email: username,
      password: password
    },
  }).then((data) => {
      if(data.token) {
        localStorage.setItem("user", JSON.stringify({token:data.token}));
        dispatch(loginSuccess);
      } else {
				let message = data.errors.map(function(err){
					const errData = Object.entries(err);
					return errData[0][1] + "\n";
				});
        dispatch(loginFail);
				NotificationManager.error(message, 'Login failed');
      }
      return data;
    },
    (error) => {   
      dispatch(loginFail);
      return error;
    }
  );
};

export const logoutRequest = () => (dispatch) => {
  return callApi('users/logout', 'get').then((data) => {
    localStorage.removeItem("user");
    dispatch(logout);
    return data;
  }, (error) => {
    localStorage.removeItem("user");
    dispatch(logout);
    return error;
  });
};


export const registerRequest = (username, name, password) => (dispatch) => {
  return callApi('users/register', 'post', {
		user: {
      email: username,
			name: name,
      password: password
    },
	}).then((data) => {
    if(data.errors) {
      let message = data.errors.map(function(err){
        const errData = Object.entries(err);
        return errData[0][1] + "\n";
      });
      dispatch(registerFail);
      NotificationManager.error(message, 'Register failed');
    } else {
      dispatch(registerSuccess);
      NotificationManager.success('Account created successfully.');
    }
    return data;
  }, (error) => {
    return error;
  });
};

export const getUserRequest = (loadToLocalStorage = false) => (dispatch) => {
  return callApi('users/info', 'get').then((data) => {
		if(loadToLocalStorage){
			const user = JSON.parse(localStorage.getItem('user'));
			localStorage.setItem("user", JSON.stringify({token:user.token, data:data.user}));
		}
    return data;
  }, (error) => {
    return error;
  });
};