import "./App.css";
import React from "react";
import { Route } from "react-router-dom";
import Shows from "./components/Shows";
import NavBar from "./components/NavBar";
import Shop from "./components/Shop";
import Lessons from "./components/Lessons";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <Route exact path={"/"} component={Shows} />
      <Route exact path={"/Shop"} component={Shop} />
      <Route exact path={"/Lessons"} component={Lessons} />
    </React.Fragment>
  );
}

export default App;
