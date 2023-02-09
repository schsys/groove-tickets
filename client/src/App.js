import React from "react";
import { Route, useLocation } from "react-router-dom";
import Shows from "./components/Shows/Shows";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import NavBar from "./components/NavBar/NavBar";
import LandingPage from "./components/LandingPage/LandingPage";
import CartSummary from "./components/CartSummary/CartSummary";
import Footer from "./components/Footer/Footer";
import Register from "./components/Register/Register";
import "./App.css";
import Cart from "../src/components/Cart/Cart.jsx"

function App() {
  const { pathname } = useLocation();
  return (
    <>
      {/* <Route exact path={"/"} component={LandingPage} />
      {pathname !== "/" ? <NavBar /> : null} */}
      <NavBar />
      <Route exact path={"/"} component={Shows} />
      <Route path="/product/:id">
        <ProductDetails />
      </Route>
 shopping_cart
      <Route exact path={"/carrito"} component={CartSummary} />
      <Route exact path={"/micuenta"} component={Register} />
      <Cart />
      {pathname !== "/" ? <Footer /> : null}
    </>
  );
}

export default App;
