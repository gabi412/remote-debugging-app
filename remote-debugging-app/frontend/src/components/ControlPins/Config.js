import React from "react";
import "./ControlPins.css";
import photo from "./stm8blue-pinout.png";
import WriteValue from "./WriteValue";
import ReadValue from "./ReadValue";

class Config extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      config: {
        PD4: "iPD4",
        PD5: "iPD5",
        PD6: "iPD6",
        PA1: "iPA1",
        PA2: "iPA2",
        PA3: "iPA3",
        PD3: "iPD3",
        PD2: "iPD2",
        PD1: "iPD1",
        PC7: "iPC7",
        PC6: "iPC6",
        PC5: "iPC5",
        PC4: "iPC4",
        PC3: "iPC3",
        PB4: "iPB4",
        PB5: "iPB5",
      },
      valState: {
        PD4: "0PD4",
        PD5: "0PD5",
        PD6: "0PD6",
        PA1: "0PA1",
        PA2: "0PA2",
        PA3: "0PA3",
        PD3: "0PD3",
        PD2: "0PD2",
        PD1: "0PD1",
        PC7: "0PC7",
        PC6: "0PC6",
        PC5: "0PC5",
        PC4: "0PC4",
        PC3: "0PC3",
        PB4: "0PB4",
        PB5: "0PB5",
      },
    };
    this.handleInOutChange = this.handleInOutChange.bind(this);
    this.sendInOutChanges = this.sendInOutChanges.bind(this);
    this.getWriteVal = this.getWriteVal.bind(this);
  }

  getWriteVal(writeVal) {
    this.setState({ valState: writeVal });
  }

  componentDidMount() {
    // this.setState({valstate:})

    console.log("in config " + this.state.valState);
  }

  handleInOutChange(event) {
    var pinName = event.target.value;
    var tempState = this.state.config;
    switch (pinName) {
      case "oPD3":
      case "iPD3":
        tempState.PD3 = event.target.value;
        break;
      case "iPD2":
      case "oPD2":
        tempState.PD2 = event.target.value;
        break;
      case "iPD1":
      case "oPD1":
        tempState.PD1 = event.target.value;
        break;
      case "iPD6":
      case "oPD6":
        tempState.PD6 = event.target.value;
        break;
      case "iPD5":
      case "oPD5":
        tempState.PD5 = event.target.value;
        break;
      case "iPD4":
      case "oPD4":
        tempState.PD4 = event.target.value;
        break;
      case "iPC7":
      case "oPC7":
        tempState.PC7 = event.target.value;
        break;
      case "iPC6":
      case "oPC6":
        tempState.PC6 = event.target.value;
        break;
      case "iPC5":
      case "oPC5":
        tempState.PC5 = event.target.value;
        break;
      case "iPC4":
      case "oPC4":
        tempState.PC4 = event.target.value;
        break;
      case "iPC3":
      case "oPC3":
        tempState.PC3 = event.target.value;
        break;
      case "iPB4":
      case "oPB4":
        tempState.PB4 = event.target.value;
        break;
      case "iPB5":
      case "oPB5":
        tempState.PB5 = event.target.value;
        break;
      case "iPA1":
      case "oPA1":
        tempState.PA1 = event.target.value;
        break;
      case "iPA2":
      case "oPA2":
        tempState.PA2 = event.target.value;
        break;
      case "iPA3":
      case "oPA3":
        tempState.PA3 = event.target.value;
        break;
      default:
    }
    this.setState({ config: tempState });
    //  console.log(this.state.config);
  }

  sendInOutChanges(event) {
    event.preventDefault();
    /*
    axios
      .post("http://192.168.0.111:8082/config", {
        configuration: this.state.config,
        values: this.state.valState,
      })
      .catch((err) => {
        console.error(err);
      });
      */
    fetch("http://192.168.0.111:8082/config", {
      method: "POST",
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        configuration: this.state.config,
        values: this.state.valState,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  render() {
    return (
      <div>
        <div id="stm8-schema">
          <br />
          <label className="text-title">Stm8 schema</label>
          <br />
          <img className="stm8schema-image" src={photo} alt="Stm8 schema"></img>

          {/* set input/output list for right side pins */}
          <label className="right-text-config">Config</label>

          <ul className="right-configuration-list">
            <li>
              <select
                className="dropdown-class"
                name="configuration"
                value={this.PD3}
                onChange={this.handleInOutChange}
              >
                <option id="0" value="iPD3">
                  Input PD3
                </option>
                <option id="1" value="oPD3">
                  Output PD3
                </option>
              </select>
            </li>
            <li>
              <select
                className="dropdown-class"
                name="configuration"
                value={this.PD2}
                onChange={this.handleInOutChange}
              >
                <option id="0" value="iPD2">
                  Input PD2
                </option>
                <option id="1" value="oPD2">
                  Output PD2
                </option>
              </select>
            </li>
            <li>
              <select
                className="dropdown-class"
                name="configuration"
                value={this.PD1}
                onChange={this.handleInOutChange}
              >
                <option id="0" value="iPD1">
                  Input PD1
                </option>
                <option id="1" value="oPD1">
                  Output PD1
                </option>
              </select>
            </li>
            <li>
              <select
                className="dropdown-class"
                name="configuration"
                value={this.PC7}
                onChange={this.handleInOutChange}
              >
                <option id="0" value="iPC7">
                  Input PC7
                </option>
                <option id="1" value="oPC7">
                  Output PC7
                </option>
              </select>
            </li>
            <li>
              <select
                className="dropdown-class"
                name="configuration"
                value={this.PC6}
                onChange={this.handleInOutChange}
              >
                <option id="0" value="iPC6">
                  Input PC6
                </option>
                <option id="1" value="oPC6">
                  Output PC6
                </option>
              </select>
            </li>
            <select
              className="dropdown-class"
              name="configuration"
              value={this.PC5}
              onChange={this.handleInOutChange}
            >
              <option id="0" value="iPC5">
                Input PC5
              </option>
              <option id="1" value="oPC5">
                Output PC5
              </option>
            </select>
            <li>
              <select
                className="dropdown-class"
                name="configuration"
                value={this.PC4}
                onChange={this.handleInOutChange}
              >
                <option id="0" value="iPC4">
                  Input PC4
                </option>
                <option id="1" value="oPC4">
                  Output PC4
                </option>
              </select>
            </li>
            <select
              className="dropdown-class"
              name="configuration"
              value={this.PC3}
              onChange={this.handleInOutChange}
            >
              <option id="0" value="iPC3">
                Input PC3
              </option>
              <option id="1" value="oPC3">
                Output PC3
              </option>
            </select>
            <li>
              <select
                className="dropdown-class"
                name="configuration"
                value={this.PB4}
                onChange={this.handleInOutChange}
              >
                <option id="0" value="iPB4">
                  Input PB4
                </option>
                <option id="1" value="oPB4">
                  Output PB4
                </option>
              </select>
            </li>
            <li>
              <select
                className="dropdown-class"
                name="configuration"
                value={this.PB5}
                onChange={this.handleInOutChange}
              >
                <option id="0" value="iPB5">
                  Input PB5
                </option>
                <option id="1" value="oPB5">
                  Output PB5
                </option>
              </select>
            </li>
          </ul>

          {/* set 0/1 value list for all pins */}

          <WriteValue
            getWriteValCallback={this.getWriteVal}
            inoutState={this.state.config}
          />
          <ReadValue />

          {/* set input/output list for left side pins */}
          <label className="left-text-config">Config</label>

          <ul className="left-configuration-list">
            <li>
              <select
                className="dropdown-class"
                name="configuration"
                value={this.PD4}
                onChange={this.handleInOutChange}
              >
                <option id="0" value="iPD4">
                  Input PD4
                </option>
                <option id="1" value="oPD4">
                  Output PD4
                </option>
              </select>
            </li>
            <li>
              <select
                className="dropdown-class"
                name="configuration"
                value={this.PD5}
                onChange={this.handleInOutChange}
              >
                <option id="0" value="iPD5">
                  Input PD5
                </option>
                <option id="1" value="oPD5">
                  Output PD5
                </option>
              </select>
            </li>
            <li>
              <select
                className="dropdown-class"
                name="configuration"
                value={this.PD6}
                onChange={this.handleInOutChange}
              >
                <option id="0" value="iPD6">
                  Input PD6
                </option>
                <option id="1" value="oPD6">
                  Output PD6
                </option>
              </select>
            </li>
            <li>
              <label className="stm8-label" name="configuration">
                NRST
              </label>
            </li>
            <li>
              <select
                className="dropdown-class"
                name="configuration"
                value={this.PA1}
                onChange={this.handleInOutChange}
              >
                <option id="0" value="iPA1">
                  Input PA1
                </option>
                <option id="1" value="oPA1">
                  Output PA1
                </option>
              </select>
            </li>
            <li>
              <select
                className="dropdown-class"
                name="configuration"
                value={this.PA2}
                onChange={this.handleInOutChange}
              >
                <option id="0" value="iPA2">
                  Input PA2
                </option>
                <option id="1" value="oPA2">
                  Output PA2
                </option>
              </select>
            </li>
            <li>
              <label className="stm8-label" name="configuration">
                V<sub>SS</sub>
              </label>
            </li>
            <li>
              <label className="stm8-label" name="configuration">
                VCAP
              </label>
            </li>
            <li>
              <label className="stm8-label" name="configuration">
                V<sub>DD</sub>
              </label>
            </li>
            <li>
              <select
                className="dropdown-class"
                name="configuration"
                value={this.PA3}
                onChange={this.handleInOutChange}
              >
                <option id="0" value="iPA3">
                  Input PA3
                </option>
                <option id="1" value="oPA3">
                  Output PA3
                </option>
              </select>
            </li>
          </ul>
          <form onSubmit={this.sendInOutChanges}>
            <button type="submit" className="button-config">
              Apply changes
            </button>
          </form>
        </div>
      </div>
    );
  }
}
export default Config;
