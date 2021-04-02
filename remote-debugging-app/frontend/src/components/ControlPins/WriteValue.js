import React from "react";
import "./ControlPins.css";

class WriteValue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      writeValList: {
        writeValuePD3: "0PD3",
        writeValuePD2: "0PD2",
        writeValuePD1: "0PD1",
        writeValuePC7: "0PC7",
        writeValuePC6: "0PC6",
        writeValuePC5: "0PC5",
        writeValuePC4: "0PC4",
        writeValuePC3: "0PC3",
        writeValuePB4: "0PB4",
        writeValuePB5: "0PB5",
        writeValuePD4: "0PD4",
        writeValuePD5: "0PD5",
        writeValuePD6: "0PD6",
        writeValuePA1: "0PA1",
        writeValuePA2: "0PA2",
        writeValuePA3: "0PA3",
      },
    };
    this.handleWriteValChange = this.handleWriteValChange.bind(this);
    //   this.sendInOutChanges = this.sendInOutChanges.bind(this);
  }

  handleWriteValChange(event) {
    this.props.getWriteValCallback(this.state.writeValList)
    var pinName = event.target.value;
    var tempState = this.state.writeValList;
    switch (pinName) {
      case "0PD3":
      case "1PD3":
        tempState.writeValuePD3 = event.target.value;
        break;
      case "1PD2":
      case "0PD2":
        tempState.writeValuePD2 = event.target.value;
        break;
      case "1PD1":
      case "0PD1":
        tempState.writeValuePD1 = event.target.value;
        break;
      case "1PD6":
      case "0PD6":
        tempState.writeValuePD6 = event.target.value;
        break;
      case "iD5":
      case "0PD5":
        tempState.writeValuePD5 = event.target.value;
        break;
      case "1PD4":
      case "0PD4":
        tempState.writeValuePD4 = event.target.value;
        break;
      case "1PC7":
      case "0PC7":
        tempState.writeValuePC7 = event.target.value;
        break;
      case "1PC6":
      case "0PC6":
        tempState.writeValuePC6 = event.target.value;
        break;
      case "1PC5":
      case "0PC5":
        tempState.writeValuePC5 = event.target.value;
        break;
      case "1PC4":
      case "0PC4":
        tempState.writeValuePC4 = event.target.value;
        break;
      case "1PC3":
      case "0PC3":
        tempState.writeValuePC3 = event.target.value;
        break;
      case "1PB4":
      case "0PB4":
        tempState.writeValuePB4 = event.target.value;
        break;
      case "1PB5":
      case "0PB5":
        tempState.writeValuePB5 = event.target.value;
        break;
      case "1PA1":
      case "0PA1":
        tempState.writeValuePA1 = event.target.value;
        break;
      case "1PA2":
      case "0PA2":
        tempState.writeValuePA2 = event.target.value;
        break;
      case "1PA3":
      case "0PA3":
        tempState.writeValuePA3 = event.target.value;
        break;
      default:
    }
    this.setState({writeValList : tempState})
    console.log(this.state.writeValList);
  }
  render() {
    return (
      <div>
        <ul className="right-write-value-list">
          <li>
            <select
              className="dropdown-class"
              name="configuration"
              value={this.writeValuePD3}
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
              className="dropdown-class"
              name="configuration"
              value={this.writeValuePD2}
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
              className="dropdown-class"
              name="configuration"
              value={this.writeValuePD1}
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
              className="dropdown-class"
              name="configuration"
              value={this.writeValuePC7}
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
              className="dropdown-class"
              name="configuration"
              value={this.writeValuePC6}
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
            className="dropdown-class"
            name="configuration"
            value={this.writeValuePC5}
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
              className="dropdown-class"
              name="configuration"
              value={this.writeValuePC4}
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
            className="dropdown-class"
            name="configuration"
            value={this.writeValuePC3}
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
              className="dropdown-class"
              name="configuration"
              value={this.writeValuePB4}
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
              className="dropdown-class"
              name="configuration"
              value={this.writeValuePB5}
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
        <ul className="left-write-value-list">
          <li>
            <select
              className="dropdown-class"
              name="configuration"
              value={this.writeValuePD4}
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
              className="dropdown-class"
              name="configuration"
              value={this.writeValuePD5}
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
              className="dropdown-write-class"
              name="configuration"
              value={this.writeValuePD6}
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
              className="dropdown-class"
              name="configuration"
              value={this.writeValuePA1}
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
              value={this.writeValuePA2}
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
              className="dropdown-class"
              name="configuration"
              value={this.writeValuePA3}
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
