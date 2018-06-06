import React from 'react';
import PropTypes from 'prop-types';

import './index.styles.css';

const ResultsList = ({ results }) => (
  <div className='results-list'>
    <div className='title-container'>
      {/* TODO: use props. */}
      <p className='title'>Segunda-feira, 4 de junho de 2018</p>
    </div>

    <ul className='list'>
      {/* TODO: use props. */}
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
        <li className='item'>
          <div className='match-details'>
            <div className='home-players container'>
              <p className='player'>@rborcat</p>
              <p className='player'>@baiano</p>
            </div>

            <div className='score'>3 - 0</div>

            <div className='away-players container'>
              <p className='player'>@gil</p>
              <p className='player'>@alan</p>
            </div>
          </div>

          {/* TODO */}
          <div className='tags'>
          </div>
        </li>)
      )}
    </ul>
  </div>
);

ResultsList.propTypes = {
  results: PropTypes.array.isRequired,
};

export default ResultsList;