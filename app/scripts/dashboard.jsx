import { h, render } from 'preact';
import { Provider } from 'preact-redux';

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
