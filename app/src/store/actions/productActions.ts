import {returnErrors} from './errorAction';
import AsyncStorage from '@react-native-community/async-storage';
import {
  ADD_TO_CART,
  AllDispatchProp,
  API_URI,
  CHECK_OUT,
  CLEAR_ERRORS,
  DELETE_PRODUCT,
  LOADED_PRODUCTS,
  LOADING_PRODUCTS,
  SENT_PRODUCT,
} from './types';
import axios from 'axios';

//** Amazon Add Product */
export const addProduct = ({
  title,
  price,
  imageUrl,
  desc,
}: {
  title: string;
  price: string;
  imageUrl: string;
  desc: string;
}) => async (dispatch: AllDispatchProp, getState: any) => {
  const auth = getState().auth;
  const data = JSON.stringify({title, price, imageUrl, desc, user: auth.user});
  const token = AsyncStorage.getItem('@user_token');

  axios({
    method: 'POST',
    url: `${API_URI}/api/product`,
    data,
    headers: {
      'Content-Type': 'application/json',
      'x-amazon-token': token,
    },
  })
    .then((res: any) => {
      dispatch({type: CLEAR_ERRORS, payload: null});
      dispatch({type: SENT_PRODUCT, payload: res.data._doc});
    })
    .catch((err: any) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          'PRODUCT_POST_FAIL',
        ),
      );
    });
};

//** Amazon LoadProducts */
export const loadProducts = () => async (dispatch: AllDispatchProp) => {
  dispatch({type: LOADING_PRODUCTS, payload: null});
  const token = await AsyncStorage.getItem('@user_token');
  console.log(token);

  axios({
    method: 'GET',
    url: `${API_URI}/api/product`,
    headers: {
      'Content-Type': 'application/json',
      'x-amazon-token': token,
    },
  })
    .then((res) => {
      dispatch({type: LOADED_PRODUCTS, payload: res.data});
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, '', 'LOAD_PRODUCT_FAIL'));
    });
};

//** Amazon DeleteProduct */
export const deleteProduct = (_id: string) => async (
  dispatch: AllDispatchProp,
  getState: any,
) => {
  const data = JSON.stringify({_id});
  const token = await AsyncStorage.getItem('@user_token');

  axios({
    url: `${API_URI}/api/product`,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'x-amazon-token': token,
    },
    data,
  })
    .then((res) => {
      dispatch({type: DELETE_PRODUCT, payload: res.data._id});
    })
    .catch((err: any) => {
      console.log(err.response.data);
    });
};

//** Amazon Add To Cart */
export const addToCart = (_id: string) => async (
  dispatch: AllDispatchProp,
  getState: any,
) => {
  const {products, cartProducts} = getState().product;
  const product = products.filter((p: any) => p._id === _id);
  const cartProduct = cartProducts.filter((p: any) => p._id === _id);
  const isInCart = cartProduct.length > 0;
  const data = JSON.stringify({_id});
  const token = await AsyncStorage.getItem('@user_token');

  if (!isInCart) {
    axios({
      method: 'PUT',
      url: `${API_URI}/api/product`,
      headers: {
        'Content-Type': 'application/json',
        'x-amazon-token': token,
      },
      data,
    })
      .then((res) => {
        dispatch({type: ADD_TO_CART, payload: res.data});
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }
};

//** Amazon Product Check Out */
export const productCheckOut = () => async (dispatch: AllDispatchProp) => {
  const token = await AsyncStorage.getItem('@user_token');

  axios({
    method: 'GET',
    url: `${API_URI}/api/product`,
    headers: {
      'Content-Type': 'application/json',
      'x-amazon-token': token,
    },
  })
    .then((res) => {
      dispatch({type: CHECK_OUT, payload: res.data});
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};

//** Amazon Clear Cart */
export const clearCart = () => async (dispatch: AllDispatchProp) => {
  const token = await AsyncStorage.getItem('@user_token');
  axios({
    method: 'PUT',
    url: `${API_URI}/api/product/clear`,
    headers: {
      'x-amazon-token': token,
    },
  })
    .then(() => {
      return loadProducts();
    })
    .catch(() => {});
};
