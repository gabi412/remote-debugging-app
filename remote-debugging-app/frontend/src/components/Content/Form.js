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
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
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
    axios.post("http://localhost:8081/code", codeSent).catch((err) => {
      console.error(err);
    });
    console.log("frontend " + JSON.stringify(codeSent));
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
      <form onSubmit={this.handleSubmit}>
        <label>Sau scrie codul direct aici:</label>
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
        <label>Denumire fisier:</label>
        <input
          type="text"
          name="fileName"
          value={this.state.fileName}
          placeholder="Numele fisierului"
          onChange={this.handleChange}
        />
        <br />
        <input
          type="submit"
          style={{ backgroundColor: "rgb(138, 15, 15)" }}
          value="Send code"
          onSubmit={this.handleSubmit}
        />
      </form>
    );
  }
}

export default Form;
