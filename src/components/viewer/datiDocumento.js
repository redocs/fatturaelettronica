import React, { Component } from 'react';
import styled from 'styled-components';
import { correctData } from '../../helpers';

const ColUl = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  line-height: 1.4;
`;

class DatiDocumento extends Component {

  render() {
    let info = this.props.info;
    const tipoFattura = info.TipoDocumento;
    const tipoFatturaDesc = {
      TD01: 'Fattura',
      TD02: 'Acconto/anticipo su fattura',
      TD03: 'Acconto/anticipo su parcella',
      TD04: 'Nota di credito',
      TD05: 'Nota di debito',
      TD06: 'Parcella'
    };

    const infoData = correctData(info.Data);

    if (!info) return false;
    return (
      <ColUl>
        <li>
          Tipo: {tipoFatturaDesc[tipoFattura]} ({tipoFattura})
        </li>
        <li>Numero: {info.Numero}</li>
        <li>Data: {infoData}</li>
      </ColUl>
    );
  }
}

export default DatiDocumento;
