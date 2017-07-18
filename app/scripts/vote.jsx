import { h, render } from 'preact';
import { Provider } from 'preact-redux';

import Vote from './containers/vote';
import store from './store/';

const vote = document.querySelector('.vote');
const id = vote.getAttribute('data-id');

render(
  <Provider store={store(id)}>
    <Vote id={id} />
  </Provider>,
  vote
);
