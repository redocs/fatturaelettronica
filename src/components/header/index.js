import React, { Component } from 'react';
import styled from 'styled-components';
import Installapp from './installapp';

const AppHeader = styled.header`
  background-color: ${props => props.theme.headerBg};
  min-height: 80px;
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
  display: flex;
  justify-content: ${props => props.justifyContent};
  flex: ${props => props.flex};
`;

const Button = styled.button`
  padding: 8px 20px;
  background-color: ${props => props.theme.buttonBg};
  border: none;
  color: ${props => props.theme.buttonColor};
  border-radius: 0;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: bolder;
  margin: 0 0 0 0;
  min-height: 80px;
  flex: 1;
  max-width: 150px;
`;

const ButtonPrint = styled(Button)`
  border-right: 1px solid ${props => props.theme.buttonColor};
`;

const TitleContainer = styled.div`
  margin: 0 0 0 20px;
  text-align: left;
`;

const TitleH1 = styled.h1`
  padding: 0;
  margin: 0 0 4px;
  font-size: 22px;
  text-transform: uppercase;
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
        {this.props.previewActive && (
          <Col flex={1}>
            <Installapp />
          </Col>
        )}
        <Col justifyContent="flex-start" flex={3}>
          <TitleContainer>
            <TitleH1>Visualizza la Fattura Elettronica</TitleH1>
            <SubTitleH3>
              Tool per caricare i file XML della Fattura Elettronica e
              Visualizzarli come PDF
            </SubTitleH3>
          </TitleContainer>
        </Col>
        <Col justifyContent="flex-end" flex={1}>
          {this.props.isCorrectFile && !this.props.previewActive && (
            <Button onClick={e => this.props.onClick(e)}>RESTART</Button>
          )}
          {this.props.isCorrectFile && (
            <ButtonPrint onClick={() => window.print()}>STAMPA</ButtonPrint>
          )}
          <Button onClick={e => this.props.onChangeTheme(e)}>
            CAMBIA TEMA
          </Button>
        </Col>
      </AppHeader>
    );
  }
}

export default Header;
