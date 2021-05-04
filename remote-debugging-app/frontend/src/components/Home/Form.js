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

      selectionStart: "",
      selectionEnd: "",

      compileOutput: "",
      flashing: false,
      flashOutput: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleSubmitFlash = this.handleSubmitFlash.bind(this);
    this.parseOutput = this.parseOutput.bind(this);
  }

  componentDidMount() {
    this.setState({ codeValue: localStorage.getItem("codeValue") });
    this.setState({ fileName: localStorage.getItem("fileName") });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    localStorage.setItem(event.target.name, event.target.value);
    //  console.log(event.target.name);
  }
  parseOutput(output) {
    output = output.replaceAll("./public/programs-sent/", "");
    output = output.replaceAll("\\n", "\n");
    output = output.replace(/"+/g, " ");
    return output;
  }
  handleSubmit(event) {
    event.preventDefault();
    this.setState({ isLoading: true });
    this.props.handleLoadingState(true);

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
        .then((res) => {
          if (res) {
            const compOut = this.parseOutput(JSON.stringify(res.data));
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
          this.props.handleLoadingState(false);
        });
    }
  }

  handleSubmitFlash(event) {
    event.preventDefault();
    console.log("flashing..");
    this.setState({ flashing: true }, function () {
      axios
        .post("http://192.168.0.111:8082/flashing", {
          flashValue: this.state.flashing,
        })
        .then((data) => {
          console.log(data.data);
          this.setState({ flashOutput: this.parseOutput(data.data) });
        })
        .catch((err) => {
          console.error(err);
        });
      this.setState({ flashing: false });
    });
  }
  handleKeyDown(event) {
    if (event.keyCode === 9) {
      event.preventDefault();
      var val = this.state.codeValue;
      var start = event.target.selectionStart;
      var end = event.target.selectionEnd;

      this.setState(
        {
          codeValue: val.substring(0, start) + "\t" + val.substring(end),
        },
        () => {
          start = end = start + 1;
          return false;
        }
      );
    }
  }
  render() {
    if (this.state.isLoading && !this.state.isNameNull) {
      return <div className="conditional-div">Compiling code...</div>;
    } else {
      return (
        <div id="div-form">
          <form onSubmit={this.handleSubmit}>
            <div id="textarea-div">
              <label>Or write your code here:</label>
              <br />
              <textarea
                id="code-textarea-id"
                name="codeValue"
                className="code-textarea-class"
                value={this.state.codeValue}
                onChange={this.handleChange}
                onKeyDown={this.handleKeyDown}
              />
              <br />
              <br />
              <label className="label-description">Filename:&nbsp;</label>
              <input
                className="filename-input"
                type="text"
                name="fileName"
                value={this.state.fileName}
                onChange={this.handleChange}
              />
              <br />
              <button
                type="submit"
                className="button-home"
                onClick={this.handleSubmit}
              >
                Compile
              </button>
            </div>
            <div id="flexbox-compileout-video">
              <div id="compile-output-div">
                <br />
                <label className="label-description">Compile output</label>
                <br />
                <textarea
                  id="compile-output-textarea"
                  value={this.state.compileOutput}
                  onChange={this.handleChange}
                />
                <br />
                <br />
                <h2>Flash target to STM8</h2>
                <button
                  type="submit"
                  className="button-home"
                  onClick={this.handleSubmitFlash}
                >
                  Flash
                </button>
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
                  src="http://192.168.0.111:8081/"
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

export default Form;
