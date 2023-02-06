import {
  SET_ERROR,
  SEARCH,
  GET_PRODUCTS,
  GET_PRODUCT_BY_ID,
  FILTERED_PRODUCTS,
} from "./actions";

const initialState = {
  error: false,
  products: [],
  product: {},
  allProducts: [],
  filteredProducts: [],
};

const rootReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        allProducts: action.payload,
        filteredProducts: action.payload,
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
    case FILTERED_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        allProducts: action.payload,
        filteredProducts: action.payload,
      };
    default:
      return { ...state };
  }
};

export default rootReducer;
