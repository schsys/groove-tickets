import "./App.css";
import React from "react";
import { Route } from "react-router-dom";
import Funciones from "./components/Funciones";
import NavBar from "./components/NavBar";
import Tienda from "./components/Tienda";
import Clases from "./components/Clases";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <Route exact path={"/"} component={Funciones} />
      <Route exact path={"/tienda"} component={Tienda} />
      <Route exact path={"/clases"} component={Clases} />
    </React.Fragment>
  );
}

export default App;
