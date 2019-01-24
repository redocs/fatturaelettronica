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

export function selectValuta(valuta) {
  const valutaDesc = {
    EUR: '€',
    DOL: '$'
  };
  return valutaDesc[valuta];
}
