import { h, render } from 'preact';
import { Provider } from 'preact-redux';
import Index from './containers/index';
import store from './store/';

const admin = document.querySelector('.admin');

render(
  <Provider store={store()}>
    <Index adminRights />
  </Provider>,
  admin
);
