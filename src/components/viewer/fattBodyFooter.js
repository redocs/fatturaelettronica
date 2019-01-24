import React, { Component } from 'react';
import styled from 'styled-components';
import ModalitaPagamento from './modalitaPagamento';
import { selectProperty } from '../../helpers';

const Footer = styled.div`
  display: flex;
  padding-top: 20px;
  margin-top: 10px;
  border-top: 2px solid #333;
`;
const FattTitle = styled.h2`
  margin: 0 0 5px;
  @media print {
    font-size: 16px;
  }
`;
const Col = styled.div`
  flex: 1;
  padding: 0 20px;
  ${props => (props.bordered ? 'border-left: 2px solid #333' : '')}
`;
const ColUl = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  text-align: ${props => (props.left ? 'left' : 'right')};
`;

const TitleH4 = styled.h4`
  margin: 10px 0 5px;
`;

class FattBodyFooter extends Component {
  render() {
    const json = this.props.info;
    const valuta = this.props.valuta;

    const fattProperty = selectProperty(json);
    const fatturaBody = json[fattProperty].FatturaElettronicaBody[0];
    const fatturaHeader = json[fattProperty].FatturaElettronicaHeader;

    const cedente = fatturaHeader[0].CedentePrestatore[0];
    const regimeFiscale = cedente.DatiAnagrafici[0].RegimeFiscale;
    const regimeFiscaleDesc = {
      RF01: '(ordinario)',
      RF02: '(contribuenti minimi)',
      RF03:
        '(nuove iniziative produttive) - Non più valido in quanto abrogato dalla legge di stabilità 2015',
      RF04: '(agricoltura e attività connesse e pesca)',
      RF05: '(vendita sali e tabacchi)',
      RF06: '(commercio fiammiferi)',
      RF07: '(editoria)',
      RF08: '(gestione servizi telefonia pubblica)',
      RF09: '(rivendita documenti di trasporto pubblico e di sosta)',
      RF10:
        '(intrattenimenti, giochi e altre attività di cui alla tariffa allegata al DPR 640/72)',
      RF11: '(agenzie viaggi e turismo)',
      RF12: '(agriturismo)',
      RF13: '(vendite a domicilio)',
      RF14:
        '(rivendita beni usati, oggetti d’arte, d’antiquariato o da collezione)',
      RF15:
        '(agenzie di vendite all’asta di oggetti d’arte, antiquariato o da collezione)',
      RF16: '(IVA per cassa P.A.)',
      RF17: '(IVA per cassa - art. 32-bis, D.L. 83/2012)',
      RF18: '(Regime forfettario)',
      RF19: '(altro)',
      NON: '(!!! codice non previsto !!!)'
    };

    const datiRiepilogo = fatturaBody.DatiBeniServizi[0].DatiRiepilogo[0];

    const esigibIVADesc = {
      I: '(esigibilità immediata)',
      D: '(esigibilità differita)',
      S: '(scissione dei pagamenti)'
    };

    return (
      <Footer>
        <Col>
          <FattTitle>REGIME FISCALE</FattTitle>
          <ColUl left>
            <li>
              {regimeFiscale} {regimeFiscaleDesc[regimeFiscale]}
            </li>
            <li>
              <TitleH4>Esigibilità IVA</TitleH4>
              <span>{esigibIVADesc[datiRiepilogo.EsigibilitaIVA]}</span>
            </li>
          </ColUl>
        </Col>
        <Col bordered>
          <FattTitle>METODO DI PAGAMENTO</FattTitle>
          {fatturaBody.DatiPagamento && (
            <ModalitaPagamento
              datiPagamento={fatturaBody.DatiPagamento[0]}
              valuta={valuta}
            />
          )}
        </Col>
      </Footer>
    );
  }
}

export default FattBodyFooter;
