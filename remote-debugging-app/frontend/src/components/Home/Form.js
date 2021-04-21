import React from "react";
import axios from "axios";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      codeValue: "//start coding",
      fileName: "",
      isLoading: false,
      isNameNull: true,

      scriptString: "",
      selectionStart: "",
      selectionEnd: "",

      compileOutput: "",
      flashing: false,
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
    event.preventDefault();
    this.setState({ isLoading: true });
    //  this.props.handleLoadingState(true);

    const codeBody = this.state.codeValue;
    const fileName = this.state.fileName;
    const codeSent = { codeBody, fileName };
    var regExFilename = new RegExp("^.+.c$");
    if (fileName.length < 2 || !regExFilename.test(fileName)) {
      alert(`Wrong filename.\nChoose a name like "filename.c"`);
      this.setState({ isNameNull: true });
    } else {
      this.setState({ isNameNull: false });
      axios
        .post("http://192.168.0.111:8082/code", codeSent)
        .catch((err) => {
          console.error("myerr " + err);
          alert("Something went wrong with the server..");
          this.setState({ isLoading: false });
        })
        .finally(() => {
          axios
            .get("http://192.168.0.111:8082/compile-output")
            .then((res) => {
              const compOut = JSON.stringify(res.data.data); //.replace( /(?:\r\n|\r|\n)/g,"\n" );
              //   console.log("res.data:" + JSON.stringify(res.data));
              this.setState({ compileOutput: compOut });
           //   console.log(compOut.replace(/(?:\r\n|\r|\n)/g, "\n"));
            })
            .finally(() => {
              this.setState({ isLoading: false });
              //  this.props.handleLoadingState(false);
            });
        });
    }
    console.log("frontend " + JSON.stringify(codeSent));
  }

  handleSubmitFlash(event) {
    event.preventDefault();
    console.log("flashing..");
    this.setState({ flashing: true }, function () {
      console.log("First Flashing val:" + this.state.flashing);
      axios
        .post("http://192.168.0.111:8082/flashing", {
          flashValue: this.state.flashing,
        })
        .catch((err) => {
          console.error(err);
        });
      this.setState({ flashing: false });
    });
    console.log("Last Flashing val:" + this.state.flashing);
  }

  handleKeyDown(event) {
    if (event.keyCode === 9) {
      // tab was pressed
      event.preventDefault();
      var val = this.state.scriptString;
      var start = event.target.selectionStart;
      var end = event.target.selectionEnd;

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
    if (this.state.isLoading && !this.state.isNameNull) {
      return <div>Compiling code...</div>;
    } else {
      return (
        <div id="div-form">
          <form onSubmit={this.handleSubmit}>
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
            <div id="flexbox-compileout-video">
              <div id="compile-output-div">
                <br />
                <label className="text-title">Compile output</label>
                <br />
                <textarea
                  id="compile-output-textarea"
                  value={this.state.compileOutput}
                  onChange={this.handleChange}
                />
              </div>
              <div id="video-div">
                <br />
                <p className="text-title">Visual output</p>
                <img
                  className="video-class"
                  src="http://192.168.0.111:8081/"
                  alt="streaming-video"
                ></img>
              </div>
            </div>
          </form>
          <form onSubmit={this.handleSubmitFlash}>
            <br />
            <h2>Flash target to STM8</h2>
            <button type="submit" className="button">
              Flash
            </button>
          </form>
        </div>
      );
    }
  }
}

export default Form;
