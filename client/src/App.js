import "./App.css";
import React from "react";
import { Route, useLocation } from "react-router-dom";
import Shows from "./components/Shows/Shows";
import NavBar from "./components/NavBar/NavBar";
import Shop from "./components/Shop/Shop";
import Lessons from "./components/Lessons/Lessons";
import LandingPage from "./components/LandingPage/LandingPage";
import Register from "./components/Register/Register";
import product from "./components/ProductDetails/ProductDetails";

function App() {
  const { pathname } = useLocation();
  return (
    <React.Fragment>
      <Route exact path={"/"} component={LandingPage} />
      {pathname !== "/" ? <NavBar /> : null}
      {/* <Route path="/" component={Footer} /> */}
      <Route exact path={"/shows"} component={Shows} />
      <Route exact path={"/shop"} component={Shop} />
      <Route exact path={"/lessons"} component={Lessons} />
      <Route exact path={"/micuenta"} component={Register} />
      <Route exact path={"/product"} component={product} />
    </React.Fragment>
  );
}

export default App;
