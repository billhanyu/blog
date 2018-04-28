import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/routes/Home';
import Category from './components/routes/Category';
import NoMatch from './components/routes/NoMatch';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Switch>
              <Route
                name='home'
                exact path='/'
                component={Home}
              />
              <Route
                name='category'
                path='/category/:category'
                component={Category}
              />
              <Route
                component={NoMatch}
              />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default hot(module)(App);
