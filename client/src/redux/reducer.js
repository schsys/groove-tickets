import {
  SET_ERROR,
  SEARCH,
  GET_PRODUCTS,
  GET_PRODUCT_BY_ID,
  FILTERED_PRODUCTS,
  CLEAR_FILTERS,
  ADD_TO_CART,
  TOGGLE_SHOW_CART
} from "./actions";

import { addItem } from "./utils";

const initialState = {
  error: false,
  products: [],
  product: {},
  allProducts: [],
  filteredProducts: [],
  cart: [],
  showCart: false,
};

const rootReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PRODUCTS: {
        return {
          ...state,
          products: state.filteredProducts.length ? state.filteredProducts : action.payload,
          allProducts: action.payload
        };
    }

    case SEARCH:
      return {
        ...state,
        products: action.payload,
        filteredProducts: action.payload,
      };

      case FILTERED_PRODUCTS:
        return {
          ...state,
          products: action.payload,
          //allProducts: action.payload,
          // filteredProducts: action.payload,
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
      case ADD_TO_CART:
        /* payload es el id, array de products, y el array de carrito */
        return {
          ...state,
          cart: addItem(action.payload, state.products, state.cart),
        };
        case TOGGLE_SHOW_CART:
          return {
            ...state,
            showCart: action.payload,
          };

    default:
      return { ...state };
  }
};

export default rootReducer;
