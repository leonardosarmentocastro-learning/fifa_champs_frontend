import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import ResultsPage from '../ResultsPage';
import SignupPage from '../SignupPage';
import '../../shared/styles/font-faces.css';
import '../../shared/styles/variables.css';
import './index.styles.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route
            exact path={'/results'}
            render={() => <ResultsPage />}
          />

          <Route
            exact path={'/sign_up'}
            render={() => <SignupPage />}
          />

          <Route
            render={() => <Redirect to={'/sign_up'} />}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;