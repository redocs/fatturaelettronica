import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import styled from 'styled-components';
import ErrorUpload from './errorUpload';
import { checkProperty } from '../../helpers';

const UploaderContainer = styled.div`
  box-sizing: border-box;
  width: calc(100% - 20px);
  min-height: ${props => (props.inSidebar ? '44px' : '300px')};
  background: ${props => props.theme.selectedColor};
  border-radius: 4px;
  border: 2px dashed ${props => props.theme.uploaderBorderColor};
  color: ${props => props.theme.uploaderColor};
  margin: 10px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: box-shadow 0.2s ease-in-out;
  font-size: 14px;
  box-shadow: 0px 0px 0px 4px ${props => props.theme.selectedColor};
  ${props =>
    props.isDragActive
      ? 'box-shadow: 0px 0px 4px 4px ' + props.theme.selectedColor
      : ''};
  @media (max-width: 700px) {
    width: 80vw;
  }

  p {
    margin: 0;
  }
`;

class Uploader extends Component {
  render() {
    const errorUploadConfig = {
      buttonText: 'Riprova',
      onClick: e => this.props.restartUpload(e)
    };
    return (
      <div>
        {!this.props.fileXML && this.props.isXML && (
          <Dropzone onDrop={this.props.onDrop}>
            {({ getRootProps, getInputProps, isDragActive }) => {
              return (
                <UploaderContainer
                  isDragActive={isDragActive}
                  inSidebar={this.props.inSidebar}
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
                  {isDragActive ? (
                    <p>Rilascia il file XML qui...</p>
                  ) : (
                    <p>{this.props.text}</p>
                  )}
                </UploaderContainer>
              );
            }}
          </Dropzone>
        )}
        {!this.props.isXML && (
          <ErrorUpload {...errorUploadConfig} text="Non è un file XML." />
        )}
        {this.props.fileXML && !checkProperty(this.props.fileXML) && (
          <ErrorUpload
            {...errorUploadConfig}
            text="Il File XML non è una Fattura Elettronica regolare."
          />
        )}
      </div>
    );
  }
}

export default Uploader;
