import React from "react";
import CompileRun from "./CompileRun";
import LoadFile from "./LoadFile";
import "./Home.css";

class Home extends React.Component {

  render() {
    return (
      <div>
        <LoadFile />
        <CompileRun />
      </div>
    );
  }
}

export default Home;
