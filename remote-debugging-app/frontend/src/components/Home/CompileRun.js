import React from "react";
import axios from "axios";
import ReactLoading from "react-loading";
var CodeMirror = require("react-codemirror");

require("codemirror/lib/codemirror.css");
require("codemirror/theme/monokai.css");
require("codemirror/mode/clike/clike");
require("codemirror/mode/javascript/javascript");

class CompileRun extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      codeValue: "//start coding",
      fileName: "main.c",

      isLoading: false,
      flashing: false,

      compileOutput: "",
      flashOutput: "",

      compileError: false,
    };

    this.handleChangeCodeMirror = this.handleChangeCodeMirror.bind(this);
    this.handleSubmitCode = this.handleSubmitCode.bind(this);
    this.handleSubmitFlash = this.handleSubmitFlash.bind(this);
  }

  componentDidMount() {
    //    var file = localStorage.getItem("fileName");
    var code = localStorage.getItem("codeValue");

    if (code === null) {
      code = "//start coding";
    }
    this.setState({ codeValue: code });
    //  this.setState({ fileName: file });
  }

  
  handleSubmitCode(event) {
    event.preventDefault(); 
    this.setState({ isLoading: true });
    this.props.handleCompilingState(true);

    const codeBody = this.state.codeValue;
    const fileName = this.state.fileName;
    const codeSent = { codeBody, fileName };
    axios
      .post("http://192.168.0.197:8082/code", codeSent)
      .then((res) => {
        if (res) {
          const errorCompile = JSON.stringify(res.data.error);
          const compOut = this.parseOutput(JSON.stringify(res.data.output));
          if (errorCompile === "true") {
            this.setState({ compileError: true });
          } else {
            this.setState({ compileError: false });
          }
          this.setState({ compileOutput: compOut });
        }
      })
      .catch((err) => {
        console.error("myerr " + err);
        alert("Something went wrong with the server..");
        this.setState({ isLoading: false });
      })
      .finally(() => {
        this.setState({ isLoading: false });
        this.props.handleCompilingState(false);
      });
  }

  handleSubmitFlash(event) {
    event.preventDefault();

    this.setState({ flashing: true }, function () {
      axios
        .post("http://192.168.0.197:8082/flashing", {
          flashValue: this.state.flashing,
        })
        .then((data) => {
          //    console.log(this.state.flashing);
          //    console.log(data.data);
          this.setState({ flashOutput: this.parseOutput(data.data) });
        })
        .catch((err) => {
          console.error(err);
          alert("Something went wrong with the server..");
        })
        .finally(() => {
          this.setState({ flashing: false });
        });
    });
  }

  handleChangeCodeMirror(newCode) {
    this.setState({
      codeValue: newCode,
    });
    localStorage.setItem("codeValue", this.state.codeValue);
  }
  render() {
    let flashComponent;
    if (this.state.flashing) {
      flashComponent = (
        <div>
          <div className="conditional-div-text">Flashing</div>
          <ReactLoading
            type={"bubbles"}
            color={"#fffff"}
            height={80}
            width={80}
          />
        </div>
      );
    } else {
      flashComponent = (
        <div>
          <h2>Flash target to STM8</h2>
          <button
            type="submit"
            className="button-home"
            onClick={this.handleSubmitFlash}
          >
            Flash
          </button>
        </div>
      );
    }
    if (this.state.isLoading) {
      return (
        <div className="conditional-div">
          <div className="conditional-div-text">Compiling code</div>
          <ReactLoading
            type={"bubbles"}
            color={"#fffff"}
            height={80}
            width={80}
          />
        </div>
      );
    } else {
      return (
        <div id="div-form">
          <form onSubmit={this.handleSubmitCode}>
            <div id="textarea-div">
              <label className="label-description">
                Or write your code here:
              </label>
              <br />
              {this.state.fileName}
              <CodeMirror
                defaultValue={localStorage.getItem("codeValue")}
                value={this.state.codeValue}
                options={{
                  theme: "monokai",
                  tabSize: 5,
                  mode: "javascript", //clike nu ofera schimbari
                  lineNumbers: true,
                }}
                onChange={this.handleChangeCodeMirror}
              />

           
              <br />
              <input value="Compile" type="submit" className="button-home" />
            </div>
            <div id="flexbox-compileout-video">
              <div id="compile-output-div">
                <br />
                <label className="label-description">Compile output</label>
                <br />
                <textarea
                  readOnly
                  id="compile-output-textarea"
                  className={
                    this.state.compileError
                      ? "compile-output-error"
                      : "compile-output-noerror"
                  }
                  value={this.state.compileOutput}
                />
                <br />
                <br />
                {flashComponent}
                <br />
                <br />
                <label className="label-description">Flash output</label>
                <br />
                <textarea
                  readOnly
                  id="flash-output-textarea"
                  value={this.state.flashOutput}
                />
              </div>
              <div id="video-div">
                <br />
                <p className="label-description">Visual output</p>
                <img
                  className="video-class"
                  src="http://192.168.0.197:8081/"
                  alt="streaming-video"
                ></img>
              </div>
            </div>
          </form>
          <br />
        </div>
      );
    }
  }
}

export default CompileRun;
