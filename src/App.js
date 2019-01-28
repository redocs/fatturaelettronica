import React, { Component } from 'react';
import Header from './components/header';
import Viewer from './components/viewer';
import Uploader from './components/uploader';
import ErrorUpload from './components/uploader/errorUpload';
import Preview from './components/preview';
import { checkProperty, returnObject, getParamUrl } from './helpers';
import styled, { ThemeProvider } from 'styled-components';
import './App.css';
import ls from 'local-storage';
import { theme } from './theme';

const FlexContainer = styled.div`
  width: 100%;
  display: flex;
`;

const Col = styled.div`
  flex: ${props => props.flex};
`;

const ColPreviewer = styled(Col)`
  max-width: ${props => (props.mini ? '100px' : 'none')}
  padding: 0;
  margin: 10px 10px 10px 5px;
  background: ${props => props.theme.sidebarBg};
  border: 1px solid ${props => props.theme.sidebarBorderColor};
  color: #fff;
  border-radius: 4px;
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
      isXML: true,
      toggleSidebar: false,
      themeColor: ls.get('theme') || 'theme1'
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
  onRemoveFile = index => {
    let oldFiles = this.state.files;
    oldFiles.splice(index, 1);
    //console.log('removed file', newFiles);
    ls.set('files', oldFiles);
    this.setState({
      files: ls.get('files') || []
    });
  };
  onSelectOrderBy = type => {
    let arrayFiles = this.state.files;
    if (type === 'dateASC') {
      arrayFiles.sort(function(a, b) {
        return a.dateDocTimestamp - b.dateDocTimestamp;
      });
    }
    if (type === 'dateDESC') {
      arrayFiles.sort(function(a, b) {
        return b.dateDocTimestamp - a.dateDocTimestamp;
      });
    }
    if (type === 'name') {
      arrayFiles.sort(function(a, b) {
        var nameA = a.name.toUpperCase(); // ignora maiuscole e minuscole
        var nameB = b.name.toUpperCase(); // ignora maiuscole e minuscole
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // i nomi devono essere uguali
        return 0;
      });
    }
    if (type === 'prezzoASC') {
      arrayFiles.sort(function(a, b) {
        return a.valueTot - b.valueTot;
      });
    }
    if (type === 'prezzoDESC') {
      arrayFiles.sort(function(a, b) {
        return b.valueTot - a.valueTot;
      });
    }
    ls.set('files', arrayFiles);
    this.setState({
      files: ls.get('files') || []
    });
  };
  onSelectedFile = file => {
    //console.log('onSelectedFile');
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
  onToggleSidebar = () => {
    this.setState({
      toggleSidebar: !this.state.toggleSidebar
    });
  };

  onDragEnd = files => {
    ls.set('files', files);

    this.setState({
      files: ls.get('files') || []
    });
  };

  onDrop = acceptedFiles => {
    let i = 0;
    acceptedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        if (file.type === 'text/xml') {
          let fileResult = reader.result;
          fileResult = fileResult.replace(/[ï»¿]/g, '');
          let resultXML = this.parseXML(fileResult);
          resultXML = returnObject(resultXML);
          resultXML.dateUpload = Math.floor(Date.now() / 1000);
          resultXML.fileID =
            resultXML.dateDocTimestamp + '-' + resultXML.dateUpload + '-' + i;
          i++;
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
  changeTheme = () => {
    let themeV = 'theme2';
    if (this.state.themeColor === 'theme2') {
      themeV = 'theme1';
    }
    ls.set('theme', themeV);
    this.setState({
      themeColor: ls.get('theme')
    });
  };
  render() {
    const fileXML = this.state.file.file;
    const isCorrectFile = fileXML && checkProperty(fileXML);
    const errorUploadConfig = {
      buttonText: 'Riprova',
      onClick: e => this.restartUpload(e)
    };
    const newVersion = getParamUrl() === 'v2' ? true : false;
    const previewActive = newVersion ? newVersion : false;
    return (
      <ThemeProvider theme={theme[this.state.themeColor]}>
        <div className="App">
          <Header
            themeColor={this.state.themeColor}
            previewActive={previewActive}
            isCorrectFile={isCorrectFile}
            onClick={e => this.restartUpload(e)}
            onChangeTheme={e => this.changeTheme(e)}
          />
          <FlexContainer>
            <Col flex={2}>
              {!fileXML && this.state.isXML && (
                <Uploader
                  themeColor={this.state.themeColor}
                  text="Rilascia il file XML qui o clicca per caricare il file dal tuo computer"
                  onDrop={e => this.onDrop(e)}
                />
              )}
              {!this.state.isXML && (
                <ErrorUpload {...errorUploadConfig} text="Non è un file XML." />
              )}
              {fileXML && !checkProperty(fileXML) && (
                <ErrorUpload
                  {...errorUploadConfig}
                  text="Il File XML non è una Fattura Elettronica regolare."
                />
              )}
              {isCorrectFile && <Viewer file={fileXML} />}
            </Col>
            {this.state.files && previewActive && (
              <ColPreviewer mini={this.state.toggleSidebar} flex={1}>
                <Preview
                  themeColor={this.state.themeColor}
                  onSelectOrderBy={this.onSelectOrderBy}
                  onResetStore={this.onResetStore}
                  onSelectedFile={this.onSelectedFile}
                  onRemoveFile={this.onRemoveFile}
                  fileActive={this.state.file.fileID}
                  files={this.state.files}
                  onToggleSidebar={this.onToggleSidebar}
                  isMini={this.state.toggleSidebar}
                  onDragEnd={this.onDragEnd}
                  onDrop={this.onDrop}
                />
              </ColPreviewer>
            )}
          </FlexContainer>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
