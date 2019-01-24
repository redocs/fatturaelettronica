import React, { Component } from 'react';
import styled from 'styled-components';

const ErrorUpload = styled.div`
  display: flex;
  flex-direction: column;
  width: 80vw;
  margin: 0 auto;
  min-height: 200px;
  align-items: center;
  justify-content: center;
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
      <ErrorUpload>
        {this.props.text}
        <ButtonReset onClick={e => this.props.onClick(e)}>
          {this.props.buttonText}
        </ButtonReset>
      </ErrorUpload>
    );
  }
}

export default ErrorUploadWrapper;
