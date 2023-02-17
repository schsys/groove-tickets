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
const apiUrl = process.env.REACT_APP_BASE_URL;

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
        `${apiUrl}/products/?name=${name}`
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
      const allProducts = await axios.get(`${apiUrl}/products`);
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
        `${apiUrl}/products/${id}`
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
        `${apiUrl}/products?days=${day}&category=${categoryId}`
      );
      dispatch({ type: FILTERED_PRODUCTS, payload: filteredProducts.data });
    } catch (error) {
      dispatch({ type: FILTERED_PRODUCTS, payload: [] });
      console.log(error);
    }
  };
};

export const addCartProduct = (product, quantity, user, orderId) => {
  return async (dispatch) => {
    try {
      // leo del local storage
      const productInsert = {
        id: product.id,
        name: product.name,
        photo: product.Photos[0].Path,
        price: product.Price,
        startDate: product.StartDate,
        quantity: quantity,
      };

      let stringCart = localStorage.getItem("cart");
      let cart = [];
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

      dispatch({
        type: ADD_TO_CART,
        payload: await getInternalTotalItems(user),
      });
    }catch(error) {
      console.log(error);
    }
  }
};

export const editCartProduct = (productId, newQuantity, user) => {
  return async (dispatch) => {
    try {
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

      dispatch({
        type: EDIT_CART,
        payload: await getInternalTotalItems(user),
      });
    } catch(error) {
        console.log(error)
    }
  }
};

export const removeCartProduct = (productId, user) => {
  return async (dispatch) => {
    try {
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

      dispatch({
        type: REMOVE_FROM_CART,
        payload: await getInternalTotalItems(user),
      });
    }catch(error) {
      console.log(error);
    }
  }
};

export const emptyCart = (user) => {
  return async (dispatch) => {
    try {
      localStorage.setItem("cart", JSON.stringify([]));
      dispatch({
        type: EMPTY_CART,
        payload: await getInternalTotalItems(user),
      });
    }catch(error) {
      console.log(error)
    }
  }
}

export const getTotalItems = (user) => {
  return async (dispatch) => {
    try {
      dispatch({ 
        type: ADD_TO_CART,
        payload: await getInternalTotalItems(user) 
      })
    }catch(error) {
      console.log(error)
    }
  };
};

const getInternalTotalItems = async(user) => {
  let totalQuantity = 0;
  const order = await getCreatedOrderByUser(user);
  console.log('getInternalTotalItems', order);
  console.log('getInternalTotalItems', order.OrderItems);
  if (order) {
    for (const item of order.OrderItems)
        totalQuantity = totalQuantity + item.Quantity; 
  }
  return totalQuantity;
};

export const getCreatedOrderByUser = async(user) => {
  try {
    if (user && user.hasOwnProperty('email')) {
      const order = await axios.get(`${apiUrl}/orders?status=Created&userName=${user.email}`);
      return order.data;
    }else{
      const stringCart = localStorage.getItem("cart");
      const order = {};
      order.Id = 0;
      order.CustomerId = 0;
      order.TotalAmount = 0;
      order.OrderItems = [];
      if (stringCart) {
         const items = JSON.parse(stringCart);
         order.OrderItems = items.map( item => ({
           ProductId :  item.id,
           StartDate: item.startDate,
           Quantity: item.quantity,
           UnitPrice: item.price,
           Product: {
             Name: item.name,
             Photos: [{id: 1, Path: item.photo}],
            } 
         }));

        console.log(order); 
        return order;
      }
    }
  } 
  catch (error) {
    console.log(error);
  }
}

export const toggleShowCart = (show) => {
  return {
    type: TOGGLE_SHOW_CART,
    payload: show,
  };
};

