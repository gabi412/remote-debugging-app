import React from "react";
import axios from "axios";

class LoadFile extends React.Component {
  state = {
    // initial, niciun fisier nu este selectat
    selectedFile: null,
    valid: false,
  };

  // la selectarea unui fisier
  onFileChange = (event) => {
    this.setState({ selectedFile: event.target.files[0], loaded: 0 });
  };

  onFileUpload = () => {
    // creare obiect de tip FormData
    const data = new FormData();
    data.append("file", this.state.selectedFile);
    
    if (this.state.selectedFile != null) {
      var extension = this.state.selectedFile.name.split(".")[1];

      if (!(extension === "ihx")) {
        alert("Add a .ihx file!");
      } else {
        console.log(data);
        //trimit fisierul catre backend
        axios
          .post("http://192.168.0.111:8082/load-file", data, {})
          .then((res) => {
            this.setState({ valid: true });
            console.log(res.statusText);

          })
          .catch((err) => {
            console.error("myerr " + err);
            alert("Something went wrong..\nPlease try again.");
            this.setState({ isLoading: false });
            
          });
      }
    } else {
      alert("Please add a file.");
    }
  };
  onFileClick = () => {
    this.setState({ valid: false });
  };

  //se afiseaza datele fisierului doar dupa ce s-a incarcat
  fileData = () => {
    if (this.state.selectedFile && this.state.valid) {
      return (
        <div>
          <h2>File uploaded!</h2>
          <p>Your file: {this.state.selectedFile.name}</p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose source file then press upload</h4>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <h2>Upload binary file</h2>
        <div>
          <input
            type="file"
            onChange={this.onFileChange}
            onClick={this.onFileClick}
          />
          <br />
          <br />
          <button className="button-home" onClick={this.onFileUpload}>
            Upload
          </button>
        </div>
        {this.fileData()}
      </div>
    );
  }
}

export default LoadFile;
