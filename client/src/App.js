import React from "react";
import { Route, useLocation } from "react-router-dom";
import Shows from "./components/Shows/Shows";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import NavBar from "./components/NavBar/NavBar";
import LandingPage from "./components/LandingPage/LandingPage";
import CartSummary from "./components/CartSummary/CartSummary";
import Footer from "./components/Footer/Footer";
import "./App.css";

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
      <Route exact path={"/carrito"} component={CartSummary} />
      {pathname !== "/" ? <Footer /> : null}
    </>
  );
}

export default App;
