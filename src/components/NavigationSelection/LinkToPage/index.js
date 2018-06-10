import React from 'react';
import PropTypes from 'prop-types';

import './index.styles.css';

const LinkToPage = (props) => (
  <li className='item link'
    onClick={() => props.redirectToPage()}
  >
    <p className='title'>{props.title}</p>

    {props.subtitle &&
      <p className='subtitle'>{props.subtitle}</p>
    }
  </li>
);

LinkToPage.propTypes = {
  redirectToPage: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

export default LinkToPage;