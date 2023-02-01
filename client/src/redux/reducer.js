import {
  SET_ERROR,
  SEARCH,
} from "./actions";

const initialState = {
  error: false,
  products: [],
};

const rootReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {

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
