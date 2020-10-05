import {
  ActionProps,
  SENDING_PRODUCT,
  LOADING_PRODUCTS,
  SENT_PRODUCT,
  LOADED_PRODUCTS,
  DELETE_PRODUCT,
  ADD_TO_CART,
  CHECK_OUT,
} from '../actions/types';

const initialState = {
  sending: false,
  loading: true,
  products: [],
  product: null,
  cartProducts: [],
};

export default (state = initialState, {payload, type}: ActionProps) => {
  switch (type) {
    case SENDING_PRODUCT:
      return {
        ...state,
        sending: true,
      };
    case LOADING_PRODUCTS:
      return {
        ...state,
        loading: false,
      };
    case SENT_PRODUCT:
      return {
        ...state,
        sending: false,
        products: [payload, ...state.products],
        product: payload,
      };
    case LOADED_PRODUCTS:
      return {
        ...state,
        products: payload,
        loading: false,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          (product: any) => product._id !== payload,
        ),
      };
    case ADD_TO_CART:
      const updatedCart = state.cartProducts.filter(
        (p: any) => p._id !== payload._id,
      );

      const updatedProducts = state.products.filter(
        (p: any) => p._id !== payload._id,
      );

      return {
        ...state,
        cartProducts: [payload, ...updatedCart],
        products: [payload, ...updatedProducts],
      };
    case CHECK_OUT:
      return {
        ...state,
        cartProducts: [],
        products: payload,
      };
    default:
      return state;
  }
};
