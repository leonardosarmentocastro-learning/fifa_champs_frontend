import React from 'react';
import PropTypes from 'prop-types';

import './StatusIcon.styles.scss';

const StatusIcon = ({ hasErrors, isPristine }) => {
  const cssVariant = (() => {
    switch (true) {
      case isPristine: return '--is-pristine';
      case hasErrors: return '--has-errors';
      case !hasErrors: return '--has-no-errors';
      default: return '--is-pristine';
    }
  })();

  return (
    <span className={`StatusIcon ${cssVariant}`}>
      <div/>
      <div/>
    </span>
  );
};

StatusIcon.propTypes = {
  hasErrors: PropTypes.bool.isRequired,
  isPristine: PropTypes.bool.isRequired,
};

export default StatusIcon;
