import React from 'react';
import styled from 'styled-components';

const FlexContainer = styled.div`
  width: 100%;
  display: flex;
`;

const Col = styled.div`
  flex: ${props => props.flex};
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: left;
  background: #fff;
  padding: 10px;
  box-sizing: border-box;
  min-height: calc(100vh - 70px);

  p {
    margin: 0 0 10px;
  }
  a {
    color: ${props => props.theme.secondaryColor};
    text-decoration: none;
    :hover {
      text-decoration: underline;
    }
  }
`;

const TitleH2 = styled.h2`
  margin: 0;
  padding: 10px 0;
`;

const FormItem = styled.div`
  margin: 0 0 5px;
  font-size: 14px;
  label {
    color: #5a5a5a;
    span {
      display: block;
    }
  }
  input {
    border: none;
    border-bottom: 1px solid ${props => props.theme.buttonColor};
    width: 100%;
    line-height: 36px;
    padding: 0;
    font-size: 16px;
    :focus {
      outline: none;
    }
    :-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px #fff inset;
      :hover,
      :focus {
        -webkit-box-shadow: 0 0 0px 1000px #fff inset;
      }
    }
  }
  textarea {
    border: none;
    border-bottom: 1px solid ${props => props.theme.buttonColor};
    width: 100%;
    -webkit-appearance: none;
    resize: none;
    font-size: 16px;
    :focus {
      outline: none;
    }
  }
  button {
    color: ${props => props.theme.secondaryColor};
    border: 1px solid ${props => props.theme.secondaryColor};
    background: ${props => props.theme.secondaryColorBg};
    border-radius: 4px;
    font-size: 16px;
    padding: 10px 50px;
    min-width: 100%;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    :hover {
      background: ${props => props.theme.secondaryColor};
      border-color: ${props => props.theme.secondaryColorBg};
      color: ${props => props.theme.secondaryColorBg};
    }
  }
`;

const ThankYouDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const About = () => (
  <Content>
    <TitleH2> Visualizzare Fatture Elettroniche </TitleH2>
    <div>
      <p>
        Con l’ introduzione delle Fatture Elettroniche vi potrà capitare di
        ricevere dei file XML fatture elettroniche.
      </p>
      <p>
        Chi vi invia questi file con la Fattura Elettronica dovrebbe inviarvi
        anche una versione leggibile in PDF(o simili).
      </p>
      <h3>Fatture Elettroniche come fare a visualizzarle</h3>
      <p>
        Se non avete un programma per fatture elettroniche questi XML possono
        sembrare illeggibili, questo tool che mettiamo a vostra disposizione vi
        permette di caricare questi file XML della Fattura Elettronica e di
        visualizzarli come PDF.
      </p>
    </div>
  </Content>
);

export const Contact = () => (
  <Content>
    <FlexContainer>
      <Col flex="2">
        <TitleH2> Vuoi informazioni sul servizio? </TitleH2>
        <div>
          <p>
            Se hai bisogno di informazioni sul servizio di visualizzazione delle
            Fatture Elettroniche contattaci.
          </p>
          <p>
            Puoi inviarci una mail a{' '}
            <a href="mailto:tool@spazionova.it">tool@spazionova.it</a>.
          </p>
        </div>
      </Col>
      <Col flex="1">
        <ContactForm />
      </Col>
    </FlexContainer>
  </Content>
);

const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
};

class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', email: '', message: '', send: false };
  }

  /* Here’s the juicy bit for posting the form submission */

  handleSubmit = e => {
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'contact', ...this.state })
    })
      .then(this.setState({ send: true }))
      .catch(error => alert(error));

    e.preventDefault();
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { name, email, message, send } = this.state;
    return (
      <div>
        {!send && (
          <form onSubmit={this.handleSubmit}>
            <FormItem>
              <label>
                <span>Nome e Cognome:</span>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={this.handleChange}
                  required
                />
              </label>
            </FormItem>
            <FormItem>
              <label>
                <span>Email:</span>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={this.handleChange}
                  required
                />
              </label>
            </FormItem>
            <FormItem>
              <label>
                <span>Messaggio:</span>
                <textarea
                  name="message"
                  value={message}
                  onChange={this.handleChange}
                  required
                  rows="4"
                />
              </label>
            </FormItem>
            <FormItem>
              <button type="submit">Invia</button>
            </FormItem>
          </form>
        )}
        {send && <ThankYouDiv>Grazie dell'invio</ThankYouDiv>}
      </div>
    );
  }
}
