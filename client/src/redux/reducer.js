import {
  SET_ERROR,
  SEARCH,
  GET_PRODUCTS,
  GET_PRODUCT_BY_ID,
  FILTERED_PRODUCTS,
  CLEAR_FILTERS,
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
        // products: action.payload,
        allProducts: action.payload,
        filteredProducts: action.payload,
        products: state.filteredProducts.length
          ? state.filteredProducts
          : action.payload,
      };
/*     case GET_PRODUCTS: {
      return {
        ...state,
        products: state.filteredProducts.length
          ? state.filteredProducts
          : action.payload,
      };
    } */

    case SEARCH:
      return {
        ...state,
        products: action.payload,
        filteredProducts: action.payload
      };


    case CLEAR_FILTERS: {
      return {
        ...state,
        filteredProducts: [],
      };
    }

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
