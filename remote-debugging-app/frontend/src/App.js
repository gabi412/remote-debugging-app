import React from "react";
import Header from "./components/Header/Header";
import NavBar from "./components/Navbar/NavBar";
import Content from "./components/Content/Content";
import Footer from "./components/Footer";
import Stimulus from "./components/Stimulus";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";

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
              <Content />
            </Route>
            <Route path="/stimulus">
              <Header />
              <Stimulus />
              <Footer />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
