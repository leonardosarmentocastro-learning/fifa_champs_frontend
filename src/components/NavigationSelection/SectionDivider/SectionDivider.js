import React from 'react';
import PropTypes from 'prop-types';

import './SectionDivider.styles.css';

const SectionDivider = ({ text }) => (
  <li className='item section-divider'>
    <p className='text'>{ text }</p>
  </li>
);

SectionDivider.propTypes = {
  text: PropTypes.string.isRequired,
};

export default SectionDivider;
