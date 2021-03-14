import React from "react";
import "./Content.css";
import Form from "./Form";
import LoadFile from "./LoadFile";

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
    this.handleLoadingState = this.handleLoadingState.bind(this);
  }

  handleLoadingState(loading) {
    this.setState({ isLoading: loading });
  }

  render() {

      return (
        <div>
          <LoadFile />
          <Form handleLoadingState={this.handleLoadingState} />
        </div>
      );
    }
  }


export default Content;
