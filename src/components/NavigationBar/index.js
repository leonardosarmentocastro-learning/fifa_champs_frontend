import React, { Component } from 'react';

import './index.styles.css';

class NavigationBar extends Component {
  render() {
    return (
      <header className='navigation-bar'>
        <div className='title'>
          <p className='text'># fifa-champs</p>
        </div>

        <div className='menu'>
          <button className='button'/>
        </div>
      </header>
    );
  }
}

export default NavigationBar;