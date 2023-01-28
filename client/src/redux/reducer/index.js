import {

  SET_ERROR,

} from "../actions";

const initialState = {
  error: false,
};

const rootReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {

    case SET_ERROR:
      return {
        ...state,
        error: payload,
      };

    default:
      return state;
  }
};

export default rootReducer;
