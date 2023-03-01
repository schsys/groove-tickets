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
  GET_OLDSHOWS,
  FETCH_OLD_SHOWS_REQUESTED,
  FETCH_OLD_SHOWS_SUCCEEDED,
  FETCH_OLD_SHOWS_FAILED
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
  oldShows: {
    items: [],
    status: 'idle',
    error: null,
  }
};

const rootReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: state.filteredProducts.length
          ? state.filteredProducts
          : action.payload,
        allProducts: action.payload,
        fetchProducts: "succeeded"
      };
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
    case CLEAR_FILTERS: 
      return {
        ...state,
        filteredProducts: [],
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
    case ADD_EDIT_CART:
      return {
        ...state,
        totalItems: action.payload,
      };
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
      return {
        ...state,
        fetchProducts: "loading"
      }
    case FETCH_OLD_SHOWS_REQUESTED:
      console.log('FETCH_OLD_SHOWS_REQUESTED');
      return {
        ...state,
        oldShows: {
          ...state.oldShows,
          status: 'loading',
          error: null
        }
      }
    case FETCH_OLD_SHOWS_SUCCEEDED:
      return {
        ...state,
        oldShows: {
          ...state.oldShows,
          items: action.payload,
          status: 'succeeded'
        }
      }
    case FETCH_OLD_SHOWS_FAILED:
      return {
        ...state,
        oldShows: {
          ...state.oldShows,
          items: [],
          status: 'failed',
          error: action.payload
        }
      }
    default:
      return { ...state };
  }
};

export default rootReducer;
