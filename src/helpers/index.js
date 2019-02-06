export function checkProperty(xml) {
  var prop = Object.keys(xml);
  return prop.toString().includes("FatturaElettronica")
}

export function selectProperty(xml) {
  var prop = Object.keys(xml);
  return prop.toString();
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

export function retrieveDenominazione(anagrafica) {
  if (typeof anagrafica.Denominazione !== 'undefined') {
    return anagrafica.Denominazione.toString()
  }
  let denominazione;
  if (typeof anagrafica.Nome !== 'undefined') {
    denominazione = anagrafica.Nome.toString();
  }
  if (typeof anagrafica.Cognome !== 'undefined') {
    denominazione += ' ' + anagrafica.Cognome.toString();
  }
  return denominazione;
}

export function convertP7m(file) {
  return file.match(/<\?xml[\s\S]*?FatturaElettronica>/gm).toString();
}

export function returnObject(file) {
  if (!checkProperty(file)) {
    return false;
  };
  const fattProperty = selectProperty(file);
  const fatturaBody = file[fattProperty].FatturaElettronicaBody[0];
  const fatturaHeader = file[fattProperty].FatturaElettronicaHeader;
  const cedente = fatturaHeader[0].CedentePrestatore[0];
  const datiDocumento = fatturaBody.DatiGenerali[0].DatiGeneraliDocumento[0];
  const dateDoc = correctData(datiDocumento.Data);
  const name = retrieveDenominazione(cedente.DatiAnagrafici[0].Anagrafica[0]);
  const dateDocTimestamp = dateToTimestamp(dateDoc);
  const valueTot = datiDocumento.ImportoTotaleDocumento ?
    parseFloat(datiDocumento.ImportoTotaleDocumento.toString()) :
    0;
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

export function getParamUrl() {
  var url = new URL(window.location.href);
  var v = url.searchParams.get('v');
  return v;
}