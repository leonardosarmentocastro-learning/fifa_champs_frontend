import React from 'react';
import PropTypes from 'prop-types';

import Err from './Err';
import FieldIsRequiredHint from './FieldIsRequiredHint';
import Note from './Note';
import StatusIcon from './StatusIcon';
import './TextInput.styles.css';

const TextInput = ({
  error,
  isPristine,
  isRequired,
  label,
  note,
  onChange,
  placeholder,
  type,
  value,
}) =>
  <div className='TextInput'>
    <div className='field-details'>
      <span className='label'>{label}</span>
      {isRequired ? <FieldIsRequiredHint /> : <span/>}

      <StatusIcon
        hasErrors={Boolean(error)}
        isPristine={isPristine}
      />
    </div>

    <div className='field-container'>
      <input
        className='input-field'
        onChange={(event) => onChange(event)}
        placeholder={placeholder}
        type={type}
        value={value}
      />
    </div>

    {error ? <Err error={error} /> : <Note note={note} />}
  </div>

TextInput.propTypes = {
  error: PropTypes.string,
  isRequired: PropTypes.bool,
  label: PropTypes.string.isRequired,
  note: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.any.isRequired,
};

TextInput.defaultProps = {
  isRequired: false,
  note: '',
  placeholder: '',
  type: 'text',
};

export default TextInput;