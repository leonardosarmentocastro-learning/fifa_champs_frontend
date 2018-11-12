import React from 'react';
import { random } from 'lodash';
import PropTypes from 'prop-types';

import ActionButton from '../ActionButton';
import './ErrorPage.styles.scss';

const GIFS = [
  'https://media3.giphy.com/media/d5NQmO0EFYPevpy1dn/giphy-downsized-small.mp4', // neymar-explosion
  'https://media3.giphy.com/media/56zM89yEGQm6Q/giphy-downsized-small.mp4', // neymar-mad
  'https://media2.giphy.com/media/ey2tRBbjdQy5O/giphy-downsized-small.mp4', // marcelo-faceslap
];

const RandomGif = () => {
  const index = random(0, (GIFS.length - 1));
  const gif = GIFS[index];

  return (
    <video className='RandomGif' loop="loop" autoPlay>
      <source src={gif} type="video/mp4"/>
    </video>
  );
};

const ErrorPage = ({ cancel, error, retry }) => (
  <div className='ErrorPage shared-props-for-page'>
    <div className='title-container'>
      <p className='title'>ÔÔÔ DESGRAÇA</p>
      <p className='subtitle'>ALGO DE ERRADO NÃO DEU CERTO:</p>

      <p className='text'>{error}</p>
    </div>

    <RandomGif />

    <ActionButton
      colorName='hotpink'
      text='Tentar novamente'
      onClick={retry}
    />

    <ActionButton
      colorName='dark'
      text='Cancelar'
      onClick={cancel}
    />
  </div>
);

ErrorPage.propTypes = {
  cancel: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  retry: PropTypes.func.isRequired,
};

export default ErrorPage;
