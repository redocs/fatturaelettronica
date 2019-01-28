import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from '../../theme';

const UploaderContainer = styled.div`
  width: 80%;
  min-height: ${props => (props.inSidebar ? '44px' : '300px')};
  background: ${props => props.theme.backgroundColor};
  border-radius: 4px;
  border: 2px dashed ${props => props.theme.uploaderBorderColor};
  color: ${props => props.theme.uploaderColor};
  margin: 10px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: box-shadow 0.2s ease-in-out;
  ${props =>
    props.isDragActive
      ? 'box-shadow: inset 0px 0px 1rem 0px ' + props.theme.uploaderBorderColor
      : ''};
  @media (max-width: 700px) {
    width: 80vw;
  }
`;

class Uploader extends Component {
  render() {
    return (
      <ThemeProvider theme={theme[this.props.themeColor]}>
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
      </ThemeProvider>
    );
  }
}

export default Uploader;
