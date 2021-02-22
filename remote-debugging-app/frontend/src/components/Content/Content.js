import React from "react";
import "./Content.css";
import Form from "./Form";
import LoadFile from "./LoadFile"

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    
      isLoading: false,
    }
  }
      
  render() {

    return (
      <div>
        <LoadFile />
        <Form />
        
      </div>
    );
  }
}

export default Content;
