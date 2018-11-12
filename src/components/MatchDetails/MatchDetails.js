import React from 'react';

import './MatchDetails.styles.scss';

const MatchDetails = () => (
  <div className='MatchDetails'>
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
);

export default MatchDetails;
