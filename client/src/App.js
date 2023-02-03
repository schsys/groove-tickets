import "./App.css";
import React from "react";
import { Route, useLocation } from "react-router-dom";
import Shows from "./components/Shows/Shows";
import NavBar from "./components/NavBar/NavBar";
import LandingPage from "./components/LandingPage/LandingPage";
import Footer from "./components/Footer/Footer";

function App() {
  const { pathname } = useLocation();
  return (
    <React.Fragment>
      <Route exact path={"/"} component={LandingPage} />
      {pathname !== "/" ? <NavBar /> : null}
      <Route exact path={"/shows"} component={Shows} />
      {pathname !== "/" ? <Footer /> : null}
    </React.Fragment>
  );
}

export default App;
