import React from "react";
import { Route, Switch } from "react-router-dom";
import Shows from "./components/Shows/Shows";
import OldShows from "./components/OldShows/OldShows";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import Register from "./components/Register/Register";
import Account from "./components/Account/Account";
import Cart from "../src/components/Cart/Cart.jsx"
import CompleteRegister from "./components/Register/CompleteRegister";
import { AuthContextProvider } from "./context/AuthContext";
import { PrivateRoute } from "./components/Authentication/PrivateRoute";
import { Order } from "./components/Order/Order";
// import AdminApp from "./admin";
// import UserAdmin from "./miCuenta"
import Error404 from "./components/404/Error404";
import "./App.css";

function App() {
  return (
    <>
      <AuthContextProvider>

        <Switch>
          <Route exact path={"/"}>
            <NavBar />
            <Shows />
            <Footer />
            <Cart />
          </Route>
          <Route path="/product/:id">
            <NavBar />
            <ProductDetails />
            <Footer />
            <Cart />
          </Route>
          <Route exact path={"/oldshows"}>
            <NavBar />
            <OldShows />
            <Footer />
            <Cart />
          </Route>
          <Route exact path={"/register"}>
            <NavBar />
            <Register />
            <Footer />
            <Cart />
          </Route>
          <Route exact path={"/complete-register"}>
            <NavBar />
            <CompleteRegister />
            <Footer />
            <Cart />
          </Route>
          <Route exact path={"/micuenta"}>
            <PrivateRoute>
              <Account />
              <Footer />
            </PrivateRoute>
          </Route>
          <Route exact path={"/comprar"}>
            <PrivateRoute>
              <NavBar isCartDisabled={true} />
              <Order />
              <Footer />
            </PrivateRoute>
          </Route>
          {/* <Route exact path={"/admin"}>
            <PrivateRoute>
              <AdminApp />
            </PrivateRoute>
          </Route> */}
          <Route path='*'>
            <Error404 />
          </Route>
        </Switch>
      </AuthContextProvider>
    </>
  );
}

export default App;
