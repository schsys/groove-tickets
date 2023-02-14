import React from "react";
import { Route, useLocation } from "react-router-dom";
import Shows from "./components/Shows/Shows";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import NavBar from "./components/NavBar/NavBar";
// import LandingPage from "./components/LandingPage/LandingPage";
// import CartSummary from "./components/CartSummary/CartSummary";
import Footer from "./components/Footer/Footer";
import Register from "./components/Register/Register";
import Account from "./components/Account/Account";
import Cart from "../src/components/Cart/Cart.jsx"
import { AuthContextProvider } from "./context/AuthContext";
import "./App.css";
import { Order } from "./components/Order/Order";
import AdminApp from "./admin";

function App() {
  // const { pathname } = useLocation();
  return (
    <>
      {/* <Route exact path={"/"} component={LandingPage} />
      {pathname !== "/" ? <NavBar /> : null} */}
      {/* <Route exact path={"/"} component={LandingPage} />
      {pathname !== "/" ? <NavBar /> : null} */}
      <AuthContextProvider>
        <Route exact path={"/"}>
          <NavBar />
          <Shows />
          <Cart />
        </Route>
        <Route path="/product/:id">
          <NavBar />
          <ProductDetails />
          <Footer />
          <Cart />
        </Route>
        {/* <Route exact path={"/carrito"}>
          <NavBar />
          <CartSummary />
        </Route> */}
        <Route exact path={"/register"}>
          <NavBar />
          <Register />
          <Footer />
          <Cart />
        </Route>
        <Route exact path={"/micuenta"}>
          <NavBar />
          <Account />
          <Footer />
          <Cart />
        </Route>
        <Route exact path={"/comprar"}>
          <NavBar isCartDisabled={true} />
          <Order />
          <Footer />
        </Route>
        <Route exact path={"/admin"}>
          <AdminApp />
        </Route>
        {/* <Cart /> */}
        {/* {pathname !== "/" ? <Footer /> : null} */}
      </AuthContextProvider>
    </>
  );
}

export default App;
