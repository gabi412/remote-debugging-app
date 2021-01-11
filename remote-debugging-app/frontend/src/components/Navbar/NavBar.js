import React, { Component } from "react";
import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBFormInline,
} from "mdbreact";
import { BrowserRouter as Router } from "react-router-dom";
const clockStyle = {
  fontSize: "20",
  color: "rgb(138, 15, 15)",
  fontFamily: "cursive",
  fontWeight: "bold"
}
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
      date: new Date()
    });
  }

  componentDidMount(){
    this.timerID = setInterval(
      () => this.tick(),1000);
  }

  componentWillUnmount(){
    clearInterval(this.timerID);
  }
  render() {
    return (
      <Router>
        <MDBNavbar color="indigo" dark expand="md">
         
          <MDBNavbarToggler onClick={this.toggleCollapse} />
          <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
            <MDBNavbarNav left>
              <MDBNavItem active>
                <MDBNavLink to="#">Home</MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink to="#">About</MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink to="#">Debug</MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
             
              </MDBNavItem>
            </MDBNavbarNav>
            <MDBNavbarNav right>
              <MDBNavItem>
                <MDBFormInline waves>
                  <div className="md-form my-0">
                    <p style={clockStyle}>
                       {this.state.date.toLocaleTimeString()}
                      <br />
                    </p>
                  </div>
                </MDBFormInline>
              </MDBNavItem>             
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBNavbar>
      </Router>
    );
  }
}

export default NavBar;
