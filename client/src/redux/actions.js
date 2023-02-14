import axios from "axios";

export const SEARCH = "SEARCH";
export const SET_ERROR = "SET_ERROR";
export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_PRODUCT_BY_ID = "GET_PRODUCT_BY_ID";
export const FILTERED_PRODUCTS = "FILTERED_PRODUCTS";
export const CLEAR_FILTERS = "CLEAR_FILTERS";
export const ADD_TO_CART = "ADD_TO_CART";
export const TOGGLE_SHOW_CART = "TOGGLE_SHOW_CART";
export const EDIT_CART = "EDIT_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const EMPTY_CART = "EMPTY_CART";

export const clearFilters = () => {
  return (dispatch) => {
    dispatch({ type: CLEAR_FILTERS, payload: "" });
  };
};

export function setError(payload) {
  return {
    type: SET_ERROR,
    payload,
  };
}

export const search = (name) => {
  return async function (dispatch) {
    try {
      let info = await axios.get(
        // 
        "https://pg-henry.up.railway.app/products/?name=" + name
      ); // ### RUTA PARA SOLICITAR EL GET
      return dispatch({
        type: SEARCH,
        payload: info.data,
      });
    } catch (error) {
      return "No pudimos encontrar ese producto";
    }
  };
};

export const getProducts = () => {
  return async (dispatch) => {
    try {
      const allProducts = await axios.get("https://pg-henry.up.railway.app/products");
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
        `https://pg-henry.up.railway.app/products/${id}`
      );
      dispatch({ type: GET_PRODUCT_BY_ID, payload: productById.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const filterProducts = (day, categoryId) => {
  return async (dispatch) => {
    try {
      const filteredProducts = await axios.get(
        `https://pg-henry.up.railway.app/products?days=${day}&category=${categoryId}`
      );
      dispatch({ type: FILTERED_PRODUCTS, payload: filteredProducts.data });
    } catch (error) {
      dispatch({ type: FILTERED_PRODUCTS, payload: [] });
      console.log(error);
    }
  };
};

export const addCartProduct = (product, quantity) => {
  // leo del local storage
  let stringCart = localStorage.getItem("cart");
  let cart = [];
  const productInsert = {
    id: product.id,
    name: product.name,
    Photo: product.Photos[0].Path,
    Price: product.Price,
    StartDate: product.StartDate,
    quantity: quantity,
  };

  if (!stringCart) {
    cart.push(productInsert);
  } else {
    cart = JSON.parse(stringCart);
    const cartItem = cart.find((e) => e.id === product.id);
    if (cartItem) {
      cartItem.quantity = cartItem.quantity + quantity;
    } else {
      cart.push(productInsert);
    }
  }

  // grabo en el local storage
  localStorage.setItem("cart", JSON.stringify(cart));

  return {
    type: ADD_TO_CART,
    payload: getInternalTotalItems(),
  };
};

export const editCartProduct = (productId, newQuantity) => {
  let stringCart = localStorage.getItem("cart");
  let cart = [];

  if (stringCart) {
    cart = JSON.parse(stringCart);
    const cartItemIndex = cart.findIndex((e) => e.id === productId);
    if (cartItemIndex !== -1) {
      cart[cartItemIndex].quantity = newQuantity;
    }
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  return {
    type: EDIT_CART,
    payload: getInternalTotalItems(),
  };
};

export const removeCartProduct = (productId) => {
  let stringCart = localStorage.getItem("cart");
  let cart = [];

  if (stringCart) {
    cart = JSON.parse(stringCart);
    const cartItemIndex = cart.findIndex((e) => e.id === productId);
    if (cartItemIndex !== -1) {
      cart.splice(cartItemIndex, 1);
    }
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  return {
    type: REMOVE_FROM_CART,
    payload: getInternalTotalItems(),
  };
};

export const emptyCart = () => {
  localStorage.setItem("cart", JSON.stringify([]));
  return {
    type: EMPTY_CART,
    payload: getInternalTotalItems(),
  }
}

export const getTotalItems = () => {
  return {
    type: ADD_TO_CART,
    payload: getInternalTotalItems(),
  };
};

const getInternalTotalItems = () => {
  const stringCart = localStorage.getItem("cart");
  let totalQuantity = 0;
  if (stringCart) {
    const cart = JSON.parse(stringCart);
    for (const item of cart) totalQuantity = totalQuantity + item.quantity;
  } else {
    totalQuantity = 0;
  }
  return totalQuantity;
};

export const toggleShowCart = (show) => {
  return {
    type: TOGGLE_SHOW_CART,
    payload: show,
  };
};

