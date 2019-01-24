import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import styled from 'styled-components';
//import axios from 'axios';

const UploaderContainer = styled.div`
  width: 40vw;
  min-height: 300px;
  background: #e8e8e8;
  border-radius: 6px;
  border: 2px dashed #a7a7a7;
  margin: 10px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 700px) {
    width: 80vw;
  }
`;

class Uploader extends Component {
  //   onDrop = acceptedFiles => {
  //     acceptedFiles.forEach(file => {
  //       const reader = new FileReader();
  //       reader.onload = () => {
  //         const fileAsBinaryString = reader.result;
  //         console.log(fileAsBinaryString);
  //         // const data = new FormData();
  //         // console.log(file, reader);
  //         // data.append('File[]', file);

  //         // axios
  //         //   .post('http://localhost:8000/upload', data)
  //         //   .then(function(response) {
  //         //     // this.setState({
  //         //     //   imageURL: `http://localhost:8000/${body.file}`,
  //         //     //   uploadStatus: true
  //         //     // });
  //         //     console.log(response);
  //         //   })
  //         //   .catch(function(error) {
  //         //     console.log(error);
  //         //   });
  //       };
  //       reader.onabort = () => console.log('file reading was aborted');
  //       reader.onerror = () => console.log('file reading has failed');

  //       reader.readAsBinaryString(file);
  //     });
  //   };

  render() {
    return (
      <Dropzone onDrop={this.props.onDrop}>
        {({ getRootProps, getInputProps, isDragActive }) => {
          return (
            <UploaderContainer {...getRootProps()}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Rilascia il file XML qui...</p>
              ) : (
                <p>
                  Rilascia il file XML qui o clicca per caricare il file dal tuo
                  computer
                </p>
              )}
            </UploaderContainer>
          );
        }}
      </Dropzone>
    );
  }
}

export default Uploader;
