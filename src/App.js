import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/routes/Home';
import Profile from './components/routes/Profile';
import NoMatch from './components/routes/NoMatch';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavigationMenu from './components/NavigationMenu';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <MuiThemeProvider>
            <div>
              <NavigationMenu />
              <Switch>
                <Route
                  name='home'
                  exact path='/'
                  component={Home}
                />
                <Route
                  name='profile'
                  path='/profile'
                  component={Profile}
                />
                <Route
                  component={NoMatch}
                />
              </Switch>
            </div>
          </MuiThemeProvider>
        </Router>
      </Provider>
    );
  }
}

export default hot(module)(App);
