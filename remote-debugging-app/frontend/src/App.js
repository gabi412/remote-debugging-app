import React from "react";
import Header from "./components/Header/Header";
import NavBar from "./components/Navbar/NavBar";
import Home from "./components/Home/Home";
import Footer from "./components/Footer";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import ControlPins from "./components/ControlPins/ControlPins";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <br/>
        <NavBar />
        <div>
          <Switch>
            <Route exact path="/">
              <Header />
              <Home />
              <Footer />
            </Route>
            <Route path="/control-pins">
              <Header />
              <ControlPins />
              <Footer />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
