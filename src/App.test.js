import React from 'react';
import ReactDOM from 'react-dom';
// import { cleanup } from 'react-testing-library';
import App from './App';

// afterEach(cleanup);

describe('Test', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn(() => {
        return { matches: true };
      })
    });
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
