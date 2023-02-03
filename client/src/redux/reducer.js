import { SET_ERROR, SEARCH, GET_PRODUCTS, GET_PRODUCT_BY_ID } from "./actions";

const initialState = {
  error: false,
  products: [],
  product: {},
  allProducts: [],
};

const rootReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        allProducts: action.payload,
      };
    case GET_PRODUCT_BY_ID:
      return {
        ...state,
        product: action.payload,
      };
    case SET_ERROR:
      return {
        ...state,
        error: payload,
      };

    case SEARCH:
      return {
        ...state,
        products: action.payload,
      };

    default:
      return state;
  }
};

export default rootReducer;
