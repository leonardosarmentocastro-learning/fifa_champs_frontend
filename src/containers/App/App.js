import React, { Component, Fragment } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import configureShared from '../../shared';
import NavigationContainer from '../NavigationContainer';
import ResultsPageContainer from '../ResultsPageContainer';
import {
  signupAPI,
  SignupPageContainer,
  signupService,
  signupValidator,
} from '../SignupPageContainer';
import '../../shared/styles/font-faces.css';
import '../../shared/styles/variables.css';
import '../../shared/styles/props-for-page.css';
import './App.styles.css';

class App extends Component {
  componentDidMount() {
    configureShared.singletons();
  }

  render() {
    return (
        <Router>
          <Fragment>
            <NavigationContainer />

            <Switch>
              <Route
                exact path={'/results'}
                render={() => <ResultsPageContainer />}
              />

              <Route
                exact path={'/sign_up'}
                render={() => <SignupPageContainer
                  signupAPI={signupAPI}
                  signupService={signupService}
                  signupValidator={signupValidator}
                />}
              />

              <Route
                render={() => <Redirect to={'/sign_up'} />}
              />
            </Switch>
          </Fragment>
        </Router>
    );
  }
}

export default App;
