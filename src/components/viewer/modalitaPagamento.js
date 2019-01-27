import React, { Component } from 'react';
import styled from 'styled-components';
import { correctData } from '../../helpers';

const ColUl = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  text-align: ${props => (props.left ? 'left' : 'right')};
`;

const Table = styled.table`
  border-collapse: collapse;
  line-height: 1.5;
  vertical-align: middle;
  margin: 20px 0;
  width: 100%;
`;

const Thead = styled.thead`
  background: #ccc;
  @media print {
    background: #ccc;
    border-bottom: 1px solid #333;
  }
`;

const Th = styled.th`
  padding: 5px;
  text-align: ${props => (props.right ? 'right' : 'left')};
`;
const Td = styled.td`
  padding: 5px;
  text-align: ${props => (props.right ? 'right' : 'left')};
`;

class ModalitaPagamento extends Component {
  render() {
    const datiPagamento = this.props.datiPagamento;
    const valuta = this.props.valuta;
    //const datiPagamento = fatturaBody.DatiPagamento[0];
    const modalitaPagamento =
      datiPagamento.DettaglioPagamento[0].ModalitaPagamento;

    const modalitPagamentoDesc = {
      MP01: '(contanti)',
      MP02: '(assegno)',
      MP03: '(assegno circolare)',
      MP04: '(contanti presso Tesoreria)',
      MP05: '(bonifico)',
      MP06: '(vaglia cambiario)',
      MP07: '(bollettino bancario)',
      MP08: '(carta di pagamento)',
      MP09: '(RID)',
      MP10: '(RID utenze)',
      MP11: '(RID veloce)',
      MP12: '(RIBA)',
      MP13: '(MAV)',
      MP14: '(quietanza erario)',
      MP15: '(giroconto su conti di contabilità speciale)',
      MP16: '(domiciliazione bancaria)',
      MP17: '(domiciliazione postale)',
      MP18: '(bollettino di c/c postale)',
      MP19: '(SEPA Direct Debit)',
      MP20: '(SEPA Direct Debit CORE)',
      MP21: '(SEPA Direct Debit B2B)',
      MP22: '(Trattenuta su somme già riscosse)'
    };

    const condizioniPagamento = datiPagamento.CondizioniPagamento;
    const condizioniPagamentoDesc = {
      TP01: 'Pagamento a rate',
      TP02: 'Pagamento completo',
      TP03: 'Anticipo'
    };

    const scadenzaPagamento = datiPagamento.DettaglioPagamento[0]
      .DataScadenzaPagamento
      ? correctData(datiPagamento.DettaglioPagamento[0].DataScadenzaPagamento)
      : '';

    const importoPagamento =
      datiPagamento.DettaglioPagamento[0].ImportoPagamento;

    return (
      <div>
        <ColUl left>
          <li>
            Metodo: {modalitaPagamento}{' '}
            {modalitPagamentoDesc[modalitaPagamento]}
          </li>
          <li>Pagamento: {condizioniPagamentoDesc[condizioniPagamento]}</li>
          <Table>
            <Thead>
              <tr>
                <Th scope="col">#</Th>
                <Th scope="col">Scadenza</Th>
                <Th right scope="col">
                  Importo
                </Th>
              </tr>
            </Thead>
            <tbody>
              <tr>
                <Th scope="row" />
                <Td>{scadenzaPagamento}</Td>
                <Td right>
                  {importoPagamento} {valuta}
                </Td>
              </tr>
            </tbody>
          </Table>
        </ColUl>
      </div>
    );
  }
}

export default ModalitaPagamento;
