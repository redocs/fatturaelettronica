import React, { Component } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from '../../theme';
import Installapp from './installapp';

const AppHeader = styled.header`
  background-color: ${props => props.theme.headerBg};
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
  display: flex;
  justify-content: ${props => props.justifyContent};
  flex: ${props => props.flex};
`;

const ButtonPrint = styled.button`
  padding: 8px 20px;
  background-color: ${props => props.theme.buttonBg};
  border: 1px solid ${props => props.theme.buttonColor};
  color: ${props => props.theme.buttonColor};
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
      <ThemeProvider theme={theme[this.props.themeColor]}>
        <AppHeader>
          {this.props.previewActive && (
            <Col flex={1}>
              <Installapp themeColor={this.props.themeColor} />
            </Col>
          )}
          <Col justifyContent="flex-start" flex={4}>
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
              <ButtonPrint onClick={e => this.props.onClick(e)}>
                RESTART
              </ButtonPrint>
            )}
            {this.props.isCorrectFile && (
              <ButtonPrint onClick={() => window.print()}>STAMPA</ButtonPrint>
            )}
            <ButtonPrint onClick={e => this.props.onChangeTheme(e)}>
              CAMBIA TEMA
            </ButtonPrint>
          </Col>
        </AppHeader>
      </ThemeProvider>
    );
  }
}

export default Header;
