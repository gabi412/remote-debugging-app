import React, { Component } from "react";

import { NavLink } from "react-router-dom";
const clockStyle = {
  fontSize: "20",
  color: "rgb(138, 15, 15)",
  fontFamily: "cursive",
  fontWeight: "bold",
};
class NavBar extends Component {
  state = {
    isOpen: false,
    date: new Date(),
  };

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  tick() {
    this.setState({
      date: new Date(),
    });
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  render() {
    return (
      <nav>
        <div className="container">
        
            <div className="navbar-start">
              <NavLink className="navbar-item" to="/">
                Home
              </NavLink>

              <NavLink className="navbar-item" to="/stimulus">
                Stimulus
              </NavLink>
            </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
