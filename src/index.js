import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'

import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import { ducks } from './redux';

ReactDOM.render(
  <ReduxProvider store={ducks.store} >
    <PersistGate loading={null} persistor={ducks.persistor}>
      <App />
    </PersistGate>
  </ReduxProvider>
, document.getElementById('root'));

registerServiceWorker();
