import React from 'react';
import styled from 'styled-components';

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: left;
`;

export const About = () => (
  <Content>
    <h2> Visualizzare Fatture Elettroniche </h2>
    <div>
      <p>
        Con l’ introduzione delle Fatture Elettroniche vi potrà capitare di
        ricevere dei file XML fatture elettroniche.
      </p>
      <p>
        Chi vi invia questi file con la Fattura Elettronica dovrebbe inviarvi
        anche una versione leggibile in PDF(o simili).
      </p>
      <p>
        Fatture Elettroniche come fare a visualizzarle Se non avete un programma
        per fatture elettroniche questi XML possono sembrare illeggibili, questo
        tool che mettiamo a vostra disposizione vi permette di caricare questi
        file XML della Fattura Elettronica e di visualizzarli come PDF.
      </p>
    </div>
  </Content>
);
