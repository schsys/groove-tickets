import {
  SET_ERROR,
  SEARCH,
  GET_PRODUCTS,
  GET_PRODUCT_BY_ID,
  FILTERED_PRODUCTS,
  CLEAR_FILTERS,
  TOGGLE_SHOW_CART,
  REMOVE_FROM_CART,
  EMPTY_CART,
  ADD_EDIT_CART,
  ORDER_SELECTED,
  FETCHING_PRODUCTS,
  GET_OLDSHOWS
} from "./actions";

// import { addItem } from "./utils";

const initialState = {
  error: false,
  products: [],
  fetchProducts: "loading",
  product: {},
  allProducts: [],
  filteredProducts: [],
  cart: [],
  showCart: false,
  totalItems: 0,
};

const rootReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PRODUCTS: {
      return {
        ...state,
        products: state.filteredProducts.length
          ? state.filteredProducts
          : action.payload,
        allProducts: action.payload,
        fetchProducts: "succeeded"
      };
    }

    case GET_OLDSHOWS: {
      return{
        ...state,
        products: action.payload,
      allProducts: action.payload,
      fetchProducts: "succeeded"
      }
    }

    case TOGGLE_SHOW_CART:
      return {
        ...state,
        showCart: action.payload,
      };

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
        fetchProducts: "succeeded"
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
    case ADD_EDIT_CART: {
      return {
        ...state,
        totalItems: action.payload,
      };
    }
    case REMOVE_FROM_CART:
      return {
        ...state,
        totalItems: action.payload,
      };      
    case EMPTY_CART:
      return {
        ...state,
        totalItems: action.payload
      };
    case ORDER_SELECTED: 
      return {
        ...state,
        totalItems: action.payload["totalItems"],
      };
      case FETCHING_PRODUCTS:
        return{
          ...state,
          fetchProducts: "loading"
        }
    default:
      return { ...state };
  }
};

export default rootReducer;
