import React from "react";
import { Route, useLocation } from "react-router-dom";
import Shows from "./components/Shows/Shows";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import NavBar from "./components/NavBar/NavBar";
import LandingPage from "./components/LandingPage/LandingPage";
import Footer from "./components/Footer/Footer";
import "./App.css";

function App() {
  const { pathname } = useLocation();
  return (
    <>
      <Route exact path={"/"} component={LandingPage} />
      {pathname !== "/" ? <NavBar /> : null}
      <Route exact path={"/shows"} component={Shows} />
      <Route path="/product/:id">
        <ProductDetails />
      </Route>
      {pathname !== "/" ? <Footer /> : null}
    </>
  );
}

export default App;
