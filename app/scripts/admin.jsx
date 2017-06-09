import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Index from './containers/index';
import store from './store/';

const admin = document.querySelector('.admin');

render(
  <Provider store={store}>
    <Index adminRights />
  </Provider>,
  admin
);
