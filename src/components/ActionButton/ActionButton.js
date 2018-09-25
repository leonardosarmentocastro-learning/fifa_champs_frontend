import React from 'react';
import PropTypes from 'prop-types';

import LoadingSpinner from './LoadingSpinner';
import './ActionButton.styles.css';

const ActionButton = ({
  colorName,
  iconName,
  isDisabled,
  isLoading,
  onClick,
  text,
  tweaks,
}) => (
  <div
    className={`ActionButton
      ${'--color-' + colorName}
      ${isDisabled ? '--is-disabled' : ''}
      ${isLoading ? '--is-loading' : ''}
    `.trim()}
    onClick={(event) => {
      if (isDisabled) return event.preventDefault();
      onClick(event);
    }}
  >
    <div className='text-area'>
      {isLoading &&
        <LoadingSpinner />
      }

      {!isLoading &&
        <p className={`text
          ${tweaks.isTextUnderlined ? '--is-underlined' : ''}
        `.trim()}
        >
          {text}
        </p>
      }
    </div>

    {iconName &&
      <span className='faded-area'>
        <span className={`icon ${'--icon-' + iconName}`}/>
      </span>
    }
  </div>
);

const COLOR_NAMES = ['dark', 'hotpink'];
const ICON_NAMES = ['add', 'arrow-down'];

ActionButton.propTypes = {
  colorName: PropTypes.oneOf(COLOR_NAMES).isRequired,
  iconName: PropTypes.oneOf(ICON_NAMES),
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
  tweaks: PropTypes.shape({
    isTextUnderlined: PropTypes.bool,
  })
};

ActionButton.defaultProps = {
  colorName: COLOR_NAMES[0],
  text: '',
  tweaks: {
    isTextUnderlined: false,
  }
};

export default ActionButton;
