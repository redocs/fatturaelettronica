import React, { Component } from 'react';
import styled from 'styled-components';

const Table = styled.table`
  border-collapse: collapse;
  line-height: 1.5;
  vertical-align: middle;
  margin: 20px 0;
  @media print {
    font-size: 12px;
  }
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
`;
const Td = styled.td`
  padding: 5px;
`;

class TableFattura extends Component {
  render() {
    const info = this.props.info;
    const valuta = this.props.valuta;

    const tipoSconto = {
      SC: 'Sconto',
      MG: 'Maggiorazione'
    };

    const scontoMaggiorazione = sconto =>
      sconto.each(function() {
        return (
          <span>
            <span>{tipoSconto[sconto.Tipo]}</span>
            <span>{sconto.Percentuale}</span>
            <span>{parseFloat(sconto.Importo, 10).toFixed(2)}</span>
          </span>
        );
      });

    const listItems = info.map(info => {
      return (
        <tr key={info.NumeroLinea}>
          <Th scope="row">{info.NumeroLinea}</Th>
          <Td>{info.Descrizione}</Td>
          <Td>{info.Quantita ? parseInt(info.Quantita, 10) : '0'}</Td>
          <Td>
            {parseFloat(info.PrezzoUnitario, 10).toFixed(2)} {valuta}
          </Td>
          <Td>{info.ScontoMaggiorazione ? scontoMaggiorazione : ''}</Td>
          <Td>
            {parseFloat(info.PrezzoTotale, 10).toFixed(2)} {valuta}
          </Td>
          <Td>{parseInt(info.AliquotaIVA, 10)}</Td>
        </tr>
      );
    });
    return (
      <Table>
        <Thead>
          <tr>
            <Th scope="col">Nr</Th>
            <Th scope="col">Descrizione</Th>
            <Th scope="col">Quantità</Th>
            <Th scope="col">Prezzo Unitario</Th>
            <Th scope="col">Sconto / Magg.</Th>
            <Th scope="col">Importo</Th>
            <Th scope="col">Codice IVA</Th>
          </tr>
        </Thead>
        <tbody>{listItems}</tbody>
      </Table>
    );
  }
}

export default TableFattura;
