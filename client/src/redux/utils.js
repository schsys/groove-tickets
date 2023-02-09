

/* payload es el id, array de products, y el array de carrito */
export const addItem = (id, allProducts, cart) => {
    /* busco en "todos" (que en realidad es lo filtrado)"
      /* sino */
    /* busco en el carrito */
    const newProduct =
      allProducts.find((p) => p.id === id) || cart.find((p) => p.id === id);
  
    if (!newProduct) {
      return [...cart];
    }
  
    const productExist = cart.find((item) => item.id === newProduct.id);
  
    if (!productExist) {
      return [...cart, { ...newProduct, cantidad: 1 }];
    } else {
      return cart.map((e) =>
        e.id === newProduct.id ? { ...e, cantidad: e.cantidad + 1 } : e
      );
    }
  };
  