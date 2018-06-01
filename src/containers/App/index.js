import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import ResultsPage from '../ResultsPage';
import '../../shared/styles/font-faces.css';
import '../../shared/styles/variables.css';
import './index.styles.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route
            exact path={'/'}
            render={() => <ResultsPage />}
          />

          <Route
            render={() => <Redirect to={'/'} />}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;