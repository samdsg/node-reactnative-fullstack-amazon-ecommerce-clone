import {
  AllDispatchProp,
  API_URI,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOG_LOADING,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  REG_LOADING,
  USER_LOADED,
} from './types';
import {returnErrors} from './errorAction';
import axios from 'axios';
import {CLEAR_ERRORS} from './dist/types';
import AsyncStorage from '@react-native-community/async-storage';

//** Amazon Register */
export const register = ({
  password,
  email,
  name,
}: {
  email: string;
  password: string;
  name: string;
}) => async (dispatch: AllDispatchProp) => {
  dispatch({type: REG_LOADING, payload: null});

  const data = JSON.stringify({email, password, name});

  await axios({
    method: 'POST',
    url: `${API_URI}/api/users`,
    data,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res: any) => {
      dispatch({type: CLEAR_ERRORS, payload: null});
      dispatch({type: REGISTER_SUCCESS, payload: res.data});
    })
    .catch((err: any) => {
      dispatch({type: REGISTER_FAIL, payload: null});
      dispatch(
        returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'),
      );
    });
};

//** Amazon Login */
export const login = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => async (dispatch: AllDispatchProp) => {
  dispatch({type: LOG_LOADING, payload: null});
  // Request data
  const data = JSON.stringify({email, password});

  await axios({
    method: 'POST',
    url: `${API_URI}/api/auth`,
    data,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res: any) => {
      dispatch({type: CLEAR_ERRORS, payload: null});
      dispatch({type: LOGIN_SUCCESS, payload: res.data});
    })
    .catch((err: any) => {
      dispatch({type: LOGIN_FAIL, payload: null});
      dispatch(
        returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'),
      );
    });
};

//** Amazon Load User */
export const loadUser = () => async (dispatch: AllDispatchProp) => {
  dispatch({type: LOG_LOADING, payload: null});

  const token = await AsyncStorage.getItem('@user_token');
  console.log(token, 'from load user');

  axios({
    method: 'GET',
    url: `${API_URI}/api/auth/user`,
    headers: {
      'Content-Type': 'application/json',
      'x-amazon-token': token,
    },
  })
    .then((res) => {
      dispatch({type: USER_LOADED, payload: res.data});
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, '', 'LOAD_FAIL'));
      dispatch({
        type: AUTH_ERROR,
        payload: null,
      });
    });
};

//** Amazon Logout */
export const logout = () => async (dispatch: AllDispatchProp) => {
  AsyncStorage.removeItem('@user_token');
  return dispatch({type: LOGOUT_SUCCESS, payload: null});
};
