import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import './app.global.css';
import App from './components/App';


render(
  <AppContainer>
    <App />
  </AppContainer>,
  document.getElementById('root')
);
