import React, { Component } from 'react';
import styled from 'styled-components';

const AppHeader = styled.header`
  background-color: #282c34;
  min-height: 20vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  color: white;
  @media print {
    display: none;
  }
`;

const Col = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const ButtonPrint = styled.button`
  margin: 0;
  border: 1px solid #333;
  padding: 10px 30px;
  font-size: 1.2rem;
  background: #fff;
  color: #333;
  cursor: pointer;
`;

const TitleH1 = styled.h1`
  margin: 0;
  padding: 0;
`;

class Header extends Component {
  render() {
    return (
      <AppHeader>
        <Col>
          {this.props.isCorrectFile && (
            <ButtonPrint onClick={e => this.props.onClick(e)}>
              RESTART
            </ButtonPrint>
          )}
        </Col>
        <Col>
          <TitleH1>Visualizza la Fattura Elettronica</TitleH1>
        </Col>
        <Col>
          {this.props.isCorrectFile && (
            <ButtonPrint onClick={() => window.print()}>STAMPA</ButtonPrint>
          )}
        </Col>
      </AppHeader>
    );
  }
}

export default Header;
