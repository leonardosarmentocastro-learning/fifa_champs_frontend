import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';

import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import { store } from './redux';

ReactDOM.render(
  <ReduxProvider store={store} >
    <App />
  </ReduxProvider>
, document.getElementById('root'));

registerServiceWorker();
