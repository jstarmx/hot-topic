import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Index from './containers/index';
import store from './store/';

const index = document.querySelector('.index');

render(
  <Provider store={store()}>
    <Index />
  </Provider>,
  index,
);
