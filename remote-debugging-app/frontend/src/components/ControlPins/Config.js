import React from "react";
import WriteValue from "./WriteValue";
import ReadValue from "./ReadValue";
import "./ControlPins.css";
import photo from "./stm8blue-pinout.png";

class Config extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      config: {
        PD4: "oPD4",
        PD5: "oPD5",
        PD6: "oPD6",
        PA1: "oPA1",
        PA2: "oPA2",
        PA3: "oPA3",
        PD3: "oPD3",
        PD2: "oPD2",
        PD1: "oPD1",
        PC7: "oPC7",
        PC6: "oPC6",
        PC5: "oPC5",
        PC4: "oPC4",
        PC3: "oPC3",
        PB4: "oPB4",
        PB5: "oPB5",
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

  handleInOutChange(event) {
    
    var tempState = this.state.config;
    var pinName = event.target.value; 
    Object.keys(tempState).forEach(function(key){ 
      if (pinName.substr(1,3) === key)
        tempState[key] = pinName;
    });
    this.setState({ config: tempState });
 //   console.log(this.state.config);
  }
 
  sendInOutChanges(event) {
    event.preventDefault();
    fetch("http://192.168.0.111:8082/config", {
      method: "POST",
      mode: "cors", 
      cache: "no-cache", 
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        configuration: this.state.config,
        values: this.state.valState,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
  //     console.log(data);
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
                onChange={this.handleInOutChange}
              >
                <option id="1" value="oPD3">
                  Output PD3
                </option>
                <option id="0" value="iPD3">
                  Input PD3
                </option>
              </select>
            </li>
            <li>
              <select
                className="dropdown-class"
                name="configuration"
                onChange={this.handleInOutChange}
              >
                <option id="1" value="oPD2">
                  Output PD2
                </option>
                <option id="0" value="iPD2">
                  Input PD2
                </option>
              </select>
            </li>
            <li>
              <select
                className="dropdown-class"
                name="configuration"
                onChange={this.handleInOutChange}
              >
                <option id="1" value="oPD1">
                  Output PD1
                </option>
                <option id="0" value="iPD1">
                  Input PD1
                </option>
              </select>
            </li>
            <li>
              <select
                className="dropdown-class"
                name="configuration"
                onChange={this.handleInOutChange}
              >
                <option id="1" value="oPC7">
                  Output PC7
                </option>
                <option id="0" value="iPC7">
                  Input PC7
                </option>
              </select>
            </li>
            <li>
              <select
                className="dropdown-class"
                name="configuration"
                onChange={this.handleInOutChange}
              >
                <option id="1" value="oPC6">
                  Output PC6
                </option>
                <option id="0" value="iPC6">
                  Input PC6
                </option>
              </select>
            </li>
            <select
              className="dropdown-class"
              name="configuration"
              onChange={this.handleInOutChange}
            >
              <option id="1" value="oPC5">
                Output PC5
              </option>
              <option id="0" value="iPC5">
                Input PC5
              </option>
            </select>
            <li>
              <select
                className="dropdown-class"
                name="configuration"
                onChange={this.handleInOutChange}
              >
                <option id="1" value="oPC4">
                  Output PC4
                </option>
                <option id="0" value="iPC4">
                  Input PC4
                </option>
              </select>
            </li>
            <select
              className="dropdown-class"
              name="configuration"
              onChange={this.handleInOutChange}
            >
              <option id="1" value="oPC3">
                Output PC3
              </option>
              <option id="0" value="iPC3">
                Input PC3
              </option>
            </select>
            <li>
              <select
                className="dropdown-class"
                name="configuration"
                onChange={this.handleInOutChange}
              >
                <option id="1" value="oPB4">
                  Output PB4
                </option>
                <option id="0" value="iPB4">
                  Input PB4
                </option>
              </select>
            </li>
            <li>
              <select
                className="dropdown-class"
                name="configuration"
                onChange={this.handleInOutChange}
              >
                <option id="1" value="oPB5">
                  Output PB5
                </option>
                <option id="0" value="iPB5">
                  Input PB5
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
                onChange={this.handleInOutChange}
              >
                <option id="1" value="oPD4">
                  Output PD4
                </option>
                <option id="0" value="iPD4">
                  Input PD4
                </option>
              </select>
            </li>
            <li>
              <select
                className="dropdown-class"
                name="configuration"
                onChange={this.handleInOutChange}
              >
                <option id="1" value="oPD5">
                  Output PD5
                </option>
                <option id="0" value="iPD5">
                  Input PD5
                </option>
              </select>
            </li>
            <li>
              <select
                className="dropdown-class"
                name="configuration"
                onChange={this.handleInOutChange}
              >
                <option id="1" value="oPD6">
                  Output PD6
                </option>
                <option id="0" value="iPD6">
                  Input PD6
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
                onChange={this.handleInOutChange}
              >
                <option id="1" value="oPA1">
                  Output PA1
                </option>
                <option id="0" value="iPA1">
                  Input PA1
                </option>
              </select>
            </li>
            <li>
              <select
                className="dropdown-class"
                name="configuration"
                onChange={this.handleInOutChange}
              >
                <option id="1" value="oPA2">
                  Output PA2
                </option>
                <option id="0" value="iPA2">
                  Input PA2
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
                onChange={this.handleInOutChange}
              >
                <option id="1" value="oPA3">
                  Output PA3
                </option>
                <option id="0" value="iPA3">
                  Input PA3
                </option>
              </select>
            </li>
          </ul>

          <button
            type="submit"
            className="button-controlpins"
            id="button-config"
            onClick={this.sendInOutChanges}
          >
            Apply changes
          </button>
        </div>
      </div>
    );
  }
}
export default Config;