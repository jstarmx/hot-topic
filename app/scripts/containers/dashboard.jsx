import { connect } from 'react-redux';

import Dashboard from '../components/dashboard';
import {
  fetchSession,
  addTopic,
  removeTopic,
  destroySession,
  renameSession,
} from '../actions/sessions';

const mapDispatchToProps = {
  fetchSession,
  addTopic,
  removeTopic,
  destroySession,
  renameSession,
};

export default connect(({ session }) => session, mapDispatchToProps)(Dashboard);
