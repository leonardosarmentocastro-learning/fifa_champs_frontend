import React, { Component } from 'react';

import ActionButton from '../ActionButton';
import ResultsList from '../ResultsList';
import './ResultsPage.styles.css';

export class ResultsPage extends Component {
  render() {
    return (
      <div className='results-page shared-props-for-page'>
        <div className='title-container'>
          <p className='title'>Resultados da temporada</p>
        </div>

        <div className='action-buttons-container'>
          <ActionButton
            colorName='dark'
            iconName='arrow-down'
            text='Junho 2018'
          />

          <ActionButton
            colorName='hotpink'
            iconName='add'
            text='Adicionar partida'
            tweaks={{
              isTextUnderlined: false,
            }}
          />
        </div>

        <div className='results-list-container'>
          <ResultsList />
        </div>
      </div>
    );
  }
}
