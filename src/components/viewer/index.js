import React, { Component } from 'react';
import styled from 'styled-components';
import FattHeader from './fattHeader';
import FattBody from './fattBody';
import FattFooter from './fattFooter';

const ViewerDiv = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0;
`;
const ViewerContainer = styled.div`
  padding: 10px;
  margin: 10px 5px 10px 10px;
  background: #fff;
  @media print {
    box-shadow: none;
    margin: 0;
  }
`;

class Viewer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      file: this.props.file
    };
  }

  render() {
    const fileResult = this.props.file;
    //console.log(fileResult);
    return (
      <ViewerDiv>
        <ViewerContainer>
          <FattHeader json={fileResult} />
          <FattBody json={fileResult} />
          <FattFooter json={fileResult} />
        </ViewerContainer>
      </ViewerDiv>
    );
  }
}

export default Viewer;
