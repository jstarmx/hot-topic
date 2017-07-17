import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import Dashboard from './containers/dashboard';
import store from './store/';

const dashboard = document.querySelector('.dashboard');
const id = dashboard.getAttribute('data-id');

render(
  <Provider store={store(id)}>
    <Dashboard id={id} />
  </Provider>,
  dashboard
);
