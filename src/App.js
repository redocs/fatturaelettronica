import React, { Component } from 'react';
import Viewer from './components/viewer';
import Uploader from './components/uploader';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      file: ''
    };
  }

  componentDidMount() {
    this.setState({
      file: ''
    });
  }

  onDrop = acceptedFiles => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        const file = JSON.parse(reader.result);
        //console.log(file);
        this.setState({
          file: file
        });
      };
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');

      reader.readAsBinaryString(file);
    });
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Visualizza la Fattura Elettronica</h1>
        </header>{' '}
        {!this.state.file && <Uploader onDrop={e => this.onDrop(e)} />}
        {this.state.file && <Viewer file={this.state.file} />}
      </div>
    );
  }
}

export default App;
