import {
  SET_ERROR,
  SEARCH,
  GET_PRODUCTS,
  GET_PRODUCT_BY_ID,
  FILTER_PRODUCTS_BY_DATE,
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
      
      case SEARCH:     
        console.log("search",  action.payload);
        return {
          ...state,
          products: action.payload,
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

    case FILTER_PRODUCTS_BY_DATE:
      if (action.payload === 1) {
        return {
          ...state,
          products: state.filteredProducts.filter((event) => {
            let eventDate = new Date(event.StartDate);
            let currentDate = new Date();
            let difference = (eventDate - currentDate) / (1000 * 60 * 60 * 24);
            return difference <= 1;
          }),
        };
      } else if (action.payload === 7) {
        return {
          ...state,
          products: state.filteredProducts.filter((event) => {
            let eventDate = new Date(event.StartDate);
            let currentDate = new Date();
            let difference = (eventDate - currentDate) / (1000 * 60 * 60 * 24);
            return difference <= 7;
          }),
        };
      } else if (action.payload === 15) {
        return {
          ...state,
          products: state.filteredProducts.filter((event) => {
            let eventDate = new Date(event.StartDate);
            let currentDate = new Date();
            let difference = (eventDate - currentDate) / (1000 * 60 * 60 * 24);
            return difference <= 15;
          }),
        };
      } else {
        return {
          ...state,
          products: state.filteredProducts,
        };
      }
    default:
      return { ...state };
  }
};

export default rootReducer;
