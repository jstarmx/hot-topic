import { render, h } from 'preact';
import { Provider } from 'preact-redux';
import Index from './containers/index';
import store from './store/';

const index = document.querySelector('.index');

render(
  <Provider store={store()}>
    <Index />
  </Provider>,
  index
);
