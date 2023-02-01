import axios from "axios";

export const SEARCH = "SEARCH";
export const SET_ERROR = "SET_ERROR";

export function setError(payload) {
  return {
    type: SET_ERROR,
    payload,
  };
}

export const search = (name) => {
  return async function(dispatch) {
      try {
          let info = await axios.get("https://pokemonapi-jzai.onrender.com/pokemons?name=" + name);
          return dispatch({
              type: "SEARCH",
              payload: info.data
          })
      } catch(error){
          return 'We couldnt find that product'
      } 
  }
} 