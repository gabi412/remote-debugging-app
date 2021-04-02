import React, { Component } from "react";
import "./Navbar.css"

import { NavLink } from "react-router-dom";

class NavBar extends Component {
  state = {
    isOpen: false,
    date: new Date(),
  };

  render() {
    return (
      <nav>
        <div className="navbar-container">
        
            <div className="navbar-start">
              <NavLink className="navbar-item" to="/">
                Home
              </NavLink>

              <NavLink className="navbar-item" to="/control-pins">
                Control pins
              </NavLink>
            </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
