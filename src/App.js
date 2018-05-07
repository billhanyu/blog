import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/routes/Home';
import Profile from './components/routes/Profile';
import Post from './components/routes/Post';
import NoMatch from './components/routes/NoMatch';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Auth from './components/routes/Auth';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <MuiThemeProvider>
            <div>
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
                  name='post'
                  path='/posts/:post'
                  component={Post}
                />
                <Route
                  name='login'
                  path='/login'
                  render={() => {
                    return <Auth type='login' />;
                  }}
                />
                <Route
                  name='signup'
                  path='/signup'
                  render={() => {
                    return <Auth type='signup' />;
                  }}
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
