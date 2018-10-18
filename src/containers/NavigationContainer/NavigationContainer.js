import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  LinkToPage,
  NavigationSelection,
  SectionDivider,
} from '../../components/NavigationSelection';
import NavigationBar from '../../components/NavigationBar';

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
      isLinkHighlighted={() => this.isLinkHighlighted('/results')}
      title={'Resultados'}
      subtitle={'da temporada'}
      redirectToPage={() => this.redirectToPage('/results')}
    />,
    <SectionDivider
      text={'Area do jogador'}
    />,
    <LinkToPage
      isLinkHighlighted={() => this.isLinkHighlighted('/sign_up')}
      title={'Registrar-se'}
      redirectToPage={() => this.redirectToPage('/sign_up')}
    />,
  ];

  isLinkHighlighted = (pageUrl) => {
    const isLinkHighlighted = true;

    const currentPageUrl = this.props.history.location.pathname;
    const doesPageUrlRefersToCurrentPageUrl = (currentPageUrl === pageUrl);
    if (doesPageUrlRefersToCurrentPageUrl) {
      return isLinkHighlighted;
    }

    return !isLinkHighlighted;
  }

  redirectToPage = (pageUrl) => {
    const callback = () => this.props.history.push(pageUrl);
    this.toggleMenu(callback);
  }

  toggleMenu = (callback) => {
    this.setState(prevState => ({
      menu: {
        isOpen: !prevState.menu.isOpen,
      }
    }), callback); // Used to "redirectToPage" after toggling the menu.
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
