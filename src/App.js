import React, { Component } from 'react';
import Header from './components/header';
import { checkProperty, returnObject, getParamUrl } from './helpers';
import { ThemeProvider } from 'styled-components';
import './App.css';
import ls from 'local-storage';
import { theme } from './theme';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { About, Contact } from './pages';
import Homepage from './pages/homepage';

var xml2js = require('xml2js');

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      file: '',
      files: ls.get('files') || null,
      isXML: true,
      toggleSidebar: false,
      themeColor: ls.get('theme') || 'theme1',
      fileLoaded: false
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
    ls.set('files', oldFiles);
    this.setState({
      files: ls.get('files') || []
    });
  };
  onSelectOrderBy = type => {
    let arrayFiles = this.state.files;
    if (type === 'upload') {
      arrayFiles.sort(function(a, b) {
        return a.dateUpload - b.dateUpload;
      });
    }
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
        var nameA = a.name.toUpperCase();
        var nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

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
            isXML: true,
            fileLoaded: true
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
    const isCorrectFile = !!fileXML && checkProperty(fileXML);
    console.log(this.state.file);
    const newVersion = getParamUrl() === 'v2' ? true : false;
    const previewActive = newVersion ? newVersion : true;

    const pages = [
      { id: 1, slug: 'visualizza', title: 'Visualizza' },
      {
        id: 2,
        slug: 'visualizzare-fatture-elettroniche',
        title: 'Come funziona'
      },
      {
        id: 3,
        slug: 'contattaci',
        title: 'Contatti'
      }
    ];
    return (
      <Router>
        <ThemeProvider theme={theme[this.state.themeColor]}>
          <div className="App">
            <Header
              themeColor={this.state.themeColor}
              previewActive={previewActive}
              isCorrectFile={isCorrectFile}
              onClick={e => this.restartUpload(e)}
              onChangeTheme={e => this.changeTheme(e)}
            >
              {pages.map(page => (
                <NavLink
                  key={page.id}
                  to={`/${page.slug}`}
                  activeClassName="active"
                >
                  {page.title}
                </NavLink>
              ))}
            </Header>
            <Route
              path={`/${pages[0].slug}`}
              exact
              render={props => (
                <Homepage
                  {...props}
                  onDrop={e => this.onDrop(e)}
                  fileActive={this.state.file}
                  isXML={this.state.isXML}
                  files={this.state.files}
                  fileLoaded={this.state.fileLoaded}
                  themeColor={this.props.themeColor}
                  onSelectOrderBy={this.onSelectOrderBy}
                  onResetStore={this.onResetStore}
                  onSelectedFile={this.onSelectedFile}
                  onRemoveFile={this.onRemoveFile}
                  onToggleSidebar={this.onToggleSidebar}
                  onDragEnd={e => this.onDragEnd(e)}
                  restartUpload={this.restartUpload}
                />
              )}
            />
            <Route exact path={`/${pages[1].slug}`} component={About} />
            <Route exact path={`/${pages[2].slug}`} component={Contact} />
          </div>
        </ThemeProvider>
      </Router>
    );
  }
}

export default App;
