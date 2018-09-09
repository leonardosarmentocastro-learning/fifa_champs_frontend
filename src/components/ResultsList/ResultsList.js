import React from 'react';
// import PropTypes from 'prop-types';

import MatchDetails from '../MatchDetails';
import MatchTags from '../MatchTags';
import './ResultsList.styles.css';

const ResultsList = () => (
  <div className='ResultsList'>
    <div className='title-container'>
      {/* TODO: use props. */}
      <p className='title'>Segunda-feira, 4 de junho de 2018</p>
    </div>

    <ul className='list'>
      {/* TODO: use props. */}
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
        <li className='item' key={n}>
          <MatchDetails
            // ...
            // awayTeam: { players: ['@baiano', '@alan'], score: 0 }
            // homeTeam: { players: ['@gil', '@rborcat'], score: 3 }
          />

          <MatchTags
            // ...
            // tags: ['#pureDominance', '#golAos90']
          />
        </li>)
      )}
    </ul>
  </div>
);

// TODO: to be defined.
ResultsList.propTypes = {
  // results: PropTypes.array.isRequired,
};

export default ResultsList;
