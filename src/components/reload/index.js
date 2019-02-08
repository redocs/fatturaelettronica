import React, { Component } from 'react';
import styled from 'styled-components';

const Modal = styled.div`
  background: #313131;
  color: #fff;
  position: fixed;
  bottom: 10px;
  right: 10px;
  padding: 20px 40px;
  cursor: pointer;
`;

class ReloadApp extends Component {
  state = {
    show: false
  };
  componentDidMount() {
    // Handle global event.
    window.addEventListener('newContentAvailable', () => {
      this.setState({
        show: true
      });
    });
  }
  onClick = () => {
    // Reload when modal click.
    window.location.reload(window.location.href);
  };
  render() {
    if (!this.state.show) {
      return null;
    }

    return (
      <Modal onClick={this.onClick}>
        <span> New Content Available! Click to Reload</span>
      </Modal>
    );
  }
}

export default ReloadApp;
