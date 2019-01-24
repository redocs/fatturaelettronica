import React, { Component } from 'react';
import styled from 'styled-components';
import { selectProperty, selectValuta } from '../../helpers';

const Footer = styled.div`
  display: flex;
  margin-bottom: 20px;
  ${props =>
    props.bordered
      ? 'border-bottom: 2px solid #333; padding-bottom: 20px;'
      : ''};
`;
const FattTitle = styled.h2`
  margin: 0 0 5px;
  @media print {
    font-size: 16px;
  }
`;
const Col = styled.div`
  flex: 1;
  text-align: center;
  margin: 0 20px;
`;
const ColUl = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  line-height: 1.4;
`;

const ColLi = styled.li`
  display: flex;
  justify-content: ${props => (props.centered ? 'center' : 'space-beetwen')};
`;

const Span = styled.span`
  width: 100%;
  text-align: ${props => (props.right ? 'right' : 'left')};
`;

class FattFooter extends Component {
  render() {
    const json = this.props.json;

    const fattProperty = selectProperty(json);
    const fatturaBody = json[fattProperty].FatturaElettronicaBody[0];
    const valuta = fatturaBody.DatiGenerali[0].DatiGeneraliDocumento[0].Divisa;
    const valutaFatt = selectValuta(valuta);
    //const fatturaHeader = json[fattProperty].FatturaElettronicaHeader;

    //const cedente = fatturaHeader[0].CedentePrestatore[0];
    //const committente = fatturaHeader[0].CessionarioCommittente[0];

    const datiDocumento = fatturaBody.DatiGenerali[0].DatiGeneraliDocumento[0];

    return (
      <div>
        <Footer bordered>
          <Col>
            <FattTitle> DATI AGGIUNTIVI </FattTitle>
            <ColUl>
              {datiDocumento.Causale && (
                <ColLi centered>Causale: {datiDocumento.Causale}</ColLi>
              )}
            </ColUl>
          </Col>
        </Footer>
        <Footer>
          <Col />
          <Col>
            <FattTitle> CALCOLI </FattTitle>
            <ColUl>
              {datiDocumento.ImportoTotaleDocumento && (
                <ColLi>
                  <Span>Totale Documento:</Span>
                  <Span right>
                    {datiDocumento.ImportoTotaleDocumento} {valutaFatt}
                  </Span>
                </ColLi>
              )}
            </ColUl>
          </Col>
        </Footer>
      </div>
    );
  }
}

export default FattFooter;
