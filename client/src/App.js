import "./App.css";
import React from "react";
import { Route, useLocation } from "react-router-dom";
import Shows from "./components/Shows/Shows";
import NavBar from "./components/NavBar/NavBar";
import LandingPage from "./components/LandingPage/LandingPage";
import Footer from "./components/Footer/Footer";
import ProductDetails from "./components/ProductDetails/ProductDetails";

function App() {
  const { pathname } = useLocation();
  return (
    <React.Fragment>
      <Route exact path={"/"} component={LandingPage} />
      {pathname !== "/" ? <NavBar /> : null}
      <Route exact path={"/shows"} component={Shows} />
      <Route exact path={"/product/:id"} component={ProductDetails} />
      {pathname !== "/" ? <Footer /> : null}
    </React.Fragment>
  );
}

export default App;
