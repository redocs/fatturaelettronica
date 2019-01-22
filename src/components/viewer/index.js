import React, { Component } from 'react';
//import json from './../../example.json';
import styled from 'styled-components';

const ViewerDiv = styled.div``;
const ViewerContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0;
`;
const FattHeader = styled.div`
  display: flex;
`;
const FattTitle = styled.h2`
  margin: 0 0 5px;
`;
const Col = styled.div`
  flex: 1;
  text-align: ${props => (props.right ? 'right' : 'left')};
`;
const ColUl = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

class Viewer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      file: this.props.file
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: true,
      file: this.props.file
    });
    //console.log(json);
  }

  render() {
    const json = this.props.file;
    //console.log(json);
    const fatturaHeader = json['P:FatturaElettronica'].FatturaElettronicaHeader;
    const cedente = fatturaHeader.CedentePrestatore;
    const cedenteIVA =
      cedente.DatiAnagrafici.IdFiscaleIVA.IdPaese +
      cedente.DatiAnagrafici.IdFiscaleIVA.IdCodice;
    return (
      <ViewerDiv>
        <ViewerContainer>
          <FattHeader>
            <Col>
              <FattTitle>DATI CEDENTE/PRESTATORE</FattTitle>
              <ColUl>
                <li>{cedente.DatiAnagrafici.Anagrafica.Denominazione}</li>
                <li>P. IVA: {cedenteIVA}</li>
                <li>{cedente.Sede.Indirizzo}</li>
                <li>
                  {cedente.Sede.CAP} - {cedente.Sede.Comune} (
                  {cedente.Sede.Provincia}) - {cedente.Sede.Nazione}
                </li>
                <li>Tel: {cedente.Contatti.Telefono}</li>
              </ColUl>
            </Col>
            <Col>
              <FattTitle>DATI DOCUMENTO</FattTitle>
            </Col>
            <Col right>
              <FattTitle>DATI CLIENTE</FattTitle>
              <ColUl>
                <li>{fatturaHeader.DatiTrasmissione.CodiceDestinatario}</li>
              </ColUl>
            </Col>
          </FattHeader>
        </ViewerContainer>
      </ViewerDiv>
    );
  }
}

export default Viewer;
