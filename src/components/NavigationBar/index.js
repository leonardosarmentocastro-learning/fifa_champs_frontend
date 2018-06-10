import React, { Component } from 'react';

import './index.styles.css';

class NavigationBar extends Component {
  state = {
    isOpen: false,
  };

  toggleMenu() {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }));
  }

  render() {
    return (
      <header className={`navigation-bar
        ${this.state.isOpen ? '--menu-is-open' : ''}
      `.trim()}>
        <div className='title'>
          <p className='text'># fifa-champs</p>
        </div>

        <div className='menu-container'>
          <div className='menu'
            onClick={() => this.toggleMenu()}
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

export default NavigationBar;