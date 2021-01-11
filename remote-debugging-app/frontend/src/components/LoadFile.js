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
    var extension = this.state.selectedFile.name.split(".")[1];
   
    if (!(extension === "cpp" || extension === "c")) {
      alert("Adauga un fisier .c");
    } else {
      
      //trimit fisierul catre backend
      this.setState({valid: true});
      axios.post("http://localhost:8081/load-file", data, {}).then((res) => {
        console.log(res.statusText);
      });
    }
  };

  //se afiseaza datele fisierului doar dupa ce s-a incarcat
  fileData = () => {
    if (this.state.selectedFile && this.state.valid) {
      return (
        <div>
          <h2>Fisierul tau:</h2>
          <p>Nume: {this.state.selectedFile.name}</p>
          <p>Tip: {this.state.selectedFile.type}</p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Alege fisierul sursa apoi apasa butonul de upload.</h4>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <h2>Incarca un fisier</h2>

        <div>
          <input type="file" onChange={this.onFileChange} />
          <br />
          <br />
          <button onClick={this.onFileUpload}>Upload!</button>
        </div>
        {this.fileData()}
      </div>
    );
  }
}

export default LoadFile;
