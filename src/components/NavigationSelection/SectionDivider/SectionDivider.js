import React from 'react';
import PropTypes from 'prop-types';

import './SectionDivider.styles.scss';

const SectionDivider = ({ text }) => (
  <li className='SectionDivider item'>
    <p className='text'>{ text }</p>
  </li>
);

SectionDivider.propTypes = {
  text: PropTypes.string.isRequired,
};

export default SectionDivider;
