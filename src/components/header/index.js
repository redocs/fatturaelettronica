import React, { Component } from 'react';
import styled from 'styled-components';
import Installapp from './installapp';
import Icon from './icon_32.png';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint } from '@fortawesome/free-solid-svg-icons';

library.add(faPrint);

const AppHeader = styled.header`
  background-color: ${props => props.theme.headerBg};
  min-height: ${props => props.theme.configTheme.headerHeight};
  border-bottom: 1px solid ${props => props.theme.sidebarBorderColor};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  color: ${props => props.theme.textColor};
  @media print {
    display: none;
  }
  -webkit-app-region: drag;
`;

const Col = styled.div`
  display: flex;
  justify-content: ${props => props.justifyContent};
  flex: ${props => props.flex};
  align-items: center;
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
  min-height: ${props => props.theme.configTheme.headerHeight};
  flex: 1;
  max-width: 150px;
`;

const ButtonPrint = styled.button`
  padding: 8px 20px;
  background-color: ${props => props.theme.secondaryColorBg};
  border: 1px solid ${props => props.theme.secondaryColor};
  color: ${props => props.theme.secondaryColor};
  border-radius: 4px;
  cursor: pointer;
  text-transform: uppercase;
  margin: 0 10px 0 0;
  height: 44px;
  flex: 1;
  max-width: 150px;
  font-size: 14px;
  transition: all 0.3s ease-in-out;
  :hover {
    box-shadow: 0px 0px 0px 2px ${props => props.theme.secondaryColor};
  }
  :focus {
    outline: none;
    box-shadow: 0px 0px 0px 2px ${props => props.theme.secondaryColor};
  }
  span {
    margin-left: 10px;
  }
`;

const LogoContainer = styled.div`
  text-align: center;
  margin: 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TitleContainer = styled.div`
  margin: 0;
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

const NavContainer = styled.nav`
  list-style-type: none;
  display: flex;
  margin: 0;
  padding: 5px 15px;
  align-items: center;
  margin-left: 30px;
  border-left: 1px solid #ccc;
}
  a {
    color: #000;
    margin: 0 5px;
    padding: 1px 5px 1px;
    display: inline-block;
    text-decoration: none;
    position: relative;
    border: 1px solid transparent;
    transition: all 0.3s ease-in-out;
  }
  a.active{
    color: #6d6d6d;
  }
  a:hover {
    text-decoration: underline;
  }
`;

class Header extends Component {
  render() {
    return (
      <AppHeader>
        <Col justifyContent="flex-start" flex={3}>
          <LogoContainer>
            <img src={Icon} alt="Fattura XML" />
          </LogoContainer>
          <TitleContainer>
            <TitleH1>Visualizza la Fattura Elettronica</TitleH1>
            <SubTitleH3>
              Tool per caricare i file XML della Fattura Elettronica e
              Visualizzarli come PDF
            </SubTitleH3>
          </TitleContainer>
          <NavContainer>{this.props.children}</NavContainer>
        </Col>
        <Col justifyContent="flex-end" flex={1}>
          <Installapp />
          {this.props.isCorrectFile && !this.props.previewActive && (
            <Button onClick={e => this.props.onClick(e)}>RESTART</Button>
          )}
          {this.props.isCorrectFile && (
            <ButtonPrint onClick={() => window.print()}>
              STAMPA
              <span>
                <FontAwesomeIcon icon="print" />
              </span>
            </ButtonPrint>
          )}
          {/* <Button onClick={e => this.props.onChangeTheme(e)}>
            CAMBIA TEMA
          </Button> */}
        </Col>
      </AppHeader>
    );
  }
}

export default Header;
