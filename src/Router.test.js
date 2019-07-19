import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, mount } from 'enzyme';
import App from './App';
import { About, Contact } from './pages';
import Homepage from './pages/homepage';
import { MemoryRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';

// afterEach(cleanup);

let pathMap = {};
configure({ adapter: new Adapter() });
describe('routes using array of routers', () => {
  beforeAll(() => {
    const component = shallow(<App />);
    pathMap = component.find(Route).reduce((pathMap, route) => {
      const routeProps = route.props();
      pathMap[routeProps.path] = routeProps.component
        ? routeProps.component
        : routeProps.render;
      return pathMap;
    }, {});
    console.log(pathMap);
  });
  // it('should show Home component for / router (getting array of routes)', () => {
  //   expect(pathMap['/']).toBe(Homepage);
  // });
  // it('should show Visualizza component for /visualizza router', () => {
  //   expect(pathMap['/visualizza']).toBe(<Homepage />);
  // });
  // it('should show Visualizza component for /visualizza router', () => {
  //   let wrapper = mount(
  //     <MemoryRouter initialEntries={['/']}>
  //       <Switch>
  //         <Route exact path="/visualizza" render={() => <Homepage />} />
  //       </Switch>
  //     </MemoryRouter>
  //   );
  //   expect(wrapper.find(<Homepage />)).toHaveLength(1);
  //   //expect(wrapper.find("Route").prop('location').pathname).to.equal("/en")
  // });
  it('should show About component for /visualizzare-fatture-elettroniche router', () => {
    expect(pathMap['/visualizzare-fatture-elettroniche']).toBe(About);
  });
  it('should show Contact component for /contattaci router', () => {
    expect(pathMap['/contattaci']).toBe(Contact);
  });
});
