import React, { Component } from 'react';
import styled from 'styled-components';

const ColUl = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  line-height: 1.4;
`;

class InfoAzienda extends Component {
  render() {
    let info = this.props.info;
    let infoIVA =
      info.DatiAnagrafici[0].IdFiscaleIVA[0].IdPaese +
      info.DatiAnagrafici[0].IdFiscaleIVA[0].IdCodice;
    let indirizzoLungo = `${info.Sede[0].CAP} - ${info.Sede[0].Comune} (${
      info.Sede[0].Provincia
    }) - ${info.Sede[0].Nazione}`;
    if (!info) return false;
    return (
      <ColUl>
        <li>{info.DatiAnagrafici[0].Anagrafica[0].Denominazione}</li>
        <li>P. IVA: {infoIVA}</li>
        {info.Sede && <li>{info.Sede[0].Indirizzo}</li>}
        {info.Sede && <li>{indirizzoLungo}</li>}
        {info.Contatti && <li>Tel: {info.Contatti[0].Telefono}</li>}
      </ColUl>
    );
  }
}

export default InfoAzienda;
