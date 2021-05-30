import React from "react";
import "./ControlPins.css";

class WriteValue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      writeValList: {
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
    this.handleWriteValChange = this.handleWriteValChange.bind(this);
  }

  handleWriteValChange(event) {
    this.props.getWriteValCallback(this.state.writeValList);
    var pinName = event.target.value;
    var tempState = this.state.writeValList;

    Object.keys(tempState).forEach(function(key){ 
      if (pinName.substr(1,3) === key)
        tempState[key] = pinName;
    });
    this.setState({ writeValList: tempState });
    console.log(this.state.writeValList);
  }
  render() {
    return (
      <div>
  
        <label className="right-text-write">Write</label>
        <ul className="right-write-value-list">
          <li>
            <select
              className="dropdown-write-class"
              name="configuration"
              disabled={this.props.inoutState.PD3[0] === "o" ? true : false}
              onChange={this.handleWriteValChange}
            >
              <option id="0" value="0PD3">
                0
              </option>
              <option id="1" value="1PD3">
                1
              </option>
            </select>
          </li>
          <li>
            <select
              className="dropdown-write-class"
              name="configuration"
              disabled={this.props.inoutState.PD2[0] === "o" ? true : false}
              onChange={this.handleWriteValChange}
            >
              <option id="0" value="0PD2">
                0
              </option>
              <option id="1" value="1PD2">
                1
              </option>
            </select>
          </li>
          <li>
            <select
              className="dropdown-write-class"
              name="configuration"
              disabled={this.props.inoutState.PD1[0] === "o" ? true : false}
              onChange={this.handleWriteValChange}
            >
              <option id="0" value="0PD1">
                0
              </option>
              <option id="1" value="1PD1">
                1
              </option>
            </select>
          </li>
          <li>
            <select
              className="dropdown-write-class"
              name="configuration"
              disabled={this.props.inoutState.PC7[0] === "o" ? true : false}
              onChange={this.handleWriteValChange}
            >
              <option id="0" value="0PC7">
                0
              </option>
              <option id="1" value="1PC7">
                1
              </option>
            </select>
          </li>
          <li>
            <select
              className="dropdown-write-class"
              name="configuration"
              disabled={this.props.inoutState.PC6[0] === "o" ? true : false}
              onChange={this.handleWriteValChange}
            >
              <option id="0" value="0PC6">
                0
              </option>
              <option id="1" value="1PC6">
                1
              </option>
            </select>
          </li>
          <select
            className="dropdown-write-class"
            name="configuration"
            disabled={this.props.inoutState.PC5[0] === "o" ? true : false}
            onChange={this.handleWriteValChange}
          >
            <option id="0" value="0PC5">
              0
            </option>
            <option id="1" value="1PC5">
              1
            </option>
          </select>
          <li>
            <select
              className="dropdown-write-class"
              name="configuration"
              disabled={this.props.inoutState.PC4[0] === "o" ? true : false}
              onChange={this.handleWriteValChange}
            >
              <option id="0" value="0PC4">
                0
              </option>
              <option id="1" value="1PC4">
                1
              </option>
            </select>
          </li>
          <select
            className="dropdown-write-class"
            name="configuration"
            disabled={this.props.inoutState.PC3[0] === "o" ? true : false}
            onChange={this.handleWriteValChange}
          >
            <option id="0" value="0PC3">
              0
            </option>
            <option id="1" value="1PC3">
              1
            </option>
          </select>
          <li>
            <select
              className="dropdown-write-class"
              name="configuration"
              disabled={this.props.inoutState.PB4[0] === "o" ? true : false}
              onChange={this.handleWriteValChange}
            >
              <option id="0" value="0PB4">
                0
              </option>
              <option id="1" value="1PB4">
                1
              </option>
            </select>
          </li>
          <li>
            <select
              className="dropdown-write-class"
              name="configuration"
              disabled={this.props.inoutState.PB5[0] === "o" ? true : false}
              onChange={this.handleWriteValChange}
            >
              <option id="0" value="0PB5">
                0
              </option>
              <option id="1" value="1PB5">
                1
              </option>
            </select>
          </li>
        </ul>
        <label className="left-text-write">Write</label>
        <ul className="left-write-value-list">
          <li>
            <select
              className="dropdown-write-class"
              name="configuration"
              disabled={this.props.inoutState.PD4[0] === "o" ? true : false}
              onChange={this.handleWriteValChange}
            >
              <option id="0" value="0PD4">
                0
              </option>
              <option id="1" value="1PD4">
                1
              </option>
            </select>
          </li>
          <li>
            <select
              className="dropdown-write-class"
              name="configuration"
              disabled={this.props.inoutState.PD5[0] === "o" ? true : false}
              onChange={this.handleWriteValChange}
            >
              <option id="0" value="0PD5">
                0
              </option>
              <option id="1" value="1PD5">
                1
              </option>
            </select>
          </li>
          <li>
            <select
              className="dropdownpd6-write-class"
              name="configuration"
              disabled={this.props.inoutState.PD6[0] === "o" ? true : false}
              onChange={this.handleWriteValChange}
            >
              <option id="0" value="0PD6">
                0
              </option>
              <option id="1" value="1PD6">
                1
              </option>
            </select>
          </li>
          <li></li>
          <li>
            <select
              className="dropdown-write-class"
              name="configuration"
              disabled={this.props.inoutState.PA1[0] === "o" ? true : false}
              onChange={this.handleWriteValChange}
            >
              <option id="0" value="0PA1">
                0
              </option>
              <option id="1" value="1PA1">
                1
              </option>
            </select>
          </li>
          <li>
            <select
              className="dropdownpa2-write-class"
              name="configuration"
              disabled={this.props.inoutState.PA2[0] === "o" ? true : false}
              onChange={this.handleWriteValChange}
            >
              <option id="0" value="0PA2">
                0
              </option>
              <option id="1" value="1PA2">
                1
              </option>
            </select>
          </li>

          <li>
            <select
              className="dropdown-write-class"
              name="configuration"
              disabled={this.props.inoutState.PA3[0] === "o" ? true : false}
              onChange={this.handleWriteValChange}
            >
              <option id="0" value="0PA3">
                0
              </option>
              <option id="1" value="1PA3">
                1
              </option>
            </select>
          </li>
        </ul>
      </div>
    );
  }
}
export default WriteValue;
