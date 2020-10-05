import {LOGOUT_SUCCESS} from '../actions/dist/types';
import {
  ActionProps,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  REG_LOADING,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOG_LOADING,
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
} from '../actions/types';

const initialState = {
  regLoading: false,
  logLoading: false,
  isAuthenticated: null,
  user: null,
};

export default (state = initialState, {type, payload}: ActionProps) => {
  switch (type) {
    case REG_LOADING:
      return {
        ...state,
        regLoading: true,
      };
    case LOG_LOADING:
      return {
        ...state,
        logLoading: true,
      };
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        regLoading: false,
        isAuthenticated: true,
        isLoading: false,
      };
    case LOGOUT_SUCCESS:
    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case AUTH_ERROR:
      return {
        ...state,
        regLoading: false,
        user: null,
        isAuthenticated: null,
        logLoading: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        logLoading: false,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        user: payload,
        logLoading: false,
      };
    default:
      return state;
  }
};
