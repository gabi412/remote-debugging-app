import React from "react";
import "./Home.css";
import Form from "./Form";
import LoadFile from "./LoadFile";

class Home extends React.Component {

  render() {
    return (
      <div>
        <LoadFile />
        <Form />
      </div>
    );
  }
}

export default Home;
