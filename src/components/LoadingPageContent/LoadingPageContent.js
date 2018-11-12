import React from 'react';

import LoadingSpinner from './LoadingSpinner';
import './LoadingPageContent.styles.scss';

const LoadingPageContent = () => (
  <div className='LoadingPageContent shared-props-for-page'>
    <LoadingSpinner />
    <p className='text'>C a r r e g a n d o ...</p>
  </div>
);

export default LoadingPageContent;
