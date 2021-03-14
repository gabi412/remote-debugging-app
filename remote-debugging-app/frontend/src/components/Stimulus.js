import React from "react";
import photo from "../components/stm8blue-pinout.png"
class Stimulus extends React.Component {
  render() {
    return (
      <div>
        <div id="flexbox-compileout-video">
          <div id="stm8-schema">
            <br />
            <label className="text-title">Stm8 Schema</label>
            <br />
            <img
              className="stm8schema-class"
              src={photo}
              alt="Stm8 schema"
            ></img>
          </div>
          <div id="video-div">
            <br />
            <p className="text-title">Visual output</p>
            <img
              className="video-class"
              src="http://192.168.0.111:8081/"
              alt="streaming-video"
            ></img>
          </div>
        </div>
      </div>
    );
  }
}
export default Stimulus;
