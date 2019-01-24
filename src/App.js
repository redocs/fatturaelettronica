import React, { Component } from 'react';
import Header from './components/header';
import Viewer from './components/viewer';
import Uploader from './components/uploader';
import ErrorUpload from './components/uploader/errorUpload';
import { checkProperty } from './helpers';
import './App.css';

var xml2js = require('xml2js');

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      file: '',
      isXML: true
    };
  }

  parseXML = file => {
    let resultFile;
    xml2js.parseString(file, {}, function(err, result) {
      if (err) {
        resultFile = '';
      }
      if (result) {
        resultFile = result;
      }
    });
    return resultFile;
  };

  onDrop = acceptedFiles => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        //const file = JSON.parse(reader.result);
        //console.log('file', reader.result);
        if (file.type === 'text/xml') {
          let fileResult = reader.result;
          fileResult = fileResult.replace(/[ï»¿]/g, '');
          let resultXML = this.parseXML(fileResult);
          //console.log('resultXML', resultXML);
          this.setState({
            file: resultXML,
            isXML: true
          });
          //console.log(file);
        } else {
          this.setState({
            isXML: false
          });
        }
      };
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');

      reader.readAsBinaryString(file);
    });
  };
  restartUpload = () => {
    this.setState({
      file: '',
      isXML: true
    });
  };
  render() {
    const isCorrectFile = this.state.file && checkProperty(this.state.file);
    const errorUploadConfig = {
      buttonText: 'Riprova',
      onClick: e => this.restartUpload(e)
    };
    return (
      <div className="App">
        <Header
          isCorrectFile={isCorrectFile}
          onClick={e => this.restartUpload(e)}
        />
        {!this.state.file && this.state.isXML && (
          <Uploader onDrop={e => this.onDrop(e)} />
        )}
        {!this.state.isXML && (
          <ErrorUpload {...errorUploadConfig} text="Non è un file XML." />
        )}
        {this.state.file && !checkProperty(this.state.file) && (
          <ErrorUpload
            {...errorUploadConfig}
            text="Il File XML non è una Fattura Elettronica regolare."
          />
        )}
        {isCorrectFile && <Viewer file={this.state.file} />}
      </div>
    );
  }
}

export default App;
