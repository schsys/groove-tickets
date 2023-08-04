/* payload es el id, array de products, y el array de carrito */
export const addItem = (itemQuantity, cart) => {
  const { product, count } = itemQuantity;
  console.log(itemQuantity)

  const newProduct = cart.find((item) => item.id === product.id);

  if (!newProduct) {
    return [
      ...cart,
      {
        id: product.id,
        name: product.name,
        Photo: product.Photos[0].Path,
        Price: product.Price,
        StartDate: product.StartDate,
        quantity: count,
      },
    ];
  } else {
    newProduct.quantity = newProduct.quantity + count;
    return cart;
  }
};
