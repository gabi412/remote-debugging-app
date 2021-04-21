import React from "react";
import "./ControlPins.css";

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
      isMounted: true,
    };
    this.handleReadValChange = this.handleReadValChange.bind(this);
  }
  componentWillUnmount() {
    this.setState({ isMounted: false });
  }
  async componentDidMount() {
    if (this.state.isMounted) {
      try {
        setInterval(async () => {
          const res = await fetch("http://192.168.0.111:8082/get-values");
          const pinValues = await res.json();
          //     console.log(pinValues);

          this.setState(
            {
              readValue: pinValues,
            },
            () => {
              console.log("In ReadValue ");
              console.log(this.state.readValue);
            }
          );
        }, 6000);
      } catch (e) {
        console.log(e);
      }
    }
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
              value={this.state.readValue.PD4}
              onChange={this.handleReadValChange}
            />
          </li>
          <li>
            <input
              size="1"
              type="text"
              className="read-box"
              value={this.state.readValue.PD5}
              onChange={this.handleReadValChange}
            />
          </li>
          <li>
            <input
              size="1"
              type="text"
              className="dropdownpd6-write-class"
              value={this.state.readValue.PD6}
              onChange={this.handleReadValChange}
            />
          </li>
          <li>
            <input
              size="1"
              type="text"
              className="read-box"
              value={this.state.readValue.PA1}
              onChange={this.handleReadValChange}
            />
          </li>
          <li>
            <input
              size="1"
              type="text"
              className="dropdownpa2-write-class"
              value={this.state.readValue.PA2}
              onChange={this.handleReadValChange}
            />
          </li>
          <li>
            <input
              size="1"
              type="text"
              className="read-box"
              value={this.state.readValue.PA3}
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
              value={this.state.readValue.PD3}
              onChange={this.handleReadValChange}
            />
          </li>
          <li>
            <input
              size="1"
              type="text"
              className="read-box"
              value={this.state.readValue.PD2}
              onChange={this.handleReadValChange}
            />
          </li>
          <li>
            <input
              size="1"
              type="text"
              className="read-box"
              value={this.state.readValue.PD1}
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
