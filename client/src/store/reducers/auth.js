import * as actionTypes from "../actions/actionTypes";

const initialState = {
  name: "",
  email: "",
  mobile: "",
  avatar: "",
  isLoggedIn: false,
  loading: false,
  error: false,
  errorMessageArr: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.AUTH_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessageArr: action.payload.errorMessageArr
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        mobile: action.payload.mobile,
        avatar: action.payload.avatar,
        isLoggedIn: true,
        loading: false,
        error: false,
        errorMessageArr: []
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        ...initialState
      };
    default:
      return state;
  }
};

export default reducer;
