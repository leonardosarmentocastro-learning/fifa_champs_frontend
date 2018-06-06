import React, { Component, Fragment } from 'react';

import ActionButton from '../ActionButton';
import NavigationBar from '../NavigationBar';
import './index.styles.css';

class ResultsPage extends Component {
  render() {
    return (
      <Fragment>
        <NavigationBar />

        <div className='results-page'>
          <div className='title-container'>
            <p className='title'>Resultados da temporada</p>
          </div>

          <div className='action-buttons-container'>
            <ActionButton
              colorName='ice'
              iconName='arrow-down'
              text='Junho 2018'
            />

            <ActionButton
              colorName='lemon'
              iconName='add'
              text='Adicionar partida'
              tweaks={{
                isTextUnderlined: false,
              }}
            />
          </div>


        </div>
      </Fragment>
    );
  }
}

export default ResultsPage;