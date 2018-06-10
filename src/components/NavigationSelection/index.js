import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import './index.styles.css';

class NavigationSelection extends Component {
  render() {
    return (
      <div className='navigation-selection'>
        <ul className='menu-items'>
          {this.props.menuItems.map((MenuItemComponent, index) => (
            <Fragment key={index}>
              {MenuItemComponent}
            </Fragment>
          ))}
        </ul>
      </div>
    );
  }
}

NavigationSelection.propTypes = {
  menuItems: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default NavigationSelection;