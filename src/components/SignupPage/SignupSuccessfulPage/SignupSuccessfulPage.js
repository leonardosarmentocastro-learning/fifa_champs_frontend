import React from 'react';
import PropTypes from 'prop-types';

import ActionButton from '../../ActionButton';
import './SignupSuccessfulPage.styles.scss';

const NeymarGif = () => {
  const gif = 'https://media3.giphy.com/media/LLuUv0UWULqQU/giphy-downsized-small.mp4';

  return (
    <video className='NeymarGif' loop='loop' autoPlay>
      <source src={gif} type='video/mp4'/>
    </video>
  );
};

const SignupSuccessfulPage = ({ goToMyProfile, goToResultsPage }) => (
  <div className='SignupSuccessfulPage shared-props-for-page'>
    <div className='title-container'>
      <p className='title'>AÍ SIM EM, CAMPEÃO!!!</p>
      <p className='subtitle'>Agora que tu tá escalado pro jogo, o que quer fazer?</p>
    </div>

    <NeymarGif />

    <ActionButton
      colorName='hotpink'
      text='Ver a tabela de jogos do mês'
      onClick={goToResultsPage}
    />

    <ActionButton
      colorName='dark'
      text='Editar o meu perfil'
      onClick={goToMyProfile}
    />
  </div>
);

SignupSuccessfulPage.propTypes = {
  goToMyProfile: PropTypes.func.isRequired,
  goToResultsPage: PropTypes.func.isRequired,
};

export default SignupSuccessfulPage;
