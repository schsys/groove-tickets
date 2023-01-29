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
    <div className="App">
      {pathname !== "/" ? <NavBar /> : null}
      <NavBar />
      <Switch>
        <Route exact path={"/"} component={LandingPage} />
        <Route exact path={"/shows"} component={Shows} />
        <Route exact path={"/Shop"} component={Shop} />
        <Route exact path={"/Lessons"} component={Lessons} />
      </Switch>
    </div>
  );
}

export default App;
