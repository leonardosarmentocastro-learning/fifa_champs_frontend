import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './index.styles.css';

class NavigationBar extends Component {
  render() {
    return (
      <header className={`navigation-bar
        ${this.props.isOpen ? '--menu-is-open' : ''}
      `.trim()}>
        <div className='title'>
          <p className='text'># fifa-champs</p>
        </div>

        <div className='menu-container'>
          <div className='menu'
            onClick={() => this.props.toggleMenu()}
          >
            <span className='text'>Menu</span>

            <div className='icon'>
              <div/>
              <div/>
              <div/>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

NavigationBar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
};

export default NavigationBar;