import React, { Component } from 'react';
import Header from './components/header';
import Viewer from './components/viewer';
import Uploader from './components/uploader';
import ErrorUpload from './components/uploader/errorUpload';
import Preview from './components/preview';
import { checkProperty } from './helpers';
import styled from 'styled-components';
import './App.css';
import ls from 'local-storage';

const FlexContainer = styled.div`
  width: 100%;
  display: flex;
`;

const Col = styled.div`
  flex: ${props => props.flex};
  ${props =>
    props.shadowed
      ? 'padding: 20px; box-shadow: 0px 5px 10px 1px #ccc; margin: 20px; 10px;'
      : ''}
`;

const ColPreviewer = styled.div`
  flex: ${props => props.flex};
  padding: 20px 0;
  box-shadow: 0px 5px 10px 1px #ccc;
  margin: 20px 10px;
  @media print {
    display: none;
  }
`;

var xml2js = require('xml2js');

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      file: '',
      files: ls.get('files') || null,
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

  onSelectedFile = file => {
    this.setState({
      file: file
    });
  };
  onResetStore = () => {
    this.setState({
      file: '',
      files: null
    });
  };

  onDrop = acceptedFiles => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        if (file.type === 'text/xml') {
          let fileResult = reader.result;
          fileResult = fileResult.replace(/[ï»¿]/g, '');
          let resultXML = this.parseXML(fileResult);
          let currentFiles = this.state.files ? this.state.files.slice(0) : [];
          let newCurrentFiles = [...currentFiles, resultXML];
          ls.set('files', newCurrentFiles);
          this.setState({
            file: resultXML,
            files: ls.get('files') || [],
            isXML: true
          });
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
    const previewActive = false;
    return (
      <div className="App">
        <Header
          isCorrectFile={isCorrectFile}
          onClick={e => this.restartUpload(e)}
        />
        <FlexContainer>
          <Col flex={2}>
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
          </Col>
          {this.state.files && previewActive && (
            <ColPreviewer flex={1}>
              <Preview
                onResetStore={this.onResetStore}
                onSelectedFile={this.onSelectedFile}
                fileActive={this.state.file}
                files={this.state.files}
              />
            </ColPreviewer>
          )}
        </FlexContainer>
      </div>
    );
  }
}

export default App;
