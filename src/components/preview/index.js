import React, { Component } from 'react';
import styled from 'styled-components';
import { selectProperty, correctData } from '../../helpers';

const PreviewContainer = styled.ul`
  margin: 0;
  padding: 0;
  border-top: 2px solid #333;
`;

const Header = styled.div`
  display: flex;
  margin: 0 10px 10px;
`;

const Col = styled.div`
  flex: 1;
  display: flex;
  justify-content: ${props => props.justifyContent};
  align-items: center;
`;

const Button = styled.button`
  padding: 6px 12px;
  border: 1px solid #333;
  border-radius: 4px;
  cursor: pointer;
`;

const Pitem = styled.li`
  margin: 0;
  padding: 5px;
  border-bottom: 2px solid #333;
  line-height: 33px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  background: ${props => (props.active ? '#f4f4f4' : 'white')};
`;

const TitleH2 = styled.h2`
  margin: 0;
  padding: 0;
`;

class PreviewItem extends Component {
  render() {
    const json = this.props.info;
    const fattProperty = selectProperty(json);
    const fatturaBody = json[fattProperty].FatturaElettronicaBody[0];
    const fatturaHeader = json[fattProperty].FatturaElettronicaHeader;
    const cedente = fatturaHeader[0].CedentePrestatore[0];
    const datiDocumento = fatturaBody.DatiGenerali[0].DatiGeneraliDocumento[0];

    const infoData = correctData(datiDocumento.Data);

    //console.log(this.props.active);

    return (
      <Pitem active={this.props.active} onClick={this.props.onClick}>
        <span>{cedente.DatiAnagrafici[0].Anagrafica[0].Denominazione}</span>
        <span>{infoData}</span>
      </Pitem>
    );
  }
}

class Preview extends Component {
  loadFile = file => {
    this.props.onSelectedFile(file);
  };
  resetStore = () => {
    this.props.onResetStore();
  };
  render() {
    const filesArray = this.props.files;
    //console.log(this.props.fileActive);
    // if (!filesArray) return false;
    return (
      <div>
        <Header>
          <Col justifyContent="flex-start" />
          <Col justifyContent="center">
            <TitleH2>Lista Fatture</TitleH2>
          </Col>
          <Col justifyContent="flex-end">
            <Button onClick={e => this.resetStore(e)}>Reset</Button>
          </Col>
        </Header>
        <PreviewContainer>
          {filesArray.map((file, i) => {
            console.log(i);
            return (
              <PreviewItem
                active={this.props.fileActive === file}
                key={i}
                info={file}
                onClick={e => this.loadFile(file)}
              />
            );
          })}
        </PreviewContainer>
      </div>
    );
  }
}

export default Preview;
