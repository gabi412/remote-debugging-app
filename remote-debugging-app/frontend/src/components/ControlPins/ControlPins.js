import React from "react";
import "./ControlPins.css";
import Config from "./Config";
class ControlPins extends React.Component {
  render() {
    return (
      <div id="flexbox-schema-video-stimulus">
        <div id="video-div-stimulus">
          <br />
          <p className="text-title">Visual output</p>
          <img
            className="video-class"
            src="http://192.168.0.111:8081/"
            alt="streaming-video"
          ></img>
        </div>
        <Config />
      </div>
    );
  }
}
export default ControlPins;
