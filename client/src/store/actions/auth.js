import * as actionTypes from "./actionTypes";

export const authSuccess = data => {
  const { user, type } = data;
  return {
    type,
    payload: {
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      avatar: user.avatar
    }
  };
};
export const authInit = data => {
  const { user, type } = data;
  let url;
  if (type === "Login") {
    url = "/api/users/login";
  } else if (type === "Register") {
    url = "/api/users/register";
  }
  return dispatch => {
    dispatch({ type: actionTypes.AUTH_START });
    return fetch(url, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(response => {
        if (!response.success) {
          return dispatch(authError(response.messages));
        }
        localStorage.setItem("token", response.token);
        return dispatch(getUser());
      })
      .catch(err => {
        return dispatch(authError([err]));
      });
  };
};
export const getUser = () => {
  return dispatch => {
    return fetch("/api/users/current", {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(user => {
        return dispatch(authSuccess({ user, type: actionTypes.LOGIN_SUCCESS }));
      })
      .catch(err => {
        localStorage.removeItem("token");
        return dispatch(authError([err]));
      });
  };
};
export const authError = errorMessageArr => {
  return {
    type: actionTypes.AUTH_ERROR,
    payload: {
      errorMessageArr
    }
  };
};
