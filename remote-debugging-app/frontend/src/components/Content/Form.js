import React from "react";
import axios from "axios";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      codeValue: "//write your code here",
      fileName: "",
      isLoading: false,

      scriptString: "",
      selectionStart: "",
      selectionEnd: "",

      compileOutput: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleSubmitFlash = this.handleSubmitFlash.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    //   alert("Code sent: " + this.state.codeValue);
    event.preventDefault();
    this.setState({ isLoading: true });
    const codeBody = this.state.codeValue;
    const fileName = this.state.fileName;
    const codeSent = { codeBody, fileName };

    axios
      .post("http://192.168.0.111:8081/code", codeSent)
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        axios.get("http://192.168.0.111:8081/compile-output").then((res) => {
          const compOut = JSON.stringify(res.data.data);
          console.log("res.data:" + JSON.stringify(res.data));
          this.setState({ compileOutput: compOut });
        });
      });
    console.log("frontend " + JSON.stringify(codeSent));
  }

  handleSubmitFlash(event) {
    event.preventDefault();
    console.log("flashing..");
  }
  handleKeyDown(event) {
    if (event.keyCode === 9) {
      // tab was pressed
      event.preventDefault();
      var val = this.state.scriptString,
        start = event.target.selectionStart,
        end = event.target.selectionEnd;

      this.setState(
        {
          scriptString: val.substring(0, start) + "\t" + val.substring(end),
        },
        () => {
          this.input.selectionStart = this.input.selectionEnd = start + 1;
        }
      );
    }
  }
  render() {
    return (
      <div id="div-form">
        <form onSubmit={this.handleSubmit}>
          <div id="form-div">
            <div id="textarea-div">
              <label>Or write your code here:</label>
              <br />
              <textarea
                id="id-textarea"
                name="codeValue"
                className="code-textarea"
                value={this.state.codeValue}
                onChange={this.handleChange}
                onKeyDown={this.handleKeyDown}
              />

              <br />
              <br />
              <label>File name:&nbsp;</label>
              <input
                type="text"
                name="fileName"
                value={this.state.fileName}
                onChange={this.handleChange}
              />
              <br />
              <input
                type="submit"
                className="button"
                value="Compile code"
                onSubmit={this.handleSubmit}
              />
            </div>
            <div id="compile-output-div">
              <br />
              <label>Compile output:</label>
              <br />
              <textarea
                id="compile-output-textarea"
                value={this.state.compileOutput}
                onChange={this.handleChange}
              />
            </div>
          </div>
        </form>
        <form onSubmit={this.handleSubmitFlash}>
          <br />
          <h2>Flash target to STM8</h2>
          <input
            type="submit"
            className="button"
            value="Flash"
            onSubmit={this.handleSubmitFlash}
          />
        </form>
      </div>
    );
  }
}

export default Form;
