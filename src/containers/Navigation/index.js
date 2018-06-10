import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import LinkToPage from '../../components/NavigationSelection/LinkToPage';
import NavigationBar from '../../components/NavigationBar';
import NavigationSelection from '../../components/NavigationSelection';
import SectionDivider from '../../components/NavigationSelection/SectionDivider';

class NavigationContainer extends Component {
  state = {
    menu: {
      isOpen: false,
    },
  };

  menuItems = [
    <SectionDivider
      text={'Xampions liga'}
    />,
    <LinkToPage
      title={'Resultados'}
      subtitle={'da temporada'}
      redirectToPage={() => this.redirectToPage('/results')}
    />,
    <SectionDivider
      text={'Area do jogador'}
    />,
    <LinkToPage
      title={'Registrar-se'}
      redirectToPage={() => this.redirectToPage('/sign_up')}
    />,
  ];

  redirectToPage = (pageUrl) => {
    const callback = () => this.props.history.push(pageUrl);
    this.toggleMenu(callback);
  }

  toggleMenu = (callback) => {
    this.setState(prevState => ({
      menu: {
        isOpen: !prevState.menu.isOpen,
      }
    }), () => {
      // Used to "redirectToPage" after toggling the menu.
      if (callback) {
        callback();
      }
    });
  }

  render() {
    return (
      <Fragment>
        <NavigationBar
          isOpen={this.state.menu.isOpen}
          toggleMenu={this.toggleMenu}
        />

        {this.state.menu.isOpen &&
          <NavigationSelection
            isVisible={this.state.menu.isOpen}
            menuItems={this.menuItems}
          />
        }
      </Fragment>
    );
  }
}

NavigationContainer.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  })
}

export default withRouter(NavigationContainer);