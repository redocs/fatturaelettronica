import React, { Component } from 'react';
import styled from 'styled-components';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

library.add(faAngleDown);

const OrderByContainer = styled.div`
  position: relative;
`;
const OrderBy = styled.div`
  position: absolute;
  top: 100%;
  z-index: 1000;
  display: none;
  min-width: 10rem;
  padding: 0;
  margin: 2px;
  font-size: 14px;
  color: ${props => props.theme.buttonColor};
  text-align: left;
  list-style: none;
  background-color: ${props => props.theme.buttonBg};
  background-clip: padding-box;
  border: 1px solid ${props => props.theme.sidebarBorderColor};
  border-radius: 0;
  border-top-right-radius: 0;
  right: 0px;
  display: ${props => (props.open ? 'block' : 'none')};
`;
const OrderItem = styled.div`
  display: block;
  width: auto;
  padding: 10px 0;
  clear: both;
  font-weight: normal;
  color: ${props => props.theme.buttonColor};
  text-align: center;
  white-space: nowrap;
  background-color: transparent;
  border: 0;
  cursor: pointer;
  border-bottom: 1px solid ${props => props.theme.sidebarBorderColor};

  &:last-child {
    border: none;
  }
`;

const Button = styled.div`
  padding: 0;
  ${props => (props.icon ? 'font-size: 20px;' : '')}
  background: #fff;
  border: none;
  cursor: pointer;
  white-space: nowrap;
  &:focus {
    outline: none;
  }

  > span {
    margin-left: 5px;
  }
`;

const SpanOrder = styled.span`
  color: #286552;
`;

class OrderByComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selected: {
        value: 'upload',
        desc: 'Data Caricamento'
      }
    };
  }
  toggleDropdown = () => {
    this.setState({
      open: !this.state.open
    });
  };
  orderBy = (type, orderObj) => {
    this.props.onSelectOrderBy(type);
    let filterType = orderObj.find(item => {
      return item.value === type;
    });
    this.setState({
      open: false,
      selected: filterType
    });
  };
  render() {
    const orderObj = [
      {
        value: 'upload',
        desc: 'Data Caricamento'
      },
      {
        value: 'name',
        desc: 'Nome'
      },
      {
        value: 'dateASC',
        desc: 'Data ASC'
      },
      {
        value: 'dateDESC',
        desc: 'Data DESC'
      },
      {
        value: 'prezzoASC',
        desc: 'Prezzo ASC'
      },
      {
        value: 'prezzoDESC',
        desc: 'Prezzo DESC'
      }
    ];
    const { open, selected } = this.state;
    return (
      <OrderByContainer open={open}>
        <Button open={open} onClick={e => this.toggleDropdown(e)}>
          Ordina Per: <SpanOrder>{selected.desc}</SpanOrder>
          <SpanOrder>
            <FontAwesomeIcon size="sm" icon="angle-down" />
          </SpanOrder>
        </Button>
        <OrderBy open={open}>
          {orderObj.map((order, i) => {
            return (
              <OrderItem
                key={i}
                onClick={e => this.orderBy(order.value, orderObj)}
              >
                {order.desc}
              </OrderItem>
            );
          })}
        </OrderBy>
      </OrderByContainer>
    );
  }
}
export default OrderByComponent;
