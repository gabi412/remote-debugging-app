import React from "react";
import "./Content.css";
import Form from "./Form";

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
        <Form />
      </div>
    );
  }
}

export default Content;
