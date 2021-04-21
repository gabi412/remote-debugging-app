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
  componentDidMount(){
  //  console.log(this.state.writeValList);
    
  }
  handleWriteValChange(event) {
    this.props.getWriteValCallback(this.state.writeValList);
    var pinName = event.target.value;
    var tempState = this.state.writeValList;
    switch (pinName) {
      case "0PD3":
      case "1PD3":
        tempState.PD3 = event.target.value;
        break;
      case "1PD2":
      case "0PD2":
        tempState.PD2 = event.target.value;
        break;
      case "1PD1":
      case "0PD1":
        tempState.PD1 = event.target.value;
        break;
      case "1PD6":
      case "0PD6":
        tempState.PD6 = event.target.value;
        break;
      case "1PD5":
      case "0PD5":
        tempState.PD5 = event.target.value;
        break;
      case "1PD4":
      case "0PD4":
        tempState.PD4 = event.target.value;
        break;
      case "1PC7":
      case "0PC7":
        tempState.PC7 = event.target.value;
        break;
      case "1PC6":
      case "0PC6":
        tempState.PC6 = event.target.value;
        break;
      case "1PC5":
      case "0PC5":
        tempState.PC5 = event.target.value;
        break;
      case "1PC4":
      case "0PC4":
        tempState.PC4 = event.target.value;
        break;
      case "1PC3":
      case "0PC3":
        tempState.PC3 = event.target.value;
        break;
      case "1PB4":
      case "0PB4":
        tempState.PB4 = event.target.value;
        break;
      case "1PB5":
      case "0PB5":
        tempState.PB5 = event.target.value;
        break;
      case "1PA1":
      case "0PA1":
        tempState.PA1 = event.target.value;
        break;
      case "1PA2":
      case "0PA2":
        tempState.PA2 = event.target.value;
        break;
      case "1PA3":
      case "0PA3":
        tempState.PA3 = event.target.value;
        break;
      default:
    }
    this.setState({ writeValList: tempState });
    console.log(this.state.writeValList);
  }
  render() {
    return (
      <div>
        {
          //console.log("aici "+this.props.inoutState.PD3[0])
        }
        <label className="right-text-write">Write</label>
        <ul className="right-write-value-list">
          <li>
            <select
              className="dropdown-class"
              name="configuration"
              value={this.PD3}
              disabled={
                this.props.inoutState.PD3[0] === "o" ? true : false
              }
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
              value={this.PD2}
              disabled={
                this.props.inoutState.PD2[0] === "o" ? true : false
              }
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
              value={this.PD1}
              disabled={
                this.props.inoutState.PD1[0] === "o" ? true : false
              }
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
              value={this.PC7}
              disabled={
                this.props.inoutState.PC7[0] === "o" ? true : false
              }
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
              value={this.PC6}
              disabled={
                this.props.inoutState.PC6[0] === "o" ? true : false
              }
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
            value={this.PC5}
            disabled={
              this.props.inoutState.PC5[0] === "o" ? true : false
            }
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
              value={this.PC4}
              disabled={
                this.props.inoutState.PC4[0] === "o" ? true : false
              }
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
            value={this.PC3}
            disabled={
              this.props.inoutState.PC3[0] === "o" ? true : false
            }
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
              value={this.PB4}
              disabled={
                this.props.inoutState.PB4[0] === "o" ? true : false
              }
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
              value={this.PB5}
              disabled={
                this.props.inoutState.PB5[0] === "o" ? true : false
              }
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
              className="dropdown-class"
              name="configuration"
              value={this.PD4}
              disabled={
                this.props.inoutState.PD4[0] === "o" ? true : false
              }
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
              value={this.PD5}
              disabled={
                this.props.inoutState.PD5[0] === "o" ? true : false
              }
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
              value={this.PD6}
              disabled={
                this.props.inoutState.PD6[0] === "o" ? true : false
              }
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
              value={this.PA1}
              disabled={
                this.props.inoutState.PA1[0] === "o" ? true : false
              }
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
              value={this.PA2}
              disabled={
                this.props.inoutState.PA2[0] === "o" ? true : false
              }
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
              value={this.PA3}
              disabled={
                this.props.inoutState.PA3[0] === "o" ? true : false
              }
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
