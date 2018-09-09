import React from 'react';
import PropTypes from 'prop-types';

import './Note.styles.css';

const Note = ({ note }) =>
  <p className='Note'>{note.trim()}</p>

Note.propTypes = {
  note: PropTypes.string.isRequired,
};

export default Note;
