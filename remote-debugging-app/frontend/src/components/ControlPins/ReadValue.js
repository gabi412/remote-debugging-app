import React from "react";
import axios from "axios";
import "./ControlPins.css";

class ReadValue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      readValuePD4: "",
      readValuePD5: "",
    };
    this.handleReadValChange = this.handleReadValChange.bind(this);
  }
  componentDidMount() {
    axios
      .get("http://192.168.0.111:8082/get-values")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  handleReadValChange() {}
  render() {
    return (
      <div>
        <label className="right-text-read">Read</label>
        <ul className="left-read-value-list">
          <li>
            <input
              size="1"
              type="text"
              className="read-box"
              value={this.state.readValuePD4}
              onChange={this.handleReadValChange}
            />
          </li>
          <li>
            <input
              size="1"
              type="text"
              className="read-box"
              value={this.state.readValuePD5}
              onChange={this.handleReadValChange}
            />
          </li>
          <li>
            <input
              size="1"
              type="text"
              className="dropdownpd6-write-class"
              value={this.state.readValuePD3}
              onChange={this.handleReadValChange}
            />
          </li>
          <li>
            <input
              size="1"
              type="text"
              className="read-box"
              value={this.state.readValuePD3}
              onChange={this.handleReadValChange}
            />
          </li>
          <li>
            <input
              size="1"
              type="text"
              className="dropdownpa2-write-class"
              value={this.state.readValuePD3}
              onChange={this.handleReadValChange}
            />
          </li>
          <li>
            <input
              size="1"
              type="text"
              className="read-box"
              value={this.state.readValuePD3}
              onChange={this.handleReadValChange}
            />
          </li>
        </ul>
        <label className="left-text-read">Read</label>
        <ul className="right-read-value-list">
          <li>
            <input
              size="1"
              type="text"
              className="read-box"
              value={this.state.readValuePD4}
              onChange={this.handleReadValChange}
            />
          </li>
          <li>
            <input
              size="1"
              type="text"
              className="read-box"
              value={this.state.readValuePD4}
              onChange={this.handleReadValChange}
            />
          </li>
          <li>
            <input
              size="1"
              type="text"
              className="read-box"
              value={this.state.readValuePD4}
              onChange={this.handleReadValChange}
            />
          </li>
          <li>
            <input
              size="1"
              type="text"
              className="read-box"
              value={this.state.readValuePD4}
              onChange={this.handleReadValChange}
            />
          </li>
          <li>
            <input
              size="1"
              type="text"
              className="read-box"
              value={this.state.readValuePD4}
              onChange={this.handleReadValChange}
            />
          </li>
          <li>
            <input
              size="1"
              type="text"
              className="read-box"
              value={this.state.readValuePD4}
              onChange={this.handleReadValChange}
            />
          </li>
          <li>
            <input
              size="1"
              type="text"
              className="read-box"
              value={this.state.readValuePD4}
              onChange={this.handleReadValChange}
            />
          </li>
          <li>
            <input
              size="1"
              type="text"
              className="read-box"
              value={this.state.readValuePD4}
              onChange={this.handleReadValChange}
            />
          </li>
          <li>
            <input
              size="1"
              type="text"
              className="read-box"
              value={this.state.readValuePD4}
              onChange={this.handleReadValChange}
            />
          </li>
          <li>
            <input
              size="1"
              type="text"
              className="read-box"
              value={this.state.readValuePD4}
              onChange={this.handleReadValChange}
            />
          </li>
        </ul>
      </div>
    );
  }
}
export default ReadValue;
