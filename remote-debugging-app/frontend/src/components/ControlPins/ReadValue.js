import React from "react";
import "./ControlPins.css";
import axios from "axios";
class ReadValue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      readValue: {
        PD4: "",
        PD5: "",
        PD6: "",
        PA1: "",
        PA2: "",
        PA3: "",
        PD3: "",
        PD2: "",
        PD1: "",
        PC7: "",
        PC6: "",
        PC5: "",
        PC4: "",
        PC3: "",
        PB4: "",
        PB5: "",
      },
    };
    this.handleReadSubmit = this.handleReadSubmit.bind(this);
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  componentDidMount() {
    this.readValues();
  }

  readValues() {
    axios.get("http://192.168.0.111:8082/get-values").then((res) => {
      console.log(res.data);
      const pinValues = res.data;
      this.setState({
        readValue: pinValues,
      });
    });
  }
  handleReadSubmit(event) {
    event.preventDefault();
    this.readValues();
  }

  render() {
    return (
      <div>
        <label className="right-text-read">Read</label>
        <ul className="left-read-value-list">
          <li>
            <input
              readOnly
              type="text"
              className="read-box"
              value={this.state.readValue.PD4}
            />
          </li>
          <li>
            <input
              readOnly
              type="text"
              className="read-box"
              value={this.state.readValue.PD5}
            />
          </li>
          <li>
            <input
              readOnly
              type="text"
              className="dropdownpd6-read-box-class"
              value={this.state.readValue.PD6}
            />
          </li>
          <li>
            <input
              readOnly
              type="text"
              className="read-box"
              value={this.state.readValue.PA1}
            />
          </li>
          <li>
            <input
              readOnly
              type="text"
              className="dropdownpa2-read-box-class"
              value={this.state.readValue.PA2}
            />
          </li>
          <li>
            <input
              readOnly
              type="text"
              className="read-box"
              value={this.state.readValue.PA3}
            />
          </li>
        </ul>
        <label className="left-text-read">Read</label>
        <ul className="right-read-value-list">
          <li>
            <input
              readOnly
              type="text"
              className="read-box"
              value={this.state.readValue.PD3}
            />
          </li>
          <li>
            <input
              readOnly
              type="text"
              className="read-box"
              value={this.state.readValue.PD2}
            />
          </li>
          <li>
            <input
              readOnly
              type="text"
              className="read-box"
              value={this.state.readValue.PD1}
            />
          </li>
          <li>
            <input
              readOnly
              type="text"
              className="read-box"
              value={this.state.readValueC7}
            />
          </li>
          <li>
            <input
              readOnly
              type="text"
              className="read-box"
              value={this.state.readValueC6}
            />
          </li>
          <li>
            <input
              readOnly
              type="text"
              className="read-box"
              value={this.state.readValuePC5}
            />
          </li>
          <li>
            <input
              readOnly
              type="text"
              className="read-box"
              value={this.state.readValuePC4}
            />
          </li>
          <li>
            <input
              readOnly
              type="text"
              className="read-box"
              value={this.state.readValuePC3}
            />
          </li>
          <li>
            <input
              readOnly
              type="text"
              className="read-box"
              value={this.state.readValuePB4}
            />
          </li>
          <li>
            <input
              readOnly
              type="text"
              className="read-box"
              value={this.state.readValuePB5}
            />
          </li>
        </ul>
        <button
          type="submit"
          id="button-read"
          className="button-controlpins"
          onClick={this.handleReadSubmit}
        >
          Read Values
        </button>
      </div>
    );
  }
}
export default ReadValue;
