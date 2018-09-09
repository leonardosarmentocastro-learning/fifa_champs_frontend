import React from 'react';
import PropTypes from 'prop-types';

import './ActionButton.styles.css';

const ActionButton = ({
  colorName,
  iconName,
  onClick,
  text,
  tweaks,
}) => (
  <div className={`ActionButton ${'--color-' + colorName}`}
    onClick={onClick}
  >
    <div className='text-area'>
      <p className={`text
        ${tweaks.isTextUnderlined ? '--is-underlined' : ''}
      `.trim()}
      >
        {text}
      </p>
    </div>

    <span className='faded-area'>
      <span className={`icon ${'--icon-' + iconName}`}/>
    </span>
  </div>
);

const COLOR_NAMES = ['dark', 'hotpink'];
const ICON_NAMES = ['add', 'arrow-down'];

ActionButton.propTypes = {
  colorName: PropTypes.oneOf(COLOR_NAMES).isRequired,
  iconName: PropTypes.oneOf(ICON_NAMES).isRequired,
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
  tweaks: PropTypes.shape({
    isTextUnderlined: PropTypes.bool,
  })
};

ActionButton.defaultProps = {
  colorName: COLOR_NAMES[0],
  iconName: ICON_NAMES[0],
  onClick: () => console.warn('[component] ActionButton: "onClick" event prop not set.'),
  text: '',
  tweaks: {
    isTextUnderlined: true,
  }
};

export default ActionButton;
