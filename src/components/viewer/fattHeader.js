import React, { Component } from 'react';
import styled from 'styled-components';
import InfoAzienda from './infoAzienda';
import DatiDocumento from './datiDocumento';
import { selectProperty } from '../../helpers';

const FattHeading = styled.div`
  display: flex;
`;
const FattTitle = styled.h2`
  margin: 0 0 5px;
  @media print {
    font-size: 16px;
  }
`;
const Col = styled.div`
  flex: 1;
  text-align: ${props => (props.right ? 'right' : 'left')};
`;

class FattHeader extends Component {
  render() {
    const json = this.props.json;

    const fattProperty = selectProperty(json);
    const fatturaBody = json[fattProperty].FatturaElettronicaBody[0];
    const fatturaHeader = json[fattProperty].FatturaElettronicaHeader;

    const cedente = fatturaHeader[0].CedentePrestatore[0];
    const committente = fatturaHeader[0].CessionarioCommittente[0];

    const datiDocumento = fatturaBody.DatiGenerali[0].DatiGeneraliDocumento[0];

    return (
      <FattHeading>
        <Col>
          <FattTitle> DATI CEDENTE / PRESTATORE </FattTitle>
          <InfoAzienda info={cedente} />
        </Col>
        <Col>
          <FattTitle> DATI DOCUMENTO </FattTitle>
          <DatiDocumento info={datiDocumento} />
        </Col>
        <Col right>
          <FattTitle> DATI CLIENTE </FattTitle>
          {/* < li > {
          fatturaHeader[0].DatiTrasmissione[0].CodiceDestinatario
        } </li> */}
          <InfoAzienda info={committente} />
        </Col>
      </FattHeading>
    );
  }
}

export default FattHeader;
