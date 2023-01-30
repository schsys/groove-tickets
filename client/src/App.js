import "./App.css";
import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import Shows from "./components/Shows/Shows";
import NavBar from "./components/NavBar/NavBar";
import Shop from "./components/Shop/Shop";
import Lessons from "./components/Lessons/Lessons";
import LandingPage from "./components/LandingPage/LandingPage";

function App() {
  const { pathname } = useLocation();
  return (
    <React.Fragment>
      <Route exact path={"/"} component={LandingPage} />
      {pathname !== "/" ? <NavBar /> : null}
      <Route exact path={"/shows"} component={Shows} />
      <Route exact path={"/shop"} component={Shop} />
      <Route exact path={"/lessons"} component={Lessons} />
    </React.Fragment>
  );
}

export default App;
