import React, { Component } from 'react';
import styled from 'styled-components';

const AppHeader = styled.header`
  background-color: #333;
  min-height: 15vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  color: white;
  @media print {
    display: none;
  }
  -webkit-app-region: drag;
`;

const Col = styled.div`
  width: 100%;
  display: flex;
  justify-content: ${props => props.justifyContent};
`;

const ButtonPrint = styled.button`
  padding: 8px 20px;
  border: 1px solid #333;
  border-radius: 4px;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: bolder;
  margin: 0 10px 0 0;
`;

const TitleContainer = styled.div`
  margin: 0 0 0 20px;
  text-align: left;
`;

const TitleH1 = styled.h1`
  padding: 0;
  margin: 0 0 4px;
  font-size: 22px;
`;

const SubTitleH3 = styled.h3`
  padding: 0;
  margin: 0 0 4px;
  font-size: 12px;
`;

class Header extends Component {
  render() {
    return (
      <AppHeader>
        <Col justifyContent="flex-start" flex={2}>
          <TitleContainer>
            <TitleH1>Visualizza la Fattura Elettronica</TitleH1>
            <SubTitleH3>
              Tool per caricare i file XML della Fattura Elettronica e
              Visualizzarli come PDF
            </SubTitleH3>
          </TitleContainer>
        </Col>
        <Col justifyContent="flex-end" flex={1}>
          {this.props.isCorrectFile && (
            <ButtonPrint onClick={e => this.props.onClick(e)}>
              RESTART
            </ButtonPrint>
          )}
          {this.props.isCorrectFile && (
            <ButtonPrint onClick={() => window.print()}>STAMPA</ButtonPrint>
          )}
        </Col>
      </AppHeader>
    );
  }
}

export default Header;
