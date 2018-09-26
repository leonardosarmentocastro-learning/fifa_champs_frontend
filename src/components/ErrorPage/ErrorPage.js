import React from 'react';

import './ErrorPage.styles.css';

const ErrorPage = ({ error, retry }) => (
  <div className='ErrorPage shared-props-for-page'>
    {error}
  </div>
);

export default ErrorPage;
