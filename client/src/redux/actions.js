import axios from "axios";
export const SEARCH = "SEARCH";
export const SET_ERROR = "SET_ERROR";
export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_PRODUCT_BY_ID = "GET_PRODUCT_BY_ID";
export const FILTERED_PRODUCTS = "FILTERED_PRODUCTS";
export const CLEAR_FILTERS = "CLEAR_FILTERS";
export const ADD_EDIT_CART = "ADD_EDIT_CART";
export const TOGGLE_SHOW_CART = "TOGGLE_SHOW_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const EMPTY_CART = "EMPTY_CART";
export const ORDER_SELECTED = "ORDER_SELECTED";
export const FETCHING_PRODUCTS = "FETCHING_PRODUCTS"
export const GET_OLDSHOWS = "GET_OLDSHOWS";


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
      dispatch({type: FETCHING_PRODUCTS })
      const allProducts = await axios.get(`${apiUrl}/products`);
      dispatch({ type: GET_PRODUCTS, payload: allProducts.data });
    } catch (error) {
      alert("algo salió mal, no se cargaron los productos");
      console.log(error);
    }
  };
};

export const getOldShows = () => {
  return async (dispatch) => {
    try {
      dispatch({type: FETCHING_PRODUCTS })
      const allProducts = await axios.get(`${apiUrl}/finished-products`);
      dispatch({ type: GET_OLDSHOWS, payload: allProducts.data });
    } catch (error) {
      alert("algo salió mal, no se cargaron los shows históricos");
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
      dispatch({type: FETCHING_PRODUCTS })
      dispatch({ type: FILTERED_PRODUCTS, payload: filteredProducts.data });
    } catch (error) {
      dispatch({ type: FILTERED_PRODUCTS, payload: [] });
      console.log(error);
    }
  };
};

export const addEditCartProduct = async(productId, quantity, user, orderId) => {
    try {
      // leo del local storage
      if (userIsLogining(user)) {
         if (!orderId || orderId === 0) {
            const order = await getCreatedOrderByUser(user);
            if (order) {
                orderId = order.Id;
            }else{
                // crear orden             
                await createOrder(user, [{productId, quantity}]);
            } 
         }   
         if (orderId)
            await axios.put(`${apiUrl}/order/${orderId}/items`, {items: [{productId, quantity}]});
      }else {
        let cart = [];
        let stringCart = localStorage.getItem("cart");
        if (stringCart) cart = JSON.parse(stringCart);
        const cartItem = cart.find((e) => e.id === productId);

        if (stringCart && cartItem) {
           cartItem.quantity = cartItem.quantity + quantity;
        }else{
           const productById = await axios.get(`${apiUrl}/products/${productId}`);
           const productInsert = {
             id: productById.data.id,
             name: productById.data.name,
             photo: productById.data.Photos[0].Path,
             price: productById.data.Price,
             startDate: productById.data.StartDate,
             quantity: quantity,
           };
          cart.push(productInsert);
        }
        localStorage.setItem("cart", JSON.stringify(cart));
      };
    }
    catch(error) 
    {
      console.log(error);
      setError(error);
    }
};

export const removeCartProduct = async(productId, user, orderId) => {
    try {
      if (userIsLogining(user)) {
        if (orderId) { 
           const response = await axios.delete(`${apiUrl}/order/${orderId}/items/${productId}`);           
           console.log('response', response);
         }
      }else {
        let stringCart = localStorage.getItem("cart");
        let cart = [];

        if (stringCart) {
          cart = JSON.parse(stringCart);
          cart = cart.filter(e => e.id !== productId);           
        }
        localStorage.setItem("cart", JSON.stringify(cart));
      }
      return productId;
    }
    catch(error) 
    {
      console.log(error);
      setError(error);
    }
};

export const emptyCart = async(user, orderId) => {
  try {
    if (userIsLogining(user)) {
      console.log(user);
      if (!orderId) { 
          const order = await getCreatedOrderByUser(user);
          orderId = order.Id;
      }
      if (orderId)
         await axios.put(`${apiUrl}/orders/${orderId}`, {id: orderId, status: "Canceled"}); 
    } else {     
      localStorage.setItem("cart", JSON.stringify([]));
    }
  }
  catch(error) 
  {
    console.log(error)
    setError(error);
  }
}

export const getTotalItems = (user) => {
  return async (dispatch) => {
    try {
      dispatch({ 
        type: ADD_EDIT_CART,
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
  if (order) {
    for (const item of order.OrderItems)
        totalQuantity = totalQuantity + item.Quantity; 
  }
  return totalQuantity;
};

export const getCreatedOrderByUser = async(user) => {
  try {
    if (userIsLogining(user)) {
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
      }
      return order;
    }
  } 
  catch (error) {
    console.log(error);
    setError(error);
  }
}

const userIsLogining = (user) => {
  if (user && user.hasOwnProperty('email')) return true;
  return false;  
}

export const setLocalStorageToApi = (user) => {
  return async (dispatch) => {
    try {
      const stringCart = localStorage.getItem("cart");
      const response = await axios.get(`${apiUrl}/orders?status=Created&userName=${user.email}`);
      const order = response.data;
      if (stringCart) {
        const items = JSON.parse(stringCart);        
        if (order) {
          const orderItems = items.map(item => ({productId: item.id, quantity: item.quantity}));  
          const response = await axios.put(`${apiUrl}/order/${order.Id}/items`, {items: orderItems});
          // trato de errores
          console.log('orden modificada: ', response);         
        }else{
          const customer = await axios.get(`${apiUrl}/user?userName=${user.email}`);
          if (customer) {            
            const orderItems = items.map(item => 
                (
                  {
                    productId: item.id, 
                    quantity: item.quantity,
                    unitPrice: item.price,
                    totalAmount: item.price * item.quantity,
                  }
                )
            ); 

            let totalOrderAmount = 0;
            for (const item of orderItems) 
                totalOrderAmount = totalOrderAmount + item.totalAmount;
            
            const response = await axios.post(`${apiUrl}/order`, 
                {
                  customerId: customer.data.Customer.id,
                  totalAmount: totalOrderAmount,
                  items: orderItems
                }
              );
              
           // controlo respuesta de orden
            console.log('orden creada: ', response);
          }          
        }
        // vacio carrito de localstorage 
        localStorage.setItem("cart", []);
      };
        
      dispatch({
        type: ORDER_SELECTED,
        payload: {
          totalItems: await getInternalTotalItems(user)
        }
      });

    }catch(error) {
      console.log('Error postOrder', error);
      setError(error);
    }
  }
}

export const createOrder = async(user, items) => {
  
  try {
    if (userIsLogining(user)) {
        const customer = await axios.get(`${apiUrl}/user?userName=${user.email}`);
        if (customer) {
          let price = 0;
          let totalOrderAmount = 0;
          const orderItems =  [];      
          for (const item of items) {
            const productById = await axios.get(`${apiUrl}/products/${item.productId}`);
            if (productById) price = productById.data.Price;
            const product = {
                productId: item.productId, 
                quantity: item.quantity,
                unitPrice: price,
                totalAmount: price * item.quantity,
              }
              orderItems.push(product);
              totalOrderAmount = totalOrderAmount + product.totalAmount;
          };      

          console.log('createOrder', totalOrderAmount, orderItems,  customer.data.Customer.id);
          const response = await axios.post(`${apiUrl}/order`, 
              {
                customerId: customer.data.Customer.id,
                totalAmount: totalOrderAmount,
                items: orderItems
              }
            );
            
        // controlo respuesta de orden
          console.log('orden creada: ', response);
          return response; 
        }
    }
    return {error: 'usuario no logoneado o no existe relación de usuario con cliente'}
  } 
  catch(error) {
    console.log(error);
    setError(error);
  }  
}

export const toggleShowCart = (show) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: TOGGLE_SHOW_CART,
        payload: show,
      });
    }catch(error) {
      console.log(error)
    }
  };
};

