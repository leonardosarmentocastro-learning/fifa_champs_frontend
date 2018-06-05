import React, { Component, Fragment } from 'react';

import NavigationBar from '../NavigationBar';
import './index.styles.css';

class ResultsPage extends Component {
  render() {
    return (
      <Fragment>
        <NavigationBar />

        <div className='results-page'>
          <p className='title offset-below'>Resultados da temporada</p>

          <div className='action-buttons'>
            <button className='select-season'>
              <div className='common-area'>
                <p className='text'>Maio 2018</p>
              </div>

              <span className='faded-area'>
                <span className='icon' />
              </span>
            </button>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default ResultsPage;