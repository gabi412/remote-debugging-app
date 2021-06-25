import React from "react";
import CompileRun from "./CompileRun";
import LoadFile from "./LoadFile";
import "./Home.css";

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state={
      isCompiling:false
    }
  }
  setCompileState=(compileBool)=>{
    this.setState({isCompiling:compileBool});
  }
  render() {
    return (
      <div>
        <LoadFile isCompiling = {this.state.isCompiling}/>
        <CompileRun handleCompilingState={this.setCompileState.bind(this)}/>
      </div>
    );
  }
}

export default Home;
