import React, { Component } from 'react';
import styled from 'styled-components';

const ModalBg = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.7);
  z-index: 9999;
`;

const ErrorUpload = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: 0 auto;
    min-height: 200px;
    align-items: center;
    justify-content: center;
    background: #fff;
}
`;

const ButtonReset = styled.button`
  margin: 20px 0 0;
  border: 1px solid #333;
  padding: 10px 30px;
  font-size: 1.2rem;
  background: #333;
  color: #fff;
  cursor: pointer;
`;

class ErrorUploadWrapper extends Component {
  render() {
    return (
      <ModalBg>
        <ErrorUpload>
          {this.props.text}
          <ButtonReset onClick={e => this.props.onClick(e)}>
            {this.props.buttonText}
          </ButtonReset>
        </ErrorUpload>
      </ModalBg>
    );
  }
}

export default ErrorUploadWrapper;
