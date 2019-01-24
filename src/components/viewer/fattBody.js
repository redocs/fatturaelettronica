import React, { Component } from 'react';
import styled from 'styled-components';
import TableFattura from './tableFattura';
import FattBodyFooter from './fattBodyFooter';
import { selectProperty, selectValuta } from '../../helpers';

const FattBodyPart = styled.div`
  display: flex;
  border-top: 2px solid #333;
  border-bottom: 2px solid #333;
  padding: 20px 0;
  flex-direction: column;
  margin: 20px 0;
`;
const FattTitle = styled.h2`
  margin: 0 0 5px;
  @media print {
    font-size: 16px;
  }
`;

class FattBody extends Component {
  render() {
    const json = this.props.json;

    const fattProperty = selectProperty(json);
    const fatturaBody = json[fattProperty].FatturaElettronicaBody[0];

    const valuta = fatturaBody.DatiGenerali[0].DatiGeneraliDocumento[0].Divisa;
    const valutaFatt = selectValuta(valuta);
    const dettaglioLinee = fatturaBody.DatiBeniServizi[0].DettaglioLinee;

    return (
      <FattBodyPart>
        <FattTitle>PRODOTTI E SERVIZI</FattTitle>
        <TableFattura info={dettaglioLinee} valuta={valutaFatt} />
        <FattBodyFooter info={json} valuta={valutaFatt} />
      </FattBodyPart>
    );
  }
}

export default FattBody;
