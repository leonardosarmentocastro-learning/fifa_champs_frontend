import React, { Component } from 'react';

import './index.styles.css';

// TODO: Props
// label
// type
// placeholder
// isRequired
// value
class TextInput extends Component {
  render() {
    return (
      <div className='text-input'>
        <div className='field-details'>
          <span className='label text'>Slack display name</span>
          <span className='required-warning text'>* Required</span>

          {/* @variant -is-pristine -has-errors --has-no-errors */}
          <span className='status-icon --has-no-errors'>
            <div/>
            <div/>
          </span>
        </div>

        <div className='field-container'>
          <input className='input-field' placeholder='@rborcat'/>
        </div>
      </div>
    );
  }
}

export default TextInput;