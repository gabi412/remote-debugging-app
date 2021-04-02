import React from "react";
import "./ControlPins.css";
import photo from "./stm8blue-pinout.png";
import WriteValue from "./WriteValue";
import axios from "axios";

class Config extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      config: {
        inoutValuePD3: "iPD3",
        inoutValuePD2: "iPD2",
        inoutValuePD1: "iPD1",
        inoutValuePC7: "iPC7",
        inoutValuePC6: "iPC6",
        inoutValuePC5: "iPC5",
        inoutValuePC4: "iPC4",
        inoutValuePC3: "iPC3",
        inoutValuePB4: "iPB4",
        inoutValuePB5: "iPB5",
        inoutValuePD4: "iPD4",
        inoutValuePD5: "iPD5",
        inoutValuePD6: "iPD6",
        inoutValuePA1: "iPA1",
        inoutValuePA2: "iPA2",
        inoutValuePA3: "iPA3",
      },
      valState: null
    };
    this.handleInOutChange = this.handleInOutChange.bind(this);
    this.sendInOutChanges = this.sendInOutChanges.bind(this);
    this.getWriteVal = this.getWriteVal.bind(this);
  }
  
  getWriteVal(writeVal){
    this.setState({valState:writeVal})
  }

  handleInOutChange(event) {
    var pinName = event.target.value;
    var tempState = this.state.config;
    switch (pinName) {
      case "oPD3":
      case "iPD3":
        tempState.inoutValuePD3 = event.target.value;
        break;
      case "iPD2":
      case "oPD2":
        tempState.inoutValuePD2 = event.target.value;
        break;
      case "iPD1":
      case "oPD1":
        tempState.inoutValuePD1 = event.target.value;
        break;
      case "iPD6":
      case "oPD6":
        tempState.inoutValuePD6 = event.target.value;
        break;
      case "iD5":
      case "oPD5":
        tempState.inoutValuePD5 = event.target.value;
        break;
      case "iPD4":
      case "oPD4":
        tempState.inoutValuePD4 = event.target.value;
        break;
      case "iPC7":
      case "oPC7":
        tempState.inoutValuePC7 = event.target.value;
        break;
      case "iPC6":
      case "oPC6":
        tempState.inoutValuePC6 = event.target.value;
        break;
      case "iPC5":
      case "oPC5":
        tempState.inoutValuePC5 = event.target.value;
        break;
      case "iPC4":
      case "oPC4":
        tempState.inoutValuePC4 = event.target.value;
        break;
      case "iPC3":
      case "oPC3":
        tempState.inoutValuePC3 = event.target.value;
        break;
      case "iPB4":
      case "oPB4":
        tempState.inoutValuePB4 = event.target.value;
        break;
      case "iPB5":
      case "oPB5":
        tempState.inoutValuePB5 = event.target.value;
        break;
      case "iPA1":
      case "oPA1":
        tempState.inoutValuePA1 = event.target.value;
        break;
      case "iPA2":
      case "oPA2":
        tempState.inoutValuePA2 = event.target.value;
        break;
      case "iPA3":
      case "oPA3":
        tempState.inoutValuePA3 = event.target.value;
        break;
      default:
    }
    this.setState({ config: tempState });
  //  console.log(this.state.config);
  }

  sendInOutChanges(event) {
    event.preventDefault();
    axios
      .post("http://192.168.0.111:8082/config", {
        configuration: this.state.config,
        values:this.state.valState
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    return (
      <div>
        {console.log(this.state.valState)}
        <div id="stm8-schema">
          <br />
          <label className="text-title">Stm8 schema</label>
          <br />
          <img className="stm8schema-image" src={photo} alt="Stm8 schema"></img>

          {/* set input/output list for right side pins */}
          <ul className="right-configuration-list">
            <li>
              <select
                className="dropdown-class"
                name="configuration"
                value={this.inoutValuePD3}
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
                value={this.inoutValuePD2}
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
                value={this.inoutValuePD1}
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
                value={this.inoutValuePC7}
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
                value={this.inoutValuePC6}
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
              value={this.inoutValuePC5}
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
                value={this.inoutValuePC4}
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
              value={this.inoutValuePC3}
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
                value={this.inoutValuePB4}
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
                value={this.inoutValuePB5}
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

          <WriteValue getWriteValCallback = {this.getWriteVal} />

          {/* set input/output list for left side pins */}

          <ul className="left-configuration-list">
            <li>
              <select
                className="dropdown-class"
                name="configuration"
                value={this.inoutValuePD4}
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
                value={this.inoutValuePD5}
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
                value={this.inoutValuePD6}
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
                value={this.inoutValuePA1}
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
                value={this.inoutValuePA2}
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
                value={this.inoutValuePA3}
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
            <input
              type="submit"
              className="button-config"
              value="Apply changes"
              onSubmit={this.sendInOutChanges}
            />
          </form>
        </div>
      </div>
    );
  }
}
export default Config;
