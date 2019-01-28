import React, { Component } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { theme } from '../../theme';

library.add(faCaretDown);

const OrderByContainer = styled.div`
  position: relative;
  ${props =>
    props.open
      ? 'filter: drop-shadow(0px 2px 2px ' + props.theme.buttonColor + ');'
      : ''}
`;
const OrderBy = styled.div`
  position: absolute;
  top: 100%;
  z-index: 1000;
  display: none;
  min-width: 10rem;
  padding: 5px 0;
  margin: -1px 0 0;
  font-size: 11px;
  color: ${props => props.theme.buttonColor};
  text-align: left;
  list-style: none;
  background-color: ${props => props.theme.buttonBg};
  background-clip: padding-box;
  border: 1px solid ${props => props.theme.buttonColor};
  border-radius: 4px;
  border-top-right-radius: 0;
  right: 0px;
  will-change: transform;
  display: ${props => (props.open ? 'block' : 'none')};
  text-transform: uppercase;
`;
const OrderItem = styled.div`
  display: block;
  width: auto;
  padding: 10px 0;
  clear: both;
  font-weight: bolder;
  color: ${props => props.theme.buttonColor};
  text-align: center;
  white-space: nowrap;
  background-color: transparent;
  border: 0;
  cursor: pointer;
  border-bottom: 1px solid ${props => props.theme.buttonColor};
  font-family: 'Archivo', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
    'Helvetica Neue', sans-serif;
  font-weight: normal;

  &:last-child {
    border: none;
  }
`;

const Button = styled.button`
  padding: ${props => (props.icon ? '3px 20px;' : '8px 20px')};
  ${props => (props.icon ? 'font-size: 20px;' : '')}
  background-color: ${props => props.theme.buttonBg};
  border: 1px solid ${props => props.theme.buttonColor};
  border-radius: 4px;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: bolder;

  ${props =>
    props.open
      ? 'border-bottom-left-radius: 0;border-bottom-right-radius: 0;border-bottom: none;margin-bottom:1px;'
      : ''}

  &:focus {
    outline: none;
    box-shadow: ${props =>
      props.open ? 'none' : '0px 0px 0px 2px ' + props.theme.buttonColor};
  }

  > span {
    margin-left: 4px;
  }
`;

class OrderByComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }
  toggleDropdown = () => {
    this.setState({
      open: !this.state.open
    });
  };
  orderBy = type => {
    this.props.onSelectOrderBy(type);
    this.setState({
      open: false
    });
  };
  render() {
    return (
      <ThemeProvider theme={theme[this.props.themeColor]}>
        <OrderByContainer open={this.state.open}>
          <Button open={this.state.open} onClick={e => this.toggleDropdown(e)}>
            Ordina Per
            <span>
              <FontAwesomeIcon size="lg" icon="caret-down" />
            </span>
          </Button>
          <OrderBy open={this.state.open}>
            <OrderItem onClick={e => this.orderBy('name')}>Nome</OrderItem>
            <OrderItem onClick={e => this.orderBy('dateASC')}>
              Data ASC
            </OrderItem>
            <OrderItem onClick={e => this.orderBy('dateDESC')}>
              Data DESC
            </OrderItem>
            <OrderItem onClick={e => this.orderBy('prezzoASC')}>
              Prezzo ASC
            </OrderItem>
            <OrderItem onClick={e => this.orderBy('prezzoDESC')}>
              Prezzo DESC
            </OrderItem>
          </OrderBy>
        </OrderByContainer>
      </ThemeProvider>
    );
  }
}
export default OrderByComponent;
