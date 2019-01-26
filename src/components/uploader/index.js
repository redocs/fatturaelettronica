import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import styled from 'styled-components';
//import axios from 'axios';

const UploaderContainer = styled.div`
  width: 80%;
  min-height: 300px;
  background: #ffffff;
  border-radius: 4px;
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
