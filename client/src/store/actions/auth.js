import * as actionTypes from "./actionTypes";

export const loginSuccess = user => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload: {
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      avatar: user.avatar
    }
  };
};

export const authError = error => {
  return {
    type: actionTypes.AUTH_ERROR,
    payload: {
      errorMessage: error
    }
  };
};
