export function checkProperty(xml) {
  return (
    xml.hasOwnProperty('P:FatturaElettronica') ||
    xml.hasOwnProperty('p:FatturaElettronica') ||
    xml.hasOwnProperty('FatturaElettronica')
  );
}

export function selectProperty(xml) {
  if (xml.hasOwnProperty('P:FatturaElettronica')) {
    return 'P:FatturaElettronica';
  }
  if (xml.hasOwnProperty('p:FatturaElettronica')) {
    return 'p:FatturaElettronica';
  }
  if (xml.hasOwnProperty('FatturaElettronica')) {
    return 'FatturaElettronica';
  }
}

export function correctData(data) {
  const oldData = data.toString().split('-');
  let newData = oldData[2] + '/' + oldData[1] + '/' + oldData[0];
  return newData;
}

export function dateToTimestamp(date) {
  var newdate = date
    .split('/')
    .reverse()
    .join('/');
  return new Date(newdate).getTime() / 1000;
}

export function selectValuta(valuta) {
  const valutaDesc = {
    EUR: '€',
    DOL: '$'
  };
  return valutaDesc[valuta];
}

export function returnObject(file) {
  const fattProperty = selectProperty(file);
  const fatturaBody = file[fattProperty].FatturaElettronicaBody[0];
  const fatturaHeader = file[fattProperty].FatturaElettronicaHeader;
  const cedente = fatturaHeader[0].CedentePrestatore[0];
  const datiDocumento = fatturaBody.DatiGenerali[0].DatiGeneraliDocumento[0];
  const dateDoc = correctData(datiDocumento.Data);
  const name = cedente.DatiAnagrafici[0].Anagrafica[0].Denominazione.toString();
  const dateDocTimestamp = dateToTimestamp(dateDoc);
  const valueTot = datiDocumento.ImportoTotaleDocumento
    ? datiDocumento.ImportoTotaleDocumento.toString()
    : 0;
  const valuta = datiDocumento.Divisa;
  const valueCurrency = selectValuta(valuta);

  return {
    file,
    name,
    dateDoc,
    dateDocTimestamp,
    valueTot,
    valueCurrency
  };
}
