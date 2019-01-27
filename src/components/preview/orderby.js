import React, { Component } from 'react';
import styled from 'styled-components';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

library.add(faCaretDown);

const OrderByContainer = styled.div`
  position: relative;
  ${props => (props.open ? 'filter: drop-shadow(0px 2px 2px #333);' : '')}
`;
const OrderBy = styled.div`
  position: absolute;
  top: 100%;
  z-index: 1000;
  display: none;
  min-width: 10rem;
  padding: 5px 0;
  margin: -1px 0 0;
  font-size: 12px;
  color: #313131;
  text-align: left;
  list-style: none;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #313131;
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
  color: #313131;
  text-align: center;
  white-space: nowrap;
  background-color: transparent;
  border: 0;
  cursor: pointer;
  border-bottom: 1px solid #313131;

  &:last-child {
    border: none;
  }
`;

const Button = styled.button`
  padding: ${props => (props.icon ? '3px 20px;' : '8px 20px')};
  ${props => (props.icon ? 'font-size: 20px;' : '')}
  border: 1px solid #333;
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
    box-shadow: ${props => (props.open ? 'none' : '0px 0px 0px 2px #333')};
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
      <OrderByContainer open={this.state.open}>
        <Button open={this.state.open} onClick={e => this.toggleDropdown(e)}>
          Ordina Per
          <span>
            <FontAwesomeIcon size="lg" icon="caret-down" />
          </span>
        </Button>
        <OrderBy open={this.state.open}>
          <OrderItem onClick={e => this.orderBy('name')}>Nome</OrderItem>
          <OrderItem onClick={e => this.orderBy('dateASC')}>Data ASC</OrderItem>
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
    );
  }
}
export default OrderByComponent;