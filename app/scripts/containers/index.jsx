import { connect } from 'preact-redux';

import Index from '../components/index';
import {
  createSession,
  destroySession,
  fetchSessions,
} from '../actions/sessions';

const mapDispatchToProps = {
  createSession,
  destroySession,
  fetchSessions,
};

export default connect(state => state, mapDispatchToProps)(Index);
