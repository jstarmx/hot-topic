import { connect } from 'react-redux';

import Dashboard from '../components/dashboard';
import {
  fetchSession,
  addTopic,
  removeTopic,
} from '../actions/sessions';

const mapDispatchToProps = {
  fetchSession,
  addTopic,
  removeTopic,
};

export default connect(({ session }) => session, mapDispatchToProps)(Dashboard);
