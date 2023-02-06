import axios from "axios";

export const SEARCH = "SEARCH";
export const SET_ERROR = "SET_ERROR";
export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_PRODUCT_BY_ID = "GET_PRODUCT_BY_ID";
export const FILTER_PRODUCTS_BY_DATE = "FILTER_PRODUCTS_BY_DATE";

export function setError(payload) {
  return {
    type: SET_ERROR,
    payload,
  };
}

export const search = (name) => {
  return async function (dispatch) {
    try {
      let info = await axios.get("http://localhost:3001/products/?name=" + name); // ############   ACA VA LA RUTA PARA SOLICITAR EL GET
      //let searchRes = info.filter((e) => e.name.includes(name));
      //console.log(searchRes);
      return dispatch({
        type: "SEARCH",
        payload: info.data,
      });
    } catch (error) {
      return "No pudimos encontrar ese producto";
    }
  };
}

export const getProducts = () => {
  return async (dispatch) => {
    try {
      const allProducts = await axios.get("http://localhost:3001/products");
      dispatch({ type: GET_PRODUCTS, payload: allProducts.data });
    } catch (error) {
      alert("algo salió mal");
      console.log(error);
    }
  };
};

export const getProductById = (id) => {
  return async (dispatch) => {
    try {
      const productById = await axios.get(
        `http://localhost:3001/products/${id}`
      );
      dispatch({ type: GET_PRODUCT_BY_ID, payload: productById.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const filterProductsByDate = (day) => {
  return {
      type: FILTER_PRODUCTS_BY_DATE,
      payload: day,
  };
};
