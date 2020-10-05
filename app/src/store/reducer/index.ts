import {combineReducers} from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import productReducer from './productReducer';

export default combineReducers({
  error: errorReducer,
  product: productReducer,
  auth: authReducer,
});
